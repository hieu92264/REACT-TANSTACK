import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUser } from '../../-types'
import { updateUser } from '../../_api/-users'
import { toast } from 'sonner'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<
    IUser,
    Error,
    Partial<Omit<IUser, 'createdAt' | 'updatedAt'>>
  >({
    mutationFn: ({ id, ...data }) => {
      if (id === undefined) {
        throw new Error('User ID is required')
      }
      return updateUser(id, data)
    },
    onSuccess: (_updateUser, variables) => {
      //xoa di users cu trong cache va refetch lai user moi
      queryClient.invalidateQueries({ queryKey: ['users'] })
      //xoa di user cu trong cache va refetch lai user moi
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
      toast.success('User updated successfully')
    },
  })
}
