import { newSpecPage } from '@stencil/core/testing';
import { KortxyzMapinfo } from '../kortxyz-mapinfo';

describe('kortxyz-mapinfo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KortxyzMapinfo],
      html: `<kortxyz-mapinfo></kortxyz-mapinfo>`,
    });
    expect(page.root).toEqualHtml(`
      <kortxyz-mapinfo>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kortxyz-mapinfo>
    `);
  });
});
