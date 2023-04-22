import type { User } from "@Types/user";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users`);
    if (!res.ok) throw new Error("Une erreur est survenue !");
    return res.json();
  } catch {
    throw new Error("Une erreur est survenue !");
  }
};
