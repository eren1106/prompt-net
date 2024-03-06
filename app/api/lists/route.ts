import { getApiResponse, errorResponse, postApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const prompts = await prisma.promptList.findMany({
      include: {
        prompts: true,
      },
    });
    return getApiResponse(prompts);
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const {
      title,
      description,
      authorId,
    } = await req.json();

    const newList = await prisma.promptList.create({
      data: {
        title,
        description,
        authorId,
      },
    })
    return postApiResponse(newList, 'prompt list');
  }
  catch (err) {
    return errorResponse(err);
  }
}