export type TActivity = {
  id: string
  title: string
  description: string
  activity: string
  classrooms: string[]
  type: any;
  previous_points: number
  dateExpiration: Date
  createdAt: Date
  updatedAt: Date
  teacherId: string | null
  subjectId: string
}
