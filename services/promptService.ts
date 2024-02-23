import { getResponseData } from "./apiService";

export const getAllPrompts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts`, { cache: 'no-store' });
  return getResponseData(res);
}

export const getAllPromptTags = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/tags`, { cache: 'no-store' });
  return getResponseData(res);
}

export const getPromptById = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/${id}`, { cache: 'no-store' });
  return getResponseData(res);
}