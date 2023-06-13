import { Component, Prop, Element, Event, EventEmitter, h } from '@stencil/core';
import maplibregl from 'maplibre-gl';

@Component({
  tag: 'kortxyz-mapinfo',
  styleUrl: 'kortxyz-mapinfo.css',
  shadow: true,
})
export class KortxyzMapinfo {
  @Element() infoboxEl: HTMLElement;

  private marker: maplibregl.Marker;
  @Prop({ mutable: true }) lngLat:maplibregl.LngLat;

  @Event() newMarkerPosition: EventEmitter;

  
  onDragEnd = () => {
    this.lngLat = this.marker.getLngLat();
    console.log(this.lngLat)
  }

  async componentWillLoad() {

    const mapDiv: any = this.infoboxEl.parentElement

    mapDiv.getMap().then((map: maplibregl.Map) => {
      map.on('click', async e => {
        this.lngLat = e.lngLat;
        this.newMarkerPosition.emit(this.lngLat)

        if (!this.marker) this.marker = new maplibregl.Marker({ color: "#333", draggable: true }).setLngLat(this.lngLat).addTo(map).on('dragend', this.onDragEnd);
        else this.marker.setLngLat(this.lngLat)
        this.infoboxEl.classList.add("show");
      })
    })

  }

  async close() {
    this.marker.remove();
    this.marker = null;
    this.infoboxEl.classList.remove("show");
  }

  render() {
    return (
      [
        <div>
          <kortxyz-button icon="close" id="closebutton" onClick={() => this.close()}></kortxyz-button>
        </div>
        ,
        <div>
          <div>{this.lngLat ? this.lngLat.toArray().map(e => Math.floor(e * 1000) / 1000).toString() : ""}</div>
          <slot></slot>
        </div>
      ]);
  }

}
