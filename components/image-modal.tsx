import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Upload } from 'lucide-react';

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ImageModal({ children, isOpen, onClose }: ImageUploadProps) {
  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='p-4 border border-black '>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
