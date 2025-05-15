import { useQuery } from '@tanstack/react-query'
import type { IUser } from '../../-types'
import { fetchUsers } from '../../_api/-users'

export const useGetUsers = () => {
  return useQuery<IUser[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    // Keep the data fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Refetch the data every 5 minutes
    // refetchInterval: 5 * 60 * 1000,
  })
}
