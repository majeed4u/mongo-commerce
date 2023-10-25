'use client';
import { productSchema } from '@/prisma/zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/upload-image';
import { useImageModalStore } from '@/hooks/use-image-modal';
import { ImageModal } from '@/components/image-modal';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1),
  shortdesc: z.string().min(1).max(100),
  longdesc: z.string().min(1).max(1000),
  image: z.string().url(),
  price: z.coerce.number().min(1),
  bestSeller: z.boolean(),
  newArrival: z.boolean(),
  topRated: z.boolean(),
});

type formValues = z.infer<typeof formSchema>;
export default function NewProductForm() {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useImageModalStore();
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      shortdesc: '',
      longdesc: '',
      image: '',
      price: 0,
      bestSeller: false,
      newArrival: false,
      topRated: false,
    },
  });
  const onSubmit = async (data: formValues) => {
    setLoading(true);
    try {
      await axios.post('/api/products', data);
      router.push('/admin/products');
      router.refresh();
      toast.success('Product Created');
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Name'
                    {...field}
                    className=' focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='shortdesc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Short Description'
                    {...field}
                    className=' focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='longdesc'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Long Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Long Description'
                    {...field}
                    className=' focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newArrival'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    <span>New Arrival</span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bestSeller'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    <span> Best Seller</span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='topRated'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
                <FormControl>
                  <Checkbox
                    defaultChecked
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    <span>Top Rated</span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel> Price</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='9.99'
                    {...field}
                    className=' focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col '>
                  <Button onClick={onOpen} className='mt-2' variant='outline'>
                    <Upload className='w-4 h-4 mr-2' />{' '}
                    <span>upload Image</span>
                  </Button>
                </div>
                <ImageModal isOpen={isOpen} onClose={onClose}>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </ImageModal>
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
