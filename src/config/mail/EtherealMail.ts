import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable{
  [key: string]: number | string
}

interface IParseMailTemplate{
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail{
  to: IMailContact;
  from?: IMailContact,
  subject: string,
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData } : ISendMail) : Promise<void>{

    const account      = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@vendas.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await mailTemplate.parce(templateData)
    });

    console.log('messagem sent: %s', message.messageId);
    console.log('Preview url %s', nodemailer.getTestMessageUrl(message));
  }
}