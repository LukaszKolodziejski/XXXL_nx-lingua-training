export default async function fetcher(arg: any, ...args: any) {
  const res = await fetch(arg, ...args);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
