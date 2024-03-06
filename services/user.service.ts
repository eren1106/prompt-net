import { getResponseData } from "./api.service";

export const getUserByIdOrUsername = async (id: number | string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lists/${id}`, { cache: 'no-store' });
  return getResponseData(res);
}