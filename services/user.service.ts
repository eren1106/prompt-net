import { getResponseData } from "./api.service";

export const getUserByUsername = async (username: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/username/${username}`, { cache: 'no-store' });
  return getResponseData(res);
}

export const getUserByEmail = async (email: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${email}`, { cache: 'no-store' });
  return getResponseData(res);
}