'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Role, User } from '@prisma/client';
const formSchema = z.object({
  role: z.nativeEnum(Role),
});

type formValues = z.infer<typeof formSchema>;
interface UpdateUserFormProps {
  user: User | null;
}
export default function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: user?.role,
    },
  });
  const onSubmit = async (data: formValues) => {
    setLoading(true);
    try {
      await axios.patch(`/api/users/${user?.id}`, data);
      router.push('/admin/users');
      router.refresh();
      toast.success('user Updated Successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid items-end grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 '>
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder='Select a Role to display'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ADMIN'>ADMIN</SelectItem>
                    <SelectItem value='USER'>USER</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            Update User
          </Button>
        </div>
      </form>
    </Form>
  );
}
