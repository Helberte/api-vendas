import Handlebars from "handlebars";

interface ITemplateVariable{
  [key: string]: number | string
}

interface IParseMailTemplate{
  template: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTemplate {
  public async parce<Type>( { template, variables } : IParseMailTemplate ) : Promise<string>{
    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }
}