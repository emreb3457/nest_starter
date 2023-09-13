import { Injectable } from '@nestjs/common';
import * as hbs from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class HandlebarsService {
  private templates: { [key: string]: hbs.TemplateDelegate };

  constructor() {
    this.templates = {};
    this.loadTemplates();
  }

  private loadTemplates() {
    const templateFiles = fs.readdirSync('./src/templates');

    for (const file of templateFiles) {
      const templateName = file.split('.')[0];
      const source = fs.readFileSync(`./src/templates/${file}`, 'utf-8');
      this.templates[templateName] = hbs.compile(source);
    }
  }

  renderTemplate(templateName: string, context: unknown): string {
    if (!this.templates[templateName]) {
      throw new Error(`Template ${templateName} not found`);
    }

    return this.templates[templateName](context);
  }
}
