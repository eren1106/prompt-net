import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse, postApiResponse } from "@/utils";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  const { id: promptId } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        promptId: Number(promptId),
      },
      include: {
        parentComment: true,
        author: true,
        likes: true,
      }
    })
    return getApiResponse(comments);
  }
  catch (err) {
    return errorResponse(err);
  }
}

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