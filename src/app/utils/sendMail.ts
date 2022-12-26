import 'dotenv/config';

import { createTransport } from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

export default async function sendMail(to: string, url: string, txt: string) {
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
      subject: 'Project School',
      html: `
      <div style="display: grid; max-width: 700px; margin: auto; border: 8px solid #001F68; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase; color: #001F68;">O nome da escola aqui</h2>
        <p style="text-align: center; font-size: 20px;">Alguma descição aq</p>
        <a href=${url} style="background: rgb(189, 189, 189); text-align: center; font-size: 20px; padding: 10px 20px; margin: 10px auto;">${txt}</a>
        <p>Se o botão não funcionar por qualquer razão, click nesse link!</p>
        <div><a href=${url}>${url}</a></div>
      </div>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
