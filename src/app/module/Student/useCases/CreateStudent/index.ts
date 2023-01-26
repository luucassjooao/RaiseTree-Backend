import getAllSubjects from '../../../Subject/useCases/GetAllSubjects';
import StudentRepository from '../../repositories/implementation/StudentRepository';

export default async function CreateStudent(
  classroom: string,
  userId: string,
) {
  const findSubjects = await getAllSubjects();
  const arraySubjectsFrequency = findSubjects!.map((subject) => ({
    subjectName: subject.name,
    dates: [],
  }));

  await StudentRepository.store({
    classroom,
    current_points: 0,
    points: [],
    userId,
    frequency: arraySubjectsFrequency,
  });
}
