export type TAnsweredActivity = {
  id: string
  note_of_teacher: string
  answer: string
  createdAt: Date
  updatedAt: Date
  studentId: string | null
  activityId: string | null
};
