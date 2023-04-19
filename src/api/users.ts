interface User {
  id: number;
  nickname: string;
  token: string;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users`);
  return res.json();
};
