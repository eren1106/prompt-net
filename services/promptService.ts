export const getAllPrompts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts`, { cache: 'no-store' });
  return res.json();
}

export const getAllPromptTags = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/tags`, { cache: 'no-store' });
  const data = await res.json();
  return data.data;
}