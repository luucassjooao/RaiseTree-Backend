import { TUser } from '../../prisma/infosUser';
import { TStudent } from '../../prisma/student';
import { TTeacher } from '../../prisma/teacher';

export type TDecodedAccess = {
  id: string;
  infosUser: {
    findUser: TUser;
    findInformationOfUser: TTeacher | TStudent;
  }
}
