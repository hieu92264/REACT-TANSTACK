import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import UserModal from './-UserModal'
import { Button, buttonVariants } from '@/components/ui/button'
import { useGetUsers } from '../_hooks/_queries/-useGetUsers'
import type { IUser } from '../-types'
import { useDeleteUser } from '../_hooks/_mutations/-useDeleteUser'

const UserTable = () => {
  //hook get
  const { data: users = [], isLoading, isError, error } = useGetUsers()
  //hook delete
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()
  //modal
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [record, setRecord] = React.useState<IUser | null>(null)
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  const columnHelper = createColumnHelper<IUser>()
  const columns: ColumnDef<IUser, any>[] = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('fullName', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor('password', {
    //   header: 'Password',
    //   cell: (info) => info.getValue(),
    // }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: (info) => info.getValue() || '-',
    }),
    // Action column for edit/delete
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdateUser(user)}
              className={
                buttonVariants({ variant: 'outline', size: 'sm' }) +
                ' font-medium'
              }
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              disabled={isDeleting}
              className={
                buttonVariants({ variant: 'destructive', size: 'sm' }) +
                ' font-medium'
              }
            >
              {isLoading ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        )
      },
    }),
  ]
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleCreateUser = () => {
    setIsOpenModal(true)
    setIsUpdate(false)
    setRecord(null)
  }

  const handleUpdateUser = (record: IUser) => {
    setIsOpenModal(true)
    setIsUpdate(true)
    setRecord(record)
  }

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
    }
  }

  // 8. Loading / Error UI
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <div className="p-4">
      <div className="overflow-y-scroll">
        <div className="flex justify-end items-center mb-4 mr-4">
          <Button
            onClick={() => {
              handleCreateUser()
            }}
          >
            Create
          </Button>
        </div>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-100 uppercase text-gray-600 text-sm"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal
        isOpenModal={isOpenModal}
        onOpenChange={setIsOpenModal}
        isUpdate={isUpdate}
        record={record ?? undefined}
      />
    </div>
  )
}

export default UserTable
