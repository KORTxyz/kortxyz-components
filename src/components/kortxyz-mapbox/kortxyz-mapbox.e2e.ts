import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-mapbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<kortxyz-mapbox></kortxyz-mapbox>');
    const element = await page.find('my-component');
    expect(element).toHaveClass('hydrated');
  });

});
