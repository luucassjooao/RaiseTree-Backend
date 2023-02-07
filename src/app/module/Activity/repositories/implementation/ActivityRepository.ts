import prismaClient from '../../../../prisma';
import { TActivity } from '../../../../prisma/activity';
import { TUser } from '../../../../prisma/infosUser';
import { TSubject } from '../../../../prisma/subject';
import { IActivityRepository } from '../IActivityRepository';

class ActivityRepositories implements IActivityRepository {
  async store(data: Omit<TActivity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TActivity> {
    return prismaClient.activity.create({
      data,
    });
  }

  async getUniqueActivityById(
    id: string,
  ): Promise<(TActivity & { subject: TSubject; Teacher: { user: TUser; } | null; }) | null> {
    return prismaClient.activity.findUnique({
      where: {
        id,
      },
      include: {
        Teacher: {
          select: {
            user: true,
            subject: true,
          },
        },
        subject: true,
        answered_activities: {
          select: {
            id: true,
            answer: true,
            createdAt: true,
            note_of_teacher: true,
            Student: {
              select: {
                id: true,
                points: true,
                classroom: true,
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllActivitiesOfHomeStudent(
    classroomUser: string,
  ): Promise<(TActivity & { subject: TSubject; })[]> {
    return prismaClient.activity.findMany({
      where: {
        classrooms: {
          hasSome: [classroomUser],
        },
        createdAt: {
          lt: new Date(),
        },
      },
      include: {
        subject: true,
        Teacher: {
          select: {
            user: true,
            subject: true,
          },
        },
      },
    });
  }

  async getAllActivitiesOfHomeTeacher(
    teacherId: string,
  ): Promise<(TActivity & { subject: TSubject; })[]> {
    return prismaClient.activity.findMany({
      where: {
        createdAt: {
          lt: new Date('2023-12-01T18:50:21.590Z'),
        },
        teacherId,
      },
      include: {
        subject: true,
        Teacher: {
          select: {
            user: true,
            subject: true,
          },
        },
      },
    });
  }

  async getAllActivitysByOrganizationId(
    organizationId: string,
  ) {
    return prismaClient.activity.findMany({
      where: {
        Teacher: {
          user: {
            organizationId,
          },
        },
      },
      include: {
        Teacher: {
          select: {
            user: true,
            subject: true,
          },
        },
        subject: true,
      },
    });
  }
}

export default new ActivityRepositories();
