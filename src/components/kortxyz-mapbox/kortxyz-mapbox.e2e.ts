import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-mapbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<kortxyz-mapbox></kortxyz-mapbox>');
    const element = await page.find('kortxyz-mapbox');
    expect(element).toHaveClass('hydrated');
  });

});
