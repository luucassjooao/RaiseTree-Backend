/* eslint-disable camelcase */
import prismaClient from '../../../../prisma';
import { TActivity } from '../../../../prisma/activity';
import { TAnsweredActivity } from '../../../../prisma/answeredActivity';
import { IAnswerActivityRepository } from '../IAnswerActivityRepository';

class AnsweredActivityRepository implements IAnswerActivityRepository {
  async store(answer: string, activityId: string, studentId: string): Promise<TAnsweredActivity> {
    return prismaClient.answeredActivity.create({
      data: {
        answer,
        activityId,
        studentId,
        note_of_teacher: '',
      },
    });
  }

  async findId(id: string): Promise<TAnsweredActivity | null> {
    return prismaClient.answeredActivity.findUnique({
      where: {
        id,
      },
    });
  }

  async findStudentOnActivity(
    activityId: string,
    studentId: string,
  ): Promise<TAnsweredActivity | null> {
    return prismaClient.answeredActivity.findFirst({
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
    return prismaClient.answeredActivity.update({
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
    return prismaClient.answeredActivity.findMany({
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
