/* eslint-disable no-unused-vars */
import { TActivity } from '../../../prisma/activity';
import { TAnsweredActivity } from '../../../prisma/answeredActivity';

export interface IAnswerActivityRepository {
  store(answer: string, activityId: string, studentId: string): Promise<TAnsweredActivity>;
  findId(id: string): Promise<TAnsweredActivity | null>;
  findStudentOnActivity(activityId: string, studentId: string): Promise<TAnsweredActivity | null>;
  replyAnswerOfStudent(
    note_of_teacher: string,
    answerId: string,
  ): Promise<TAnsweredActivity | null>;
  getAllAnswerActivityOfStudent(
    studentId: string,
    teacherId: string
  ): Promise<(TAnsweredActivity & { Activity: TActivity | null; })[]>
}
