import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { IUser } from '../../-types'
import { deleteUser } from '../../_api/-users'
import { toast } from 'sonner'

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation<IUser, Error, number>({
    mutationFn: deleteUser,
    // Khi thành công, chỉ show toast success
    onSuccess: () => {
      toast.success('Delete user successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },

    // Khi lỗi, show toast error
    onError: (err) => {
      toast.error(`Delete failed: ${err.message}`)
    },
  })
}
