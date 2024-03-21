import { NextRequest } from "next/server";
import { errorResponse, postApiResponse } from "@/utils";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { getUserByUsername } from "@/services/user.service";

export const POST = async (req: NextRequest) => {
  try {
    const { fullname, email } = await req.json();

    let username = email.split('@')[0];
    const existingUsername = await getUserByUsername(username);
    if(existingUsername) username = `${username}${randomUUID().split('-')[0]}`
    
    // create user in db
    const createdUser = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
      },
    })
    
    return postApiResponse(createdUser, 'user');
  }
  catch(err) {
    return errorResponse(err);
  }
}