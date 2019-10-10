import { Component, Prop, Listen, h, State } from '@stencil/core';

@Component({
  tag: 'kortxyz-app',
  styleUrl: 'kortxyz-app.css'
})

export class kortxyzApp {

	@Prop() source:string;

	@State() style:any;

	@Listen('newStyle', { target: 'body' })
		putStyle(style) {
			if(style.detail.name!="Empty" && JSON.stringify(this.style) != JSON.stringify(style.detail)){
				this.style = style.detail
				fetch(this.source+'/styles/'+style.detail.name, {
					method: 'PUT',
					headers: {
							'Content-Type': 'application/json',
					},
						body: JSON.stringify(style.detail), // body data type must match "Content-Type" header
					})
					.catch(err=>console.error(err)) 
			}

		}

  componentDidLoad(){
		const style = window.location.pathname.slice(1)
		const map:any =  document.querySelector("kortxyz-mapbox").map
		if(style){
			fetch(this.source+'/styles/'+style)
			.then(e=>{
				switch(e.status) {
					case 200:
					  	return e.json()
					case 400:
						this.createStyle(style)
					  break;
				  }
			})
			.then(style=>{
				this.style = style;
				map.style.loadJSON(style)
			})
		}

		else this.loadSources();
	}

	createStyle(styleName){
		const style = { "version": 8, "name": styleName, "metadata": { "mapbox:autocomposite": true }, glyphs:`${window.location.origin}/fonts/{fontstack}/{range}.pbf`, "sources":{},   "layers": [] };

		const map:any =  document.querySelector("kortxyz-mapbox").map
					map.style.loadJSON(style)

			fetch(this.source+'/styles', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
				},
				body: JSON.stringify(style), // body data type must match "Content-Type" header
			})
			.then(_=>this.loadSources())
			.catch(err=>console.error(err))
	}

  loadSources(){
			fetch(this.source+'/collections')
			.then(e=>e.json())
			.then(data=>
						data.collections.forEach(collection=>{
							const name = collection.name;
							const source = collection.links
														.filter(e=>e.rel=="tiles")
														.map(e=>{
																const tiles = [e.href
																		.replace("{level}","{z}")
																		.replace("{row}","{x}")
																		.replace("{col}","{y}")
																		.replace("{tilingSchemeId}","GoogleMapsCompatible")]
	
																const type = e.type=="application/vnd.vector-tile"?"vector":"raster"
																const tileSize = e.type=="application/vnd.vector-tile"? 512: 256
	
																return {tiles,type,"tileSize": tileSize}
															});
								document.querySelector("kortxyz-mapbox").map.addSource(name,source[0])
					})
			)
  }
  render() {
    return [
			<row>
			<kortxyz-sidebar>
				<kortxyz-sideitem name="layerlist" icon="layers">
					<kortxyz-layerlist></kortxyz-layerlist>
				</kortxyz-sideitem>
				<kortxyz-sideitem name="sources" icon="sources">
					<kortxyz-sourcelist></kortxyz-sourcelist>
				</kortxyz-sideitem>
				<kortxyz-sideitem name="cache" icon="save_alt">
				</kortxyz-sideitem>
			</kortxyz-sidebar>
			<kortxyz-mapbox accesstoken="pk.eyJ1IjoidGlub2tzIiwiYSI6ImNqM2p5d2hkbTAwM3UzMnBwbWF2NG96Z3IifQ._hWk-eEzh8sNjp3qA_cJuQ"></kortxyz-mapbox>
			</row>,
			<kortxyz-footer></kortxyz-footer>

		];
	}
	
}