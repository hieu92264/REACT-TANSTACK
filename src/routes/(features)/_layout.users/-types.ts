export interface IUser {
  id: number
  fullName: string
  email: string
  password: string
  role: 'admin' | 'teacher' | 'student'
  address?: string | null
  createdAt?: string
  updatedAt?: string
}
