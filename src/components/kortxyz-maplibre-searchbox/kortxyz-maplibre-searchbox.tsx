import { Component, Host, Prop, State, Element, h } from '@stencil/core';
import {Marker} from 'maplibre-gl';

@Component({
  tag: 'kortxyz-maplibre-searchbox',
  styleUrl: 'kortxyz-maplibre-searchbox.css',
  shadow: true,
})
export class KortxyzMaplibreSearchbox {
  private textInput?: HTMLInputElement;
  private searchboxMarker;

  @Element() searchboxEl: HTMLElement;

  /** Url to make input calls that return a geojson with points. Input are available as {input} */
  @Prop() url = "https://api.dataforsyningen.dk/adgangsadresser?q={input}&format=geojson&per_side=5&struktur=mini&autocomplete&kommunekode=183&fuzzy";
  
  /** How to format results. Replacement of {} with a attribute. {ATTRIBUTENAME}*/
  @Prop() result = "{betegnelse}"

  @State() results = [];

  parseStringTemplate = (str, obj) => {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    let parameters = args.map(argument => obj[argument] || (obj[argument] === undefined ? "" : obj[argument]));
    return String.raw({ raw: parts }, ...parameters);
  }



  doSearch = async (e) => {
    this.results = [];
    const { value, nextElementSibling } = e.target

    if (value) {
      const url = this.url.replace(/{(\w+)}/g, value)
      const response = await fetch(url);
      const geojson = await response.json();
      this.results = [...geojson.features];

      const inFocus = nextElementSibling.querySelector(".focus")
      if (inFocus) nextElementSibling.firstChild.classList.add("focus")
    }

  }

  onKeydown = async (e) => {
    const inFocus = e.target.nextElementSibling.querySelector(".focus");

    if (e.key == "Enter") this.resultPick(inFocus.id)
    else if (e.key == "ArrowDown" && !!inFocus.nextElementSibling) {
      inFocus.classList.remove("focus")
      inFocus.nextElementSibling.classList.add("focus")
      this.textInput.value = inFocus.nextElementSibling.innerText;
    }
    else if (e.key == "ArrowUp" && !!inFocus.previousElementSibling) {
      inFocus.classList.remove("focus")
      inFocus.previousElementSibling.classList.add("focus")
      this.textInput.value = inFocus.previousElementSibling.innerText;
    }
    else return;

  }

  resultPick = async idx => {
    const result = this.results[idx];
    const { map } = this.searchboxEl.closest('kortxyz-maplibre');

    if (this.searchboxMarker) this.searchboxMarker.remove();
    this.searchboxMarker = new Marker().setLngLat(result.geometry.coordinates).addTo(map);
    map.once('dragstart', () => this.searchboxMarker.remove())

    map.flyTo({ center: result.geometry.coordinates, zoom: 18 });

    this.textInput.value = "";
    this.results = [];

  }

  render() {
    return (
      <Host>
        <input
          type="search"
          placeholder='Søg Adresse'
          ref={el => this.textInput = el as HTMLInputElement}
          onInput={this.doSearch}
          onKeyDown={this.onKeydown}

        ></input>
        <results>
          {this.results.map(
            (result, index) => (
              <result id={index} class={index == 0 ? "focus" : ""} onClick={e => this.resultPick(e.target.id)}>{this.result.replace(/{(\w+)}/g, (_, k) => result.properties[k]) }</result>
            )
          )}
        </results>
      </Host>
    );
  }
}
