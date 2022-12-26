import { PrismaClient } from '@prisma/client';
import app from './app';

(async () => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    const { NODE_ENV, URL_SERVER_IS_RUNNING } = process.env;
    const SERVER_PORT = process.env.SERVER_PORT || 3245;

    app.listen(SERVER_PORT, () => {
      if (NODE_ENV === 'development') {
        console.log(`server is running in port: http://localhost:${SERVER_PORT}`);
      } else {
        console.log(`server is running on ${URL_SERVER_IS_RUNNING}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
