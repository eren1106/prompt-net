export const getAllPrompts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts`, { cache: 'no-store' });
  return res.json();
}

export const getPromptTags = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/tags`, { cache: 'no-store' });
  return res.json();
}