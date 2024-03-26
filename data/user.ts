import { db } from "@/lib/db";
import { randomUUID } from "crypto";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } });

    return user;
  } catch {
    return null;
  }
};

export const createUserWithFullNameEmail = async (fullname: string, email: string) => {
  let username = email.split('@')[0];
  const existingUsername = await getUserByUsername(username);
  if (existingUsername) username = `${username}${randomUUID().split('-')[0]}`

  // create user in db
  const createdUser = await db.user.create({
    data: {
      username,
      fullname,
      email,
    },
  })

  return createdUser;
}
