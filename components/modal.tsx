'use client ';

import { X } from 'lucide-react';
import React from 'react';
interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}
export default function Modal({ isVisible, children }: ModalProps) {
  if (!isVisible) return null;
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/25 '>
      <div className=' w-[600px] flex flex-col'>
        <button className='place-self-end'>
          <X color='white' size={18} />
        </button>
        <div className='bg-white rounded-sm '>{children}</div>
      </div>
    </div>
  );
}
