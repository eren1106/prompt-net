import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

interface DialogButtonProps {
  children: ReactNode;
  content: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const DialogButton = ({
    children,
    content,
    title,
    description,
    className
  }: DialogButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {content}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default DialogButton