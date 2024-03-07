import prisma from "@/lib/prisma";
import { deleteApiResponse, errorResponse, postApiResponse, putApiResponse } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  const { id, commentId } = params;

  try {
    const {
      value,
      authorId,
    } = await req.json();

    const createdComment = await prisma.comment.create({
      data: {
        value,
        authorId,
        promptId: Number(id),
        parentCommentId: Number(commentId),
      },
    })
    return postApiResponse(createdComment, 'comment');
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const PUT = async (req: NextRequest, { params }: any) => {
  const { commentId } = params;

  try {
    const {
      value
    } = await req.json();

    const updatedComment = await prisma.comment.update({
      where: {
        id: Number(commentId)
      },
      data: {
        value,
      },
    })
    return putApiResponse(updatedComment, 'comment');
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { commentId } = params;

  try {
    const deletedComment = await prisma.comment.deleteMany({
      where: {
        OR: [
          { id: Number(commentId) }, // Delete the main comment
          { parentCommentId: Number(commentId) } // Delete the child comments
        ]
      },
    })
    return deleteApiResponse(deletedComment, 'comment');
  }
  catch (err) {
    return errorResponse(err);
  }
}