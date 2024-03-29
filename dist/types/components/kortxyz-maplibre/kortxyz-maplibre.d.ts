export declare class KortxyzMaplibre {
  mapEl: HTMLElement;
  mapstyle?: maplibregl.StyleSpecification | string;
  mapboxkey: string;
  cooperativeGestures?: boolean;
  center?: string;
  zoom?: number;
  private map;
  private getModes;
  getMap(): Promise<any>;
  componentWillLoad(): void;
  render(): any;
}
