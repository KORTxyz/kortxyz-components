import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-maplibre', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kortxyz-maplibre></kortxyz-maplibre>');

    const element = await page.find('kortxyz-maplibre');
    expect(element).toHaveClass('hydrated');
  });
});
