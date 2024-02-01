import { getApiResponse, errorResponse, postApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const prompts = await prisma.prompts.findMany();
    return getApiResponse(prompts);
  }
  catch (err) {
    return errorResponse(err);
  }
}

// export const POST = async (req: NextRequest) => {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const newNote = await Note.create(body);
//     return postApiResponse(newNote, 'note');
//   }
//   catch (err) {
//     return errorResponse(err);
//   }
// }