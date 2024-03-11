import prisma from "@/lib/prisma";
import { customApiResponse, errorResponse } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  const { commentId } = params;

  try {
    const {
      userId,
    } = await req.json();

    // Check if the user has already liked the comment
    const existingLike = await prisma.userLikeComment.findFirst({
      where: {
        userId,
        commentId: Number(commentId),
      },
    });

    if (existingLike) {
      const unlike = await prisma.userLikeComment.deleteMany({ // not sure why if use delete, the typescript will complaint error
        where: {
          userId,
          commentId: Number(commentId),
        },
      });

      return customApiResponse(unlike, "User unliked a comment");
    }

    const like = await prisma.userLikeComment.create({
      data: {
        userId,
        commentId: Number(commentId),
      },
    });

    return customApiResponse(like, 'User liked a comment');
  }
  catch (err) {
    return errorResponse(err);
  }
}