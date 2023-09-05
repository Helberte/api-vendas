import Handlebars from "handlebars";
import fs from 'fs';

interface ITemplateVariable{
  [key: string]: number | string
}

interface IParseMailTemplate{
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parce({ file, variables }: IParseMailTemplate): Promise<string>{

    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8'});
    const parseTemplate       = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}