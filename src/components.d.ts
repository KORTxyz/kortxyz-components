/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface KortxyzCodemirror {
        "doc": any;
    }
    interface KortxyzDrawer {
        "addContent": (content: any) => Promise<void>;
        "margin": string;
    }
    interface KortxyzIcon {
        "color": string;
        "icon": string;
        "size": string;
    }
    interface KortxyzMapinfo {
        "lngLat": maplibregl.LngLat;
    }
    interface KortxyzMapinfoContent {
        "template": string;
        "text": string;
        "url": string;
    }
    interface KortxyzMaplibre {
        "basemapstyle": maplibregl.StyleSpecification | string;
        "bbox": string;
        "center": string;
        "cooperativeGestures": boolean;
        "getMap": () => Promise<maplibregl.Map>;
        "hoverpopup": boolean;
        "map": maplibregl.Map;
        "mapboxkey": string;
        "mapstyle": maplibregl.StyleSpecification | string;
        "showTileBoundaries": boolean;
        "zoom": number;
    }
    interface KortxyzMaplibreLayer {
        "clicklink": any;
        "filter": any;
        "layer"?: string;
        "layout": any;
        "paint": any;
        "popup": string;
        "popupcontentcall": string;
        "type": 'circle' | 'line';
    }
    interface KortxyzMaplibreSearchbox {
        "result": string;
        "url": string;
    }
    interface KortxyzMaplibreSource {
        "addLayer": (layer: maplibregl.LayerSpecification) => Promise<void>;
        "data": GeoJSON.GeoJSON | string;
        "maxzoom": number;
        "tiles": string;
        "tilesize": number;
        "type": 'vector' | 'geojson' | 'raster';
    }
    interface KortxyzMapstyleeditor {
    }
    interface KortxyzMapstyleeditorLayerconfig {
        "layerid": string;
    }
    interface KortxyzMapstyleeditorSourceconfig {
        "sourceid": string;
    }
    interface KortxyzPanel {
    }
    interface KortxyzPanelItem {
        "active": boolean;
        "icon": string;
        "link": string;
        "panel": string;
    }
    interface KortxyzTab {
    }
    interface KortxyzTabContent {
        "active": boolean;
    }
    interface KortxyzTabLink {
        "active": boolean;
        "for": String;
    }
}
export interface KortxyzCodemirrorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzCodemirrorElement;
}
export interface KortxyzMapinfoCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzMapinfoElement;
}
export interface KortxyzMapstyleeditorLayerconfigCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzMapstyleeditorLayerconfigElement;
}
export interface KortxyzMapstyleeditorSourceconfigCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzMapstyleeditorSourceconfigElement;
}
export interface KortxyzPanelItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzPanelItemElement;
}
export interface KortxyzTabLinkCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKortxyzTabLinkElement;
}
declare global {
    interface HTMLKortxyzCodemirrorElementEventMap {
        "docChanged": any;
    }
    interface HTMLKortxyzCodemirrorElement extends Components.KortxyzCodemirror, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzCodemirrorElementEventMap>(type: K, listener: (this: HTMLKortxyzCodemirrorElement, ev: KortxyzCodemirrorCustomEvent<HTMLKortxyzCodemirrorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzCodemirrorElementEventMap>(type: K, listener: (this: HTMLKortxyzCodemirrorElement, ev: KortxyzCodemirrorCustomEvent<HTMLKortxyzCodemirrorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzCodemirrorElement: {
        prototype: HTMLKortxyzCodemirrorElement;
        new (): HTMLKortxyzCodemirrorElement;
    };
    interface HTMLKortxyzDrawerElement extends Components.KortxyzDrawer, HTMLStencilElement {
    }
    var HTMLKortxyzDrawerElement: {
        prototype: HTMLKortxyzDrawerElement;
        new (): HTMLKortxyzDrawerElement;
    };
    interface HTMLKortxyzIconElement extends Components.KortxyzIcon, HTMLStencilElement {
    }
    var HTMLKortxyzIconElement: {
        prototype: HTMLKortxyzIconElement;
        new (): HTMLKortxyzIconElement;
    };
    interface HTMLKortxyzMapinfoElementEventMap {
        "newMarkerPosition": any;
    }
    interface HTMLKortxyzMapinfoElement extends Components.KortxyzMapinfo, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzMapinfoElementEventMap>(type: K, listener: (this: HTMLKortxyzMapinfoElement, ev: KortxyzMapinfoCustomEvent<HTMLKortxyzMapinfoElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzMapinfoElementEventMap>(type: K, listener: (this: HTMLKortxyzMapinfoElement, ev: KortxyzMapinfoCustomEvent<HTMLKortxyzMapinfoElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzMapinfoElement: {
        prototype: HTMLKortxyzMapinfoElement;
        new (): HTMLKortxyzMapinfoElement;
    };
    interface HTMLKortxyzMapinfoContentElement extends Components.KortxyzMapinfoContent, HTMLStencilElement {
    }
    var HTMLKortxyzMapinfoContentElement: {
        prototype: HTMLKortxyzMapinfoContentElement;
        new (): HTMLKortxyzMapinfoContentElement;
    };
    interface HTMLKortxyzMaplibreElement extends Components.KortxyzMaplibre, HTMLStencilElement {
    }
    var HTMLKortxyzMaplibreElement: {
        prototype: HTMLKortxyzMaplibreElement;
        new (): HTMLKortxyzMaplibreElement;
    };
    interface HTMLKortxyzMaplibreLayerElement extends Components.KortxyzMaplibreLayer, HTMLStencilElement {
    }
    var HTMLKortxyzMaplibreLayerElement: {
        prototype: HTMLKortxyzMaplibreLayerElement;
        new (): HTMLKortxyzMaplibreLayerElement;
    };
    interface HTMLKortxyzMaplibreSearchboxElement extends Components.KortxyzMaplibreSearchbox, HTMLStencilElement {
    }
    var HTMLKortxyzMaplibreSearchboxElement: {
        prototype: HTMLKortxyzMaplibreSearchboxElement;
        new (): HTMLKortxyzMaplibreSearchboxElement;
    };
    interface HTMLKortxyzMaplibreSourceElement extends Components.KortxyzMaplibreSource, HTMLStencilElement {
    }
    var HTMLKortxyzMaplibreSourceElement: {
        prototype: HTMLKortxyzMaplibreSourceElement;
        new (): HTMLKortxyzMaplibreSourceElement;
    };
    interface HTMLKortxyzMapstyleeditorElement extends Components.KortxyzMapstyleeditor, HTMLStencilElement {
    }
    var HTMLKortxyzMapstyleeditorElement: {
        prototype: HTMLKortxyzMapstyleeditorElement;
        new (): HTMLKortxyzMapstyleeditorElement;
    };
    interface HTMLKortxyzMapstyleeditorLayerconfigElementEventMap {
        "closeConfig": any;
    }
    interface HTMLKortxyzMapstyleeditorLayerconfigElement extends Components.KortxyzMapstyleeditorLayerconfig, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzMapstyleeditorLayerconfigElementEventMap>(type: K, listener: (this: HTMLKortxyzMapstyleeditorLayerconfigElement, ev: KortxyzMapstyleeditorLayerconfigCustomEvent<HTMLKortxyzMapstyleeditorLayerconfigElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzMapstyleeditorLayerconfigElementEventMap>(type: K, listener: (this: HTMLKortxyzMapstyleeditorLayerconfigElement, ev: KortxyzMapstyleeditorLayerconfigCustomEvent<HTMLKortxyzMapstyleeditorLayerconfigElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzMapstyleeditorLayerconfigElement: {
        prototype: HTMLKortxyzMapstyleeditorLayerconfigElement;
        new (): HTMLKortxyzMapstyleeditorLayerconfigElement;
    };
    interface HTMLKortxyzMapstyleeditorSourceconfigElementEventMap {
        "closeConfig": any;
    }
    interface HTMLKortxyzMapstyleeditorSourceconfigElement extends Components.KortxyzMapstyleeditorSourceconfig, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzMapstyleeditorSourceconfigElementEventMap>(type: K, listener: (this: HTMLKortxyzMapstyleeditorSourceconfigElement, ev: KortxyzMapstyleeditorSourceconfigCustomEvent<HTMLKortxyzMapstyleeditorSourceconfigElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzMapstyleeditorSourceconfigElementEventMap>(type: K, listener: (this: HTMLKortxyzMapstyleeditorSourceconfigElement, ev: KortxyzMapstyleeditorSourceconfigCustomEvent<HTMLKortxyzMapstyleeditorSourceconfigElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzMapstyleeditorSourceconfigElement: {
        prototype: HTMLKortxyzMapstyleeditorSourceconfigElement;
        new (): HTMLKortxyzMapstyleeditorSourceconfigElement;
    };
    interface HTMLKortxyzPanelElement extends Components.KortxyzPanel, HTMLStencilElement {
    }
    var HTMLKortxyzPanelElement: {
        prototype: HTMLKortxyzPanelElement;
        new (): HTMLKortxyzPanelElement;
    };
    interface HTMLKortxyzPanelItemElementEventMap {
        "tooglePanel": any;
    }
    interface HTMLKortxyzPanelItemElement extends Components.KortxyzPanelItem, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzPanelItemElementEventMap>(type: K, listener: (this: HTMLKortxyzPanelItemElement, ev: KortxyzPanelItemCustomEvent<HTMLKortxyzPanelItemElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzPanelItemElementEventMap>(type: K, listener: (this: HTMLKortxyzPanelItemElement, ev: KortxyzPanelItemCustomEvent<HTMLKortxyzPanelItemElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzPanelItemElement: {
        prototype: HTMLKortxyzPanelItemElement;
        new (): HTMLKortxyzPanelItemElement;
    };
    interface HTMLKortxyzTabElement extends Components.KortxyzTab, HTMLStencilElement {
    }
    var HTMLKortxyzTabElement: {
        prototype: HTMLKortxyzTabElement;
        new (): HTMLKortxyzTabElement;
    };
    interface HTMLKortxyzTabContentElement extends Components.KortxyzTabContent, HTMLStencilElement {
    }
    var HTMLKortxyzTabContentElement: {
        prototype: HTMLKortxyzTabContentElement;
        new (): HTMLKortxyzTabContentElement;
    };
    interface HTMLKortxyzTabLinkElementEventMap {
        "tabChange": any;
    }
    interface HTMLKortxyzTabLinkElement extends Components.KortxyzTabLink, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKortxyzTabLinkElementEventMap>(type: K, listener: (this: HTMLKortxyzTabLinkElement, ev: KortxyzTabLinkCustomEvent<HTMLKortxyzTabLinkElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKortxyzTabLinkElementEventMap>(type: K, listener: (this: HTMLKortxyzTabLinkElement, ev: KortxyzTabLinkCustomEvent<HTMLKortxyzTabLinkElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKortxyzTabLinkElement: {
        prototype: HTMLKortxyzTabLinkElement;
        new (): HTMLKortxyzTabLinkElement;
    };
    interface HTMLElementTagNameMap {
        "kortxyz-codemirror": HTMLKortxyzCodemirrorElement;
        "kortxyz-drawer": HTMLKortxyzDrawerElement;
        "kortxyz-icon": HTMLKortxyzIconElement;
        "kortxyz-mapinfo": HTMLKortxyzMapinfoElement;
        "kortxyz-mapinfo-content": HTMLKortxyzMapinfoContentElement;
        "kortxyz-maplibre": HTMLKortxyzMaplibreElement;
        "kortxyz-maplibre-layer": HTMLKortxyzMaplibreLayerElement;
        "kortxyz-maplibre-searchbox": HTMLKortxyzMaplibreSearchboxElement;
        "kortxyz-maplibre-source": HTMLKortxyzMaplibreSourceElement;
        "kortxyz-mapstyleeditor": HTMLKortxyzMapstyleeditorElement;
        "kortxyz-mapstyleeditor-layerconfig": HTMLKortxyzMapstyleeditorLayerconfigElement;
        "kortxyz-mapstyleeditor-sourceconfig": HTMLKortxyzMapstyleeditorSourceconfigElement;
        "kortxyz-panel": HTMLKortxyzPanelElement;
        "kortxyz-panel-item": HTMLKortxyzPanelItemElement;
        "kortxyz-tab": HTMLKortxyzTabElement;
        "kortxyz-tab-content": HTMLKortxyzTabContentElement;
        "kortxyz-tab-link": HTMLKortxyzTabLinkElement;
    }
}
declare namespace LocalJSX {
    interface KortxyzCodemirror {
        "doc"?: any;
        "onDocChanged"?: (event: KortxyzCodemirrorCustomEvent<any>) => void;
    }
    interface KortxyzDrawer {
        "margin"?: string;
    }
    interface KortxyzIcon {
        "color"?: string;
        "icon"?: string;
        "size"?: string;
    }
    interface KortxyzMapinfo {
        "lngLat"?: maplibregl.LngLat;
        "onNewMarkerPosition"?: (event: KortxyzMapinfoCustomEvent<any>) => void;
    }
    interface KortxyzMapinfoContent {
        "template"?: string;
        "text"?: string;
        "url"?: string;
    }
    interface KortxyzMaplibre {
        "basemapstyle"?: maplibregl.StyleSpecification | string;
        "bbox"?: string;
        "center"?: string;
        "cooperativeGestures"?: boolean;
        "hoverpopup"?: boolean;
        "map"?: maplibregl.Map;
        "mapboxkey"?: string;
        "mapstyle"?: maplibregl.StyleSpecification | string;
        "showTileBoundaries"?: boolean;
        "zoom"?: number;
    }
    interface KortxyzMaplibreLayer {
        "clicklink"?: any;
        "filter"?: any;
        "layer"?: string;
        "layout"?: any;
        "paint"?: any;
        "popup"?: string;
        "popupcontentcall"?: string;
        "type"?: 'circle' | 'line';
    }
    interface KortxyzMaplibreSearchbox {
        "result"?: string;
        "url"?: string;
    }
    interface KortxyzMaplibreSource {
        "data"?: GeoJSON.GeoJSON | string;
        "maxzoom"?: number;
        "tiles"?: string;
        "tilesize"?: number;
        "type"?: 'vector' | 'geojson' | 'raster';
    }
    interface KortxyzMapstyleeditor {
    }
    interface KortxyzMapstyleeditorLayerconfig {
        "layerid"?: string;
        "onCloseConfig"?: (event: KortxyzMapstyleeditorLayerconfigCustomEvent<any>) => void;
    }
    interface KortxyzMapstyleeditorSourceconfig {
        "onCloseConfig"?: (event: KortxyzMapstyleeditorSourceconfigCustomEvent<any>) => void;
        "sourceid"?: string;
    }
    interface KortxyzPanel {
    }
    interface KortxyzPanelItem {
        "active"?: boolean;
        "icon"?: string;
        "link"?: string;
        "onTooglePanel"?: (event: KortxyzPanelItemCustomEvent<any>) => void;
        "panel"?: string;
    }
    interface KortxyzTab {
    }
    interface KortxyzTabContent {
        "active"?: boolean;
    }
    interface KortxyzTabLink {
        "active"?: boolean;
        "for"?: String;
        "onTabChange"?: (event: KortxyzTabLinkCustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "kortxyz-codemirror": KortxyzCodemirror;
        "kortxyz-drawer": KortxyzDrawer;
        "kortxyz-icon": KortxyzIcon;
        "kortxyz-mapinfo": KortxyzMapinfo;
        "kortxyz-mapinfo-content": KortxyzMapinfoContent;
        "kortxyz-maplibre": KortxyzMaplibre;
        "kortxyz-maplibre-layer": KortxyzMaplibreLayer;
        "kortxyz-maplibre-searchbox": KortxyzMaplibreSearchbox;
        "kortxyz-maplibre-source": KortxyzMaplibreSource;
        "kortxyz-mapstyleeditor": KortxyzMapstyleeditor;
        "kortxyz-mapstyleeditor-layerconfig": KortxyzMapstyleeditorLayerconfig;
        "kortxyz-mapstyleeditor-sourceconfig": KortxyzMapstyleeditorSourceconfig;
        "kortxyz-panel": KortxyzPanel;
        "kortxyz-panel-item": KortxyzPanelItem;
        "kortxyz-tab": KortxyzTab;
        "kortxyz-tab-content": KortxyzTabContent;
        "kortxyz-tab-link": KortxyzTabLink;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "kortxyz-codemirror": LocalJSX.KortxyzCodemirror & JSXBase.HTMLAttributes<HTMLKortxyzCodemirrorElement>;
            "kortxyz-drawer": LocalJSX.KortxyzDrawer & JSXBase.HTMLAttributes<HTMLKortxyzDrawerElement>;
            "kortxyz-icon": LocalJSX.KortxyzIcon & JSXBase.HTMLAttributes<HTMLKortxyzIconElement>;
            "kortxyz-mapinfo": LocalJSX.KortxyzMapinfo & JSXBase.HTMLAttributes<HTMLKortxyzMapinfoElement>;
            "kortxyz-mapinfo-content": LocalJSX.KortxyzMapinfoContent & JSXBase.HTMLAttributes<HTMLKortxyzMapinfoContentElement>;
            "kortxyz-maplibre": LocalJSX.KortxyzMaplibre & JSXBase.HTMLAttributes<HTMLKortxyzMaplibreElement>;
            "kortxyz-maplibre-layer": LocalJSX.KortxyzMaplibreLayer & JSXBase.HTMLAttributes<HTMLKortxyzMaplibreLayerElement>;
            "kortxyz-maplibre-searchbox": LocalJSX.KortxyzMaplibreSearchbox & JSXBase.HTMLAttributes<HTMLKortxyzMaplibreSearchboxElement>;
            "kortxyz-maplibre-source": LocalJSX.KortxyzMaplibreSource & JSXBase.HTMLAttributes<HTMLKortxyzMaplibreSourceElement>;
            "kortxyz-mapstyleeditor": LocalJSX.KortxyzMapstyleeditor & JSXBase.HTMLAttributes<HTMLKortxyzMapstyleeditorElement>;
            "kortxyz-mapstyleeditor-layerconfig": LocalJSX.KortxyzMapstyleeditorLayerconfig & JSXBase.HTMLAttributes<HTMLKortxyzMapstyleeditorLayerconfigElement>;
            "kortxyz-mapstyleeditor-sourceconfig": LocalJSX.KortxyzMapstyleeditorSourceconfig & JSXBase.HTMLAttributes<HTMLKortxyzMapstyleeditorSourceconfigElement>;
            "kortxyz-panel": LocalJSX.KortxyzPanel & JSXBase.HTMLAttributes<HTMLKortxyzPanelElement>;
            "kortxyz-panel-item": LocalJSX.KortxyzPanelItem & JSXBase.HTMLAttributes<HTMLKortxyzPanelItemElement>;
            "kortxyz-tab": LocalJSX.KortxyzTab & JSXBase.HTMLAttributes<HTMLKortxyzTabElement>;
            "kortxyz-tab-content": LocalJSX.KortxyzTabContent & JSXBase.HTMLAttributes<HTMLKortxyzTabContentElement>;
            "kortxyz-tab-link": LocalJSX.KortxyzTabLink & JSXBase.HTMLAttributes<HTMLKortxyzTabLinkElement>;
        }
    }
}
