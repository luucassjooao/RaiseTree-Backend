export type UserInformations = {
  id: string;
  type: 'student' | 'teacher';
  name: string;
  email: string;
  password: string;
  code: string;
  classroom: string[];
  matter?: string;
}

export type DecodedToken = {
  id?: string;
  infosUser: UserInformations;
  iat: number;
  exp: number;
}

export type TTUserPersonal = {
  name: string;
  email: string;
  password: string;
  type: string;
  code: string;
}

export type TTask = {
  title: string;
  description: string;
  activity: string;
  classrooms: Array<string>;
  dateExpiration: Date;
  matter: string;
  teacher_id: string;
  type: 'Atividade' | 'Tarefa' | 'Trabalho';
  previousPoints: number;
}
