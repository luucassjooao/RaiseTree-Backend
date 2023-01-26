export type TUser = {
  id: string
  name: string
  code: string
  email: string
  password: string
  type: any
  createdAt: Date
  updatedAt: Date
  organizationId: string | null
}
