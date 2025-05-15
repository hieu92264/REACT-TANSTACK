import axiosInstance from '@/configs/axios.config'
import type { IUser } from '../-types'

export const fetchUsers = async () => {
  const response = await axiosInstance.get<{ data: IUser[] }>('/users')
  console.log('users fetched: ', response.data.data)
  return response.data.data
}

export const fetchUserById = async (id: number) => {
  const response = await axiosInstance.get<{ data: IUser }>(`/users/${id}`)
  console.log('user fetched by ID: ', response.data.data)
  return response.data.data
}

export const createUser = async (
  user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  const response = await axiosInstance.post<{ data: IUser }>('/users', user)
  console.log('user created: ', response.data.data)
  return response.data.data
}

export const updateUser = async (
  id: number,
  user: Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>,
) => {
  const response = await axiosInstance.patch<{ data: IUser }>(
    `/users/${id}`,
    user,
  )
  console.log('user updated: ', response.data.data)
  return response.data.data
}

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete<{ data: IUser }>(`/users/${id}`)
  console.log('user deleted: ', response.data.data)
  return response.data.data
}
