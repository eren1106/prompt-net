import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
  const { email } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
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