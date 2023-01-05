import { Request, Response } from 'express';
import CleanCacheStudentsClassroom from '../../useCases/GetAllStudentsByClassroom/CleanCacheRedisGetAllStudentsByClassroom';

class CleanUpCacheRedisController {
  async studentsByClassroom(request: Request, response: Response) {
    const { classrooms } = request.params;

    await CleanCacheStudentsClassroom(classrooms);

    return response.status(204);
  }
}

export default new CleanUpCacheRedisController();
