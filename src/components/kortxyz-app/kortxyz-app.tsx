import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-app',
  styleUrl: 'kortxyz-app.css'
})

export class kortxyzApp {

  @Prop() source:string;

	@Event() sourcesAdded: EventEmitter;

  componentDidLoad(){
		const style = window.location.pathname.slice(1)
		if(style){
			console.log("window.location.pathname: ", style)
		}
		else if(this.source){
			fetch(this.source)
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
																		.replace("{tilingSchemeId}","GoogleMapsCompatible")
																		.replace("localhost","http://localhost")]
	
																const type = e.type=="application/vnd.vector-tile"?"vector":"raster"
																const tileSize = e.type=="application/vnd.vector-tile"? 512: 256
	
																return {tiles,type,"tileSize": tileSize}
															});
								document.querySelector("kortxyz-mapbox").map.addSource(name,source[0])
					})
			).then(()=> this.sourcesAdded.emit() )
		}
	
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
			</kortxyz-sidebar>
			<kortxyz-mapbox></kortxyz-mapbox>
			</row>,
			<kortxyz-footer></kortxyz-footer>

		];
	}
	
}