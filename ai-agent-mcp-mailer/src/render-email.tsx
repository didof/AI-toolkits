import { pretty, render } from '@react-email/components';

export async function renderEmailTemplate(templateName: string, options: any) {
  const templateModule = await import(`../emails/${templateName}`);
  const TemplateComponent =
    templateModule.default ||
    templateModule.EmailTemplate ||
    templateModule[Object.keys(templateModule)[0]];
  if (!TemplateComponent) {
    throw new Error(`No valid export found in template: ${templateName}`);
  }

  const html = await pretty(await render(<TemplateComponent {...options} />));
  const text = await pretty(await render(<TemplateComponent {...options} />, { plainText: true }));

  return { html, text };
}