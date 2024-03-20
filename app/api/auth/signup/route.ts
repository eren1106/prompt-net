import { NextRequest } from "next/server";
import bcrypt from 'bcrypt';
import { errorResponse, postApiResponse } from "@/utils";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { username, fullname, email, password } = await req.json();

    // TODO: check email & username exist or not
    
    // TODO: send verification link to email

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user in db
    const createdUser = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
      }
    })
    
    postApiResponse(createdUser, 'user');
  }
  catch(err) {
    return errorResponse(err);
  }
}