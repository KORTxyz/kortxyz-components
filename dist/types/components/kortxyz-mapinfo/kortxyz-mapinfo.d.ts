import { EventEmitter } from '../../stencil-public-runtime';
export declare class KortxyzMapinfo {
  infoboxEl: HTMLElement;
  private marker;
  lngLat: maplibregl.LngLat;
  newMarkerPosition: EventEmitter;
  onDragEnd: () => void;
  componentWillLoad(): Promise<void>;
  close(): Promise<void>;
  render(): any[];
}
