import { IControl } from 'maplibre-gl';
import { TerraDraw } from 'terra-draw';

import { getStore } from './store';

interface ToggleControlOptions {
    element?: string;
}

interface basemapOptions {
    title: string,
    icon: string,
    url: string
}

interface BasemapSwitcherControlOptions {
    basemap,
    basemaplist?: basemapOptions[]
}

interface DrawControlOptions {
    terraDraw:TerraDraw,
    source?: any,
    sourceDiv
}

export class ToggleControl implements IControl {
    private container!: HTMLElement;
    private elem!: HTMLElement;

    private button!: HTMLButtonElement;
    private active: boolean = false;

    private options: ToggleControlOptions;

    constructor(options?: ToggleControlOptions) {
        this.options = options || {};
    }

    toogleElement = () => {
        this.active = !this.active;
        this.elem.style.setProperty("display", this.active ? '' : 'none')
        this.updateIcon();
    }

    onAdd(): HTMLElement {
        this.elem = document.getElementById(this.options.element)
        this.active = this.elem.style.display == "none" ? false : true;

        this.container = document.createElement('div');
        this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

        this.button = document.createElement('button');
        this.button.className = 'maplibregl-ctrl-icon';
        this.button.type = 'button';
        this.button.title = 'Toogle table';
        this.button.style.display = 'flex';
        this.button.style.justifyContent = 'center';
        this.button.style.alignItems = 'center';

        this.button.onclick = () => this.toogleElement()
        this.updateIcon();

        this.container.appendChild(this.button);
        return this.container;

    }

    onRemove(): void {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
    private updateIcon(): void {
        // Replace with actual SVG if needed
        this.button.innerHTML = this.active
            ? '<svg width="22" height="22"><path d="M10.89 7.07L5.09 1.27H16.89C17.99 1.27 18.89 2.17 18.89 3.27V10.86C17.96 10.48 16.95 10.27 15.89 10.27C15.34 10.27 14.8 10.34 14.27 10.45L13.09 9.27H16.89V5.27H10.89V7.07ZM15.98 12.16L21.2 17.38C21.47 17 21.71 16.59 21.89 16.15C20.96 13.84 18.67 12.19 15.98 12.16ZM21 19.73L19.73 21L18.39 19.64C17.6 19.96 16.77 20.15 15.89 20.15C13.16 20.15 10.83 18.49 9.89 16.15C10.34 15.03 11.12 14.07 12.1 13.37L10.82 12.09C10.08 12.69 9.42 13.41 8.89 14.24V11.27H2.89V15.27H8.31C8.15 15.59 8.01 15.93 7.89 16.27C8.01 16.61 8.15 16.95 8.31 17.27H2.89C1.79 17.27 0.89 16.37 0.89 15.27V3.27C0.89 2.95 0.97 2.65 1.11 2.38L0 1.27L1.28 0L21 19.73ZM8 9.27L4 5.27H2.89V9.27H8ZM17.07 18.34L13.7 14.97C13.5 15.32 13.39 15.72 13.39 16.15C13.39 17.53 14.51 18.65 15.89 18.65C16.32 18.65 16.72 18.54 17.07 18.34Z"/></svg>'
            : '<svg width="22" height="20"><path d="M15.5923 14.0631C16.1523 14.0631 16.5923 14.5031 16.5923 15.0631C16.5923 15.6231 16.1523 16.0631 15.5923 16.0631C15.0323 16.0631 14.5923 15.6131 14.5923 15.0631C14.5923 14.5131 15.0323 14.0631 15.5923 14.0631ZM15.5923 11.0631C18.3223 11.0631 20.6523 12.7231 21.5923 15.0631C20.6523 17.4031 18.3223 19.0631 15.5923 19.0631C12.8623 19.0631 10.5323 17.4031 9.59229 15.0631C10.5323 12.7231 12.8623 11.0631 15.5923 11.0631ZM15.5923 12.5631C14.2123 12.5631 13.0923 13.6831 13.0923 15.0631C13.0923 16.4431 14.2123 17.5631 15.5923 17.5631C16.9723 17.5631 18.0923 16.4431 18.0923 15.0631C18.0923 13.6831 16.9723 12.5631 15.5923 12.5631ZM16.5923 0.183105H2.59229C1.49229 0.183105 0.592285 1.08311 0.592285 2.18311V14.1831C0.592285 15.2831 1.49229 16.1831 2.59229 16.1831H8.01229C7.85229 15.8631 7.71229 15.5231 7.59229 15.1831C7.71229 14.8431 7.85229 14.5031 8.01229 14.1831H2.59229V10.1831H8.59229V13.1531C9.14229 12.2931 9.82228 11.5531 10.5923 10.9431V10.1831H11.7423C12.9023 9.54311 14.2123 9.18311 15.5923 9.18311C16.6523 9.18311 17.6623 9.39311 18.5923 9.77311V2.18311C18.5923 1.08311 17.6923 0.183105 16.5923 0.183105ZM8.59229 8.18311H2.59229V4.18311H8.59229V8.18311ZM16.5923 8.18311H10.5923V4.18311H16.5923V8.18311Z"/></svg>';
    }

}

export class BasemapSwitcherControl implements IControl {
    private container!: HTMLElement;

    private img!: HTMLImageElement;

    private options: BasemapSwitcherControlOptions;

    constructor(options?: BasemapSwitcherControlOptions) {
        this.options = options;
    }

    onAdd(): HTMLElement {
        const { basemap, basemaplist } = this.options;
        basemap.setStyle(basemaplist[0].url)

        this.container = document.createElement('div');
        this.container.className = 'maplibregl-ctrl maplibregl-ctrl-basemapswicther';

        basemaplist.forEach(({title, icon, url}) => {
            if(icon){
            this.img = document.createElement('img');
            this.img.src = icon;
            this.img.title = title;
            this.img.className = "maplibregl-ctrl-basemapimage";

            this.img.onclick = (e) => this.changeBasemap(basemap, url,e);
            this.container.appendChild(this.img);

            }
            else{
            const fallbackText = document.createElement('span');
                fallbackText.innerText = title;
                fallbackText.className = "maplibregl-ctrl-basemaptext";

                fallbackText.onclick = (e) => this.changeBasemap(basemap, url, e);
                this.container.appendChild(fallbackText);
            }
        });


        return this.container;

    }

    onRemove(): void {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }

    changeBasemap(basemap, url, event: MouseEvent): void {
        //this.container.prepend(image);
        basemap.setStyle(url)
            // Move the clicked element to the front
    const target = (event?.currentTarget || event?.target) as HTMLElement;
    if (target && this.container.contains(target)) {
        this.container.removeChild(target);
        this.container.insertBefore(target, this.container.firstChild);
    }
    }
}

export class DrawControl implements IControl {
    private container!: HTMLElement;
    private button!: HTMLButtonElement;
    private options: DrawControlOptions;

    constructor(options?: DrawControlOptions) {
        this.options = options;
    }

    onAdd(): HTMLElement {
        const { terraDraw, source, sourceDiv } = this.options;
        const datastore = sourceDiv.store ? getStore(sourceDiv.store) : null;
        
        terraDraw.on("finish", async () => {
            const newFeature = terraDraw.getSnapshot()[0];
            const geojson = datastore ? datastore.get("data") : await source.getData();
            
            if(newFeature){
                newFeature.id = Math.max(...geojson.features.map(e => Number(e.id))) + 1;
                newFeature.properties = {};

                const newGeojson = {
                    ...geojson,
                    features: [...geojson.features, newFeature]
                };

                if(datastore){
                    datastore.set("lastOrigin","map")
                    datastore.set("data", newGeojson)
                }
                else source.setData(newGeojson)
                terraDraw.stop();
            }
            
        });

        this.container = document.createElement('div');
        this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

        this.button = document.createElement('button');
        this.button.className = 'maplibregl-ctrl-icon';
        this.button.type = 'button';
        this.button.title = 'Toogle table';
        this.button.style.display = 'flex';
        this.button.style.justifyContent = 'center';
        this.button.style.alignItems = 'center';
        this.button.innerHTML = '<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.98909 18.7091C9.76909 18.0091 9.37909 16.0791 8.47909 14.8591C7.58909 13.6091 6.35909 12.7491 5.11909 11.9191C4.23909 11.3591 3.42909 10.6591 2.77909 9.85907C2.49909 9.52907 1.92909 8.91907 2.50909 8.79907C3.09909 8.67907 4.11909 9.25907 4.63909 9.47907C5.54909 9.85907 6.44909 10.2991 7.28909 10.8191L8.29909 9.11907C6.73909 8.08907 4.73909 7.17907 2.87909 6.90907C1.81909 6.74907 0.699091 6.96907 0.339091 8.11907C0.0190908 9.10907 0.529091 10.1091 1.10909 10.8891C2.47909 12.7191 4.60909 13.5991 6.19909 15.1791C6.53909 15.5091 6.94909 15.8991 7.14909 16.3591C7.35909 16.7991 7.30909 16.8291 6.83909 16.8291C5.59909 16.8291 4.04909 15.8591 3.03909 15.2191L2.02909 16.9191C3.55909 17.8591 6.11909 19.3291 7.98909 18.7091ZM19.0791 3.10907C19.2991 2.88907 19.2991 2.52907 19.0791 2.31907L17.7791 1.01907C17.5691 0.809072 17.2091 0.809072 16.9991 1.01907L15.9791 2.03907L18.0591 4.11907M9.23909 8.77907V10.8591H11.3191L17.4691 4.70907L15.3891 2.62907L9.23909 8.77907Z" fill="black"/></svg>';

        this.button.onclick = () => this.startDrawing(terraDraw,datastore,source)

        this.container.appendChild(this.button);
        return this.container;

    }

    async startDrawing(terraDraw,datastore,source): Promise<void> {
        const geojson = datastore ? datastore.get("data") : await source.getData();

        terraDraw.start();
        terraDraw.setMode(geojson.features[0]?.geometry.type.toLowerCase());
    }

    onRemove(): void {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }


}