import 'dotenv/config';

import { createTransport } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import LiteralTemplateSendMail from './literalTemplateSendMail';

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

export default async function sendMail(
  to: string,
  typeTemplate: 'sendMailForFirstTime' | 'sendMailToTeacher',
  url: string,
  text: string,
  organizationName?: string,
) {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND,
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: `${accessToken}`,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to,
      subject: 'Raise Tree',
      html: LiteralTemplateSendMail[typeTemplate](url, text, organizationName as string),
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
