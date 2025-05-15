// import {
//   Table,
//   TableCaption,
//   TableHead,
//   TableHeader,
// } from '@/components/ui/table'
import { createLazyFileRoute } from '@tanstack/react-router'
import UserTable from './_components/-UserTable'

export const Route = createLazyFileRoute('/(features)/_layout/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserTable />
}
