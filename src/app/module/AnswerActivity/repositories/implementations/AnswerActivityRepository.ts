/* eslint-disable camelcase */
import { TActivity } from '../../../../prisma/activity';
import { prismaAnsweredActivity, TAnsweredActivity } from '../../../../prisma/answeredActivity';
import { IAnswerActivityRepository } from '../IAnswerActivityRepository';

class AnsweredActivityRepository implements IAnswerActivityRepository {
  async store(answer: string, activityId: string, studentId: string): Promise<TAnsweredActivity> {
    return prismaAnsweredActivity.create({
      data: {
        answer,
        activityId,
        studentId,
        note_of_teacher: '',
      },
    });
  }

  async findId(id: string): Promise<TAnsweredActivity | null> {
    return prismaAnsweredActivity.findUnique({
      where: {
        id,
      },
    });
  }

  async findStudentOnActivity(
    activityId: string,
    studentId: string,
  ): Promise<TAnsweredActivity | null> {
    return prismaAnsweredActivity.findFirst({
      where: {
        activityId,
        studentId,
      },
    });
  }

  async replyAnswerOfStudent(
    note_of_teacher: string,
    answerId: string,
  ): Promise<TAnsweredActivity | null> {
    return prismaAnsweredActivity.update({
      where: {
        id: answerId,
      },
      data: {
        note_of_teacher,
      },
    });
  }

  async getAllAnswerActivityOfStudent(
    studentId: string,
    teacherId: string,
  ): Promise<(TAnsweredActivity & { Activity: TActivity | null; })[]> {
    return prismaAnsweredActivity.findMany({
      where: {
        studentId,
        Activity: {
          teacherId,
        },
      },
      include: {
        Activity: {
          include: {
            Teacher: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}

export default new AnsweredActivityRepository();
