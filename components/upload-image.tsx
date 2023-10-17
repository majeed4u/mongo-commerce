'use client';

import { UploadDropzone } from '@/lib/uploadthing';
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';

import { useImageModalStore } from '@/hooks/use-image-modal';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url?: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const { onClose } = useImageModalStore();
  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  if (value) {
    return (
      <div className='relative w-32 h-32 '>
        <Image
          src={value}
          fill
          className='object-contain border-[.5px] border-gray-100 rounded-full '
          alt='Server Image '
        />
        <button
          className='absolute top-0 p-1 text-white rounded-full right-4 bg-rose-500 '
          onClick={() => onChange()}
        >
          <X size={16} />
        </button>
      </div>
    );
  }
  return (
    <main className='flex flex-col items-center justify-between '>
      <UploadDropzone
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          if (res) {
            onChange(res?.[0]?.url);
          }
          handleClose(false);

          console.log('Files: ', res);
          console.log('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
``;
