import { newE2EPage } from '@stencil/core/testing';

describe('kortxyz-codemirror', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<kortxyz-codemirror></kortxyz-codemirror>');

    const element = await page.find('kortxyz-codemirror');
    expect(element).toHaveClass('hydrated');
  });
});
