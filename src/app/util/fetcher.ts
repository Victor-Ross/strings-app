export const fetcher = async (url: RequestInfo | URL) => {
  const res = await fetch(url);

  if (!res.ok) {
    const msg = 'An error ocurred while fetching data';
    const error = new Error(msg);
    throw error;
  }

  return await res.json();
};
