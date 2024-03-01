import { getResponseData } from "./api.service";

// ======================== REST ======================== //
export const getAllPromptLists = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lists`, { cache: 'no-store' });
  return getResponseData(res);
}

export const getPromptListById = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lists/${id}`, { cache: 'no-store' });
  return getResponseData(res);
}

// // TODO: create prompt DTO for create and update
// export const createPrompt = async (body: any) => {
//   await fetch(`/api/prompts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
// }

// export const updatePrompt = async (body: any) => {
//   await fetch(`/api/prompts/${body.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
// }

// export const deletePrompt = async (id: number) => {
//   await fetch(`/api/prompts/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }