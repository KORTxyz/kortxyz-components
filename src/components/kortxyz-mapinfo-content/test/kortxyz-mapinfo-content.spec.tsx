import { newSpecPage } from '@stencil/core/testing';
import { KortxyzMapinfoContent } from '../kortxyz-mapinfo-content';

describe('kortxyz-mapinfo-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KortxyzMapinfoContent],
      html: `<kortxyz-mapinfo-content></kortxyz-mapinfo-content>`,
    });
    expect(page.root).toEqualHtml(`
      <kortxyz-mapinfo-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kortxyz-mapinfo-content>
    `);
  });
});
