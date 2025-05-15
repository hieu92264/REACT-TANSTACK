import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
} from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { IUser } from '../_hooks/-use-user-api'
import { useCreateUser } from '../_hooks/_mutations/-useCreateUser'
import { useUpdateUser } from '../_hooks/_mutations/-useUpdateUser'

export type UserModalProps = {
  isOpenModal: boolean
  onOpenChange: (open: boolean) => void
  isUpdate: boolean
  record?: IUser
}

const userFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name is required')
    .max(50, 'Full name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['admin', 'teacher', 'student']),
  address: z.string().optional(),
})

export type UserFormSchema = z.infer<typeof userFormSchema>

const UserModal: React.FC<UserModalProps> = ({
  isOpenModal,
  onOpenChange,
  isUpdate,
  record,
}) => {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'student',
      address: '',
    },
  })

  const { mutate: createUser } = useCreateUser()
  const { mutate: updateUser } = useUpdateUser()

  React.useEffect(() => {
    if (isOpenModal && isUpdate && record) {
      form.reset({
        fullName: record.fullName,
        email: record.email,
        password: record.password,
        role: record.role,
        address: record.address || '',
      })
    } else {
      form.reset({
        fullName: '',
        email: '',
        password: '',
        role: 'student',
        address: '',
      })
    }
  }, [isOpenModal, isUpdate, record, form])

  function onSubmit(values: UserFormSchema) {
    if (isUpdate && record) {
      updateUser({
        id: record.id,
        ...values,
      })
    } else {
      createUser(values)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed top-1/2 left-1/2 max-w-lg w-full -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isUpdate ? 'Update User' : 'Create User'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Enter full name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Enter email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Enter address (optional)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{isUpdate ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserModal
