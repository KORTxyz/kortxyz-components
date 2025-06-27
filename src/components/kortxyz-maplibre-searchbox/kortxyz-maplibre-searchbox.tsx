import { Component, Prop, Host, State, Element, h } from '@stencil/core';
import {Marker} from 'maplibre-gl';

/** 
### Intro
Webcomponent to use inside kortxyz-maplibre to search for a point.

### Example
```html
<kortxyz-maplibre>
    <kortxyz-maplibre-searchbox
        url="https://api.dataforsyningen.dk/adgangsadresser?q={input}&format=geojson&per_side=5&struktur=mini&autocomplete&kommunekode=183&fuzzy"
        result="{betegnelse}"
    ></kortxyz-maplibre-searchbox>
<kortxyz-maplibre>

``` 
*/

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

  /** How far should the map zoom in on result. Empty prop if no zooming is needed */
  @Prop() resultzoom:number = 14;

  /** Should a result pick be a marker on the map or a click on the map*/
  @Prop() resulttype:"marker" | "click" = "marker"

  @State() results = [];


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

    if(this.resulttype == "marker"){
      if (this.searchboxMarker) this.searchboxMarker.remove();
      this.searchboxMarker = new Marker().setLngLat(result.geometry.coordinates).addTo(map);
      map.once('dragstart', () => this.searchboxMarker.remove())
    }
    else if(this.resulttype == "click"){
      map.fire('click', {
        point: map.project(result.geometry.coordinates), 
        originalEvent: {},
        lngLat: result.geometry.coordinates
      })
    }
    map.flyTo({
      center: result.geometry.coordinates,
      ...(Number.isNaN(this.resultzoom) ? {} : { zoom: this.resultzoom })
    });

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
              <result id={index} onClick={e => this.resultPick(e.target.id)} class={index == 0 ? "focus" : ""}>
                {this.result.replace(/{(\w+)}/g, (_, k) => result.properties[k]) }
              </result>
            )
          )}
        </results>
      </Host>
    );
  }
}
