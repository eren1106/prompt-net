import { cn } from '@/utils';
import React from 'react'

interface ThemeImageProps {
  src: string;
  alt: string;
  className: string;
  darkThemeSrc?: string;
}

const ThemeImage = ({
  src,
  alt,
  className,
  darkThemeSrc
}: ThemeImageProps) => {
  return (
    <>
      {
        darkThemeSrc && <img
          className={cn("hidden dark:block", className)}
          src={darkThemeSrc}
          alt={alt}
        />
      }
      <img
        className={darkThemeSrc ? cn("block dark:hidden", className) : className}
        src={src}
        alt={alt}
      />
    </>
  )
}

export default ThemeImage