import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-mapinfo-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kortxyz-mapinfo-content></kortxyz-mapinfo-content>');

    const element = await page.find('kortxyz-mapinfo-content');
    expect(element).toHaveClass('hydrated');
  });
});
