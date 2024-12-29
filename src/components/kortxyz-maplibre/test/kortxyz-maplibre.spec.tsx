import { newSpecPage } from '@stencil/core/testing';
import { KortxyzMaplibre } from '../kortxyz-maplibre';

describe('kortxyz-maplibre', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KortxyzMaplibre],
      html: `<kortxyz-maplibre></kortxyz-maplibre>`,
    });
    expect(page.root).toEqualHtml(`
      <kortxyz-maplibre>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </kortxyz-maplibre>
    `);
  });
});
