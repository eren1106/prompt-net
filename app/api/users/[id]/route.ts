import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {OR: [{email: id},{username: id}]}, // FIND BY USERNAME OR EMAIL
      include: {
        createdPrompts: {
          include: {
            tags: true,
            author: true
          }
        },
        promptLists: {
          include: {
            prompts: true
          }
        },
      }
    });
    return getApiResponse(user);
  }
  catch (err) {
    return errorResponse(err);
  }
}