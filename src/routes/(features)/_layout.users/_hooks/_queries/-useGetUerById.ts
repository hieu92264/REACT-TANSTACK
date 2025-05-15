import { useQuery } from '@tanstack/react-query'
import { fetchUserById } from '../../_api/-users'

const useGetUserById = (id?: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
    enabled: typeof id === 'number',
    staleTime: 1000 * 60 * 2,
  })
}
