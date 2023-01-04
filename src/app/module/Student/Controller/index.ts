import { Request, Response } from 'express';
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
}

export default new StudentController();
