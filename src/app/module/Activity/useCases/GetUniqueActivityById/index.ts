import AppError from '../../../../error';
import { TActivity } from '../../../../prisma/activity';
import { TUser } from '../../../../prisma/infosUser';
import { TSubject } from '../../../../prisma/subject';
import ActivityRepository from '../../repositories/implementation/ActivityRepository';

export default async function GetUniqueActivityById(
  id: string,
  classroomUser: string,
  typeUser: string,
): Promise<
  (TActivity &
    {
      subject: TSubject;
      Teacher: { user: TUser; } | null;
    }
  ) | null> {
  const activity = await ActivityRepository.getUniqueActivityById(id);

  if (typeUser === 'student') {
    const compareClassrooms = activity?.classrooms
      .findIndex((sala: string) => sala === classroomUser);

    if (compareClassrooms === -1) throw new AppError('Você não pode visualizar está atividade!');
  }

  return activity;
}
