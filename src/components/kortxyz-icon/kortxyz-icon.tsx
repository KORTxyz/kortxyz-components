import { Component, Prop, Host, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'kortxyz-icon',
  assetsDirs: ['assets'],
  styleUrl: 'kortxyz-icon.css',
  shadow: true,
})

export class KortxyzIcon {
  @Prop() icon: string = 'layers';
  @Prop() size: string = "16";
  @Prop() color: string = "inherit";

  d = "";

  loadIcon = async (icon, size) => {
    try {
      return await import(getAssetPath(`./assets/icons/${icon}${size}.js`))
    } catch (e) {
      return await import(getAssetPath(`./assets/icons/raster16.js`))
    }
  }

  async componentWillLoad() {
    const { d } = await this.loadIcon(this.icon, this.size);
    this.d = d;
  }

  render() {
    return (
        <Host>
          <svg width={this.size} height={this.size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d={this.d}
              fill={this.color} />
          </svg>

          <slot></slot>
        </Host>
      )
  }
}
