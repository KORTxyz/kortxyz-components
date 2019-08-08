import { Component,Prop, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-footer',
  styleUrl: 'kortxyz-footer.css'
})

export class kortxyzFooter {
	coords: string = "31Q AD 877074";
	/**
    * Handles if the GPS should be turn off or on
    */
	@Prop({ mutable: true }) gpsState = "off";
	GPSobj:any;

	gpsStates = {
		"fixed": <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none"/>
									<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
							</svg>,
		"not_fixed": <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24">
										<path d="M0 0h24v24H0z" fill="none"/>
										<path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
									</svg>,											
		"off": <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none"/>
							<path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"/>
						</svg>
	}


  render() {
    return ([
			<item>Local*</item>,
			<item>Anonymous</item>,
			<spacer></spacer>,
			<item id="coords" contenteditable>31Q AD 877074</item>,
			<item id="gps" >{this.gpsStates[this.gpsState]}</item>,
			<spacer></spacer>,
			<item id="background" >Decimal</item>,
			<item>
				<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24">
					<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
					<path d="M0 0h24v24H0z" fill="none"/>
				</svg>
			</item>
    ]);
  }
}