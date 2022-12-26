import { PrismaClient } from '@prisma/client';
import app from './app';

(async () => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    const { NODE_ENV, URL_SERVER_IS_RUNNING } = process.env;
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      if (NODE_ENV === 'development') {
        console.log(`server is running in port: http://localhost:${PORT}`);
      } else {
        console.log(`server is running on ${URL_SERVER_IS_RUNNING}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
