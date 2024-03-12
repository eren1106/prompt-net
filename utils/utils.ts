import { type ClassValue, clsx } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

// for tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertDateToTimeAgoStr = (date: Date | string): string => {
  const receivedDate = typeof date === 'string' ? new Date(date) : date;
  return moment(receivedDate).fromNow();
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

export const checkNullUndefined = (o: any): boolean => { // for handle case that you dont want 0 to be false value
  return o === null || o === undefined;
}

export const checkIsEdited = (createdDate: Date | string, updatedDate: Date | string): boolean => {
  const created = new Date(createdDate);
  const updated = new Date(updatedDate);

  return created.getTime() !== updated.getTime();
}

