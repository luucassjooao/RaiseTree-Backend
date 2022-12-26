import { compare } from 'bcrypt';
import AppError from '../../../../error';
import { generateAccessToken } from '../../../../utils/generateTokens';
import UserRepository from '../../../User/repositories/implementation/UserRepository';

export default async function Login(
  email: string,
  password: string,
) {
  const findUserByEmail = await UserRepository.findEmail(email);
  if (!findUserByEmail) throw new AppError('Email ou senha está incorreta!', 404);

  const isMatchPassword = await compare(password, findUserByEmail.password);
  if (!isMatchPassword) throw new AppError('Email ou senha está incorreta!', 404);

  const findUserById = await UserRepository.findId(findUserByEmail.id);

  const token = generateAccessToken({
    id: findUserByEmail.id,
    infosUser: {
      findUser: { ...findUserById, password: '', code: '' },
    },
  });

  return {
    findUser: { ...findUserById, password: '', code: '' },
    ...{ token },
  };
}
