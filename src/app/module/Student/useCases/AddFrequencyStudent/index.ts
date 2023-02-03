import { Prisma } from '@prisma/client';
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
): Promise<TStudent[]> {
  const getStudents: Prisma.Prisma__StudentClient<TStudent, never>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const { student, subjectName } of infosStudents) {
    const findStudent = await StudentRepository.findId(student.id);
    const guardFrequency: any = findStudent?.frequency;
    const findSubject: TFrequency = guardFrequency
      .find((frequency: TFrequency) => frequency.subjectName === subjectName);
    findSubject.dates = [...findSubject.dates, String(new Date().toLocaleDateString())];

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
