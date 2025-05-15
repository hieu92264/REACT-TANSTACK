import axiosInstance from '@/configs/axios.config'
import React from 'react'

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

export const useGetUserQuery = ({ initialData }: { initialData?: IUser[] }) => {
  const [data, setData] = React.useState<IUser[]>(
    Array.isArray(initialData) ? initialData : [],
  )
  const [isLoading, setIsloading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const fetchUsers = async () => {
    try {
      setIsloading(true)
      setError(null)
      const response = await axiosInstance.get<{ data: IUser[] }>('/users')
      console.log(response.data.data)
      setData(response.data.data)
      setIsSuccess(true)
    } catch (error) {
      setIsloading(false)
      setError(error as Error)
      setIsSuccess(false)
      console.error('Error fetching users:', error)
    } finally {
      setIsloading(false)
    }
  }

  return {
    data,
    isLoading,
    error,
    isSuccess,
    fetchUsers,
  }
}

export const useDeleteUserMutation = () => {
  const [isLoading, setIsloading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const deleteUser = async (id: number) => {
    try {
      setIsloading(true)
      setError(null)
      const response = await axiosInstance.delete<{ data: IUser }>(
        `/users/${id}`,
      )
      if (response.status === 200) {
        setIsSuccess(true)
      }
    } catch (error) {
      setIsloading(false)
      setError(error as Error)
      setIsSuccess(false)
      console.error('Error fetching users:', error)
    } finally {
      setIsloading(false)
    }
  }

  return {
    isLoading,
    error,
    isSuccess,
    deleteUser,
  }
}
