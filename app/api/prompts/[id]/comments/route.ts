import prisma from "@/lib/prisma";
import { errorResponse, postApiResponse } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  const { id: promptId } = params;

  try {
    const {
      value,
      authorId,
    } = await req.json();

    const newComment = await prisma.comment.create({
      data: {
        value,
        authorId,
        promptId: Number(promptId),
      },
    })
    return postApiResponse(newComment, 'comment');
  }
  catch (err) {
    return errorResponse(err);
  }
}