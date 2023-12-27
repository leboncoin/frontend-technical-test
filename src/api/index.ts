export const get = async (path: string) => {
  const endpoint = process.env.NEXT_API_URL;
  const url = new URL(`${endpoint}${path}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status.toString());
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAll = async (paths: string[]) => {
  const endpoint = process.env.NEXT_API_URL;
  const urls = paths.map((path) => new URL(`${endpoint}${path}`));
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const jsons = await Promise.all(
      responses.map((response) => response.json())
    );
    return jsons;
  } catch (error) {
    throw new Error(error);
  }
};
