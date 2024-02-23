export const getResponseData = async (res: Response) => {
  const data = await res.json();
  return data.data;
}