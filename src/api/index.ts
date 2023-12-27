export const get = async (path: string) => {
  const endpoint = process.env.NEXT_API_URL;
  const url = new URL(`${endpoint}${path}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
};
