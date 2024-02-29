import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// for tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertDateToTimeAgoStr = (date: Date | string): string => {
  const receivedDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - receivedDate.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return "just now";
}

export const convertIdTitleToSlug = (id: number, title: string) => {
  const slug = `${id}-${title}`
    .toString() // Convert to string
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  return slug;
}

export const extractIdFromSlug = (slug: string) => {
  const parts = slug.split('-');
  if (parts.length < 2) return null;
  const id = Number(parts[0]);
  if (isNaN(id)) return null;
  return id;
}

