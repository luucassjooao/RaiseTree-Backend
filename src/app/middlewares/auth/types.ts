import { TUser } from '../../prisma/infosUser';
import { TStudent } from '../../prisma/student';
import { TTeacher } from '../../prisma/teacher';
import { TDecodedToken } from '../../utils/generateTokens';

type InfosToken = {
  findUser: TUser;
  findInformationOfUser: TTeacher | TStudent;
}

export type TDecodedAccess = TDecodedToken<InfosToken>;
