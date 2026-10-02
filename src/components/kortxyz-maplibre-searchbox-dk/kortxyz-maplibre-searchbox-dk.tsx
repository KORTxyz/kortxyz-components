import { Component, Prop, Host, State, Element, h } from '@stencil/core';
import { Marker } from 'maplibre-gl';

import jsonata from 'jsonata';
import proj4 from 'proj4';

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
  tag: 'kortxyz-maplibre-searchbox-dk',
  styleUrl: 'kortxyz-maplibre-searchbox-dk.css',
  shadow: true,
})

export class KortxyzMaplibreSearchboxDk {
  private textInput!: HTMLInputElement;
  private searchboxMarker!: Marker;

  @Element() searchboxEl!: HTMLElement;

  /** Url to make input calls that return a geojson with points. Input are available as {input} */
  @Prop() url = "https://adressevaelger.dk/husnumre/soeg?tekst={input}&maksimum=10&token=adressevaelger123&kommunekode=0183";

  /** How to format results. Replacement of {} with a attribute. {ATTRIBUTENAME}*/
  @Prop() result = "{visningstekst}"

  /** JSONata expresion to turn the responding json into geojson */
  @Prop() jsonata = 'fund';

  /** How far should the map zoom in on result. Empty prop if no zooming is needed */
  @Prop() resultzoom: number = 14;

  /** Should a result pick be a marker on the map or a click on the map*/
  @Prop() resulttype: "marker" | "click" = "marker"

  @State() results: any[] = [];


  doSearch = async (e) => {
    this.results = [];
    const { value, nextElementSibling } = e.target

    if (value) {
      const url = this.url.replace(/{(\w+)}/g, value)
      const response = await fetch(url);
      let responseJson = await response.json();

      const result = await jsonata('fund').evaluate(responseJson);
      this.results = Array.isArray(result) ? result : [result];

      console.log(this.results)

      const inFocus = nextElementSibling.querySelector(".focus")
      if (inFocus) nextElementSibling.firstChild.classList.add("focus")
    }

  }

  onKeydown = async (e) => {
    const inFocus = e.target.nextElementSibling.querySelector(".focus");

    if (e.key == "Enter") this.resultPick(inFocus.id,inFocus.dataset.type,inFocus.dataset.vejnavn)
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

  resultPick = async (id:string,type:string,vejnavn:string) => {
    console.log(id,type,vejnavn)
     this.results = [];
    if(type == "navngivenvejpostnummer") {
      this.textInput.value = vejnavn+ " ";
      this.textInput.focus();
    }
    else {
      this.textInput.value = "";
      const response = await fetch(`https://adressevaelger.dk/husnumre/${id}?token=adressevaelger123`)
      const responseJson = await response.json();
      const result = await jsonata('husnummer.adgangspunkt.geometri').evaluate(responseJson);
      console.log(result)
      const { map } = this.searchboxEl.closest('kortxyz-maplibre');
      proj4.defs("EPSG:25832","+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
      const coordinates = proj4("EPSG:25832").inverse(result.coordinates);


      if (this.resulttype == "marker") {
        if (this.searchboxMarker) this.searchboxMarker.remove();
        this.searchboxMarker = new Marker().setLngLat(coordinates).addTo(map);
        map.once('dragstart', () => this.searchboxMarker.remove())
      }
      else if (this.resulttype == "click") {
        map.fire('click', {
          point: map.project(coordinates),
          originalEvent: {},
          lngLat: coordinates
        })
      }
      map.flyTo({
        center: coordinates,
        ...(Number.isNaN(this.resultzoom) ? {} : { zoom: this.resultzoom })
      });

    }
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
              <result id={result.id} data-type={result.type} data-vejnavn={result.vejnavn} onClick={() => this.resultPick(result.id,result.type,result.vejnavn)} class={index == 0 ? "focus" : ""}>
                {result.titel}
              </result>
            )
          )}
        </results>
      </Host>
    );
  }
}
