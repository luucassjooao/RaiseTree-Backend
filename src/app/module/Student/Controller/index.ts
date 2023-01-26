import { Request, Response } from 'express';
import addFrequencyStudent from '../useCases/AddFrequencyStudent';
import GetAllStudentsByClassroom from '../useCases/GetAllStudentsByClassroom';

class StudentController {
  async getAllStudentsByClassroom(request: Request, response: Response): Promise<Response> {
    const { classroom } = request.params;

    const getStudents = await GetAllStudentsByClassroom(
      classroom,
      request.user?.type_model_teacher?.classrooms as string[],
    );

    return response.status(200).json(getStudents);
  }

  async addFrequency(request: Request, response: Response) {
    const { frequencyStudents } = request.body;

    await addFrequencyStudent(frequencyStudents);

    return response.status(204);
  }
}

export default new StudentController();
