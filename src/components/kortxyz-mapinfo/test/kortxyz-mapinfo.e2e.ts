import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-mapinfo', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kortxyz-mapinfo></kortxyz-mapinfo>');

    const element = await page.find('kortxyz-mapinfo');
    expect(element).toHaveClass('hydrated');
  });
});
