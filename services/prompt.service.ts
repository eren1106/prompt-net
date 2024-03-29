import { IPlatform } from "@/models/platform.model";
import { getResponseData } from "./api.service";
import { platformSelectItems } from "@/constants";
import { Comment } from "@/models/comment.model";

// TODO: seperate utils and REST into different files

// === utils === //
export const replacePlaceholders = (promptText: string, inputTexts: string[]): string => {
  let result = promptText;

  promptText.match(/{(.*?)}/g)?.forEach((match, index) => {
    const replacement = inputTexts[index] || ""; // Use empty string if index is out of bounds
    result = result.replace(match, replacement);
  });

  return result;
};

export const getPlatformByName = (name: string): IPlatform | undefined => {
  return platformSelectItems.find(platform => platform.name === name);
}

export const getInputsFromPrompt = (promptText: string): string[] => {
  // match substrings within a string that are enclosed in curly braces {}.
  const regex = /\{([^}]+)\}/g;
  const matches = promptText.match(regex);

  if (matches) return matches.map(match => match.slice(1, -1).trim());
  return [];
}

// ======================== REST ======================== //
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

// TODO: create prompt DTO for create and update
export const createPrompt = async (body: any) => {
  await fetch(`/api/prompts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export const updatePrompt = async (body: any) => {
  await fetch(`/api/prompts/${body.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export const deletePrompt = async (id: number) => {
  await fetch(`/api/prompts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const getAllPromptComments = async (id: number): Promise<Comment[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/${id}/comments`, { cache: 'no-store' });
  return getResponseData(res);
}

export const createComment = async (body: any) => {
  const { promptId, parentCommentId, value, authorId } = body;

  if (parentCommentId) {
    await fetch(`/api/prompts/${promptId}/comments/${parentCommentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: value,
        authorId: authorId,
      }),
    });
    return;
  }
  await fetch(`/api/prompts/${promptId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: value,
      authorId: authorId,
    }),
  });
}

export const deleteComment = async (promptId: number, commentId: number) => {
  // TODO: think a way to make the api better, now the promptId is not needed
  await fetch(`/api/prompts/${promptId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const updateComment = async (promptId: number, commentId: number, body: any) => {
  // TODO: think a way to make the api better, now the promptId is not needed
  await fetch(`/api/prompts/${promptId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      value: body.value,
      authorId: body.authorId,
    }),
  });
}