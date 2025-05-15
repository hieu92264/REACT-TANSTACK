import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUser } from '../../-types'
import { createUser } from '../../_api/-users'
import { toast } from 'sonner'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<
    IUser,
    Error,
    Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>
  >({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully')
    },
  })
}
