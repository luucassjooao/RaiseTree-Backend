import { Prisma } from '@prisma/client';
import AppError from '../../../../error';
import prismaClient from '../../../../prisma';
import { TFrequency, TStudent } from '../../../../prisma/student';
import StudentRepository from '../../repositories/implementation/StudentRepository';

interface TFrequencyStudents {
  subjectName: string;
  frequency: boolean;
  student: TStudent;
}

export default async function addFrequencyStudent(
  infosStudents: TFrequencyStudents[],
  classroomsOfTeacher: string[],
): Promise<TStudent[] | null> {
  const getStudents: Prisma.Prisma__StudentClient<TStudent, never>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const { student, subjectName } of infosStudents) {
    if (!classroomsOfTeacher.includes(student.classroom)) throw new AppError('Parece que voce não pode anotar a frequencia dessa sala!');
    const findStudent = await StudentRepository.findId(student.id);
    const guardFrequency: any = findStudent?.frequency;
    const findSubject: TFrequency = guardFrequency
      .find((frequency: TFrequency) => frequency.subjectName === subjectName);
    const findToday = findSubject?.dates
      .find((today) => today === String(new Date().toLocaleDateString('pt-br')));
    if (findToday) throw new AppError(`O aluno ${findStudent?.user.name} já teve sua presença hoje!`);
    findSubject.dates = [...findSubject.dates, String(new Date().toLocaleDateString('pt-br'))];

    const updateFrequency = Prisma.validator<Prisma.StudentUpdateInput>()({
      frequency: guardFrequency,
    });
    getStudents.push(
      prismaClient.student.update({
        where: {
          id: findStudent?.id,
        },
        data: updateFrequency,
      }),
    );
  }

  return prismaClient.$transaction(getStudents);
}
