import { cn } from '@/lib/utils';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileAvatarProp {
  src: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  // className?: string;
  fallbackText?: string;
}

const ProfileAvatar = ({ src, size="md", fallbackText = 'Img' }: ProfileAvatarProp) => {
  const sizeToClassName = (_size: string) => {
    switch (_size) {
      case "2xs":
        return "w-4 h-4";
      case "xs":
        return "w-6 h-6";
      case "sm":
        return "w-8 h-8";
      case "md":
        return "w-12 h-12";
      case "lg":
        return "w-16 h-16";
      case "xl":
        return "w-20 h-20";
      case "2xl":
        return "w-24 h-24";
      case "3xl":
        return "w-28 h-28";
      case "4xl":
        return "w-44 h-44";
      default:
        return "w-12 h-12";
    }
  };

  return (
    <Avatar
      className={sizeToClassName(size)}
    >
      <AvatarImage src={src} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar