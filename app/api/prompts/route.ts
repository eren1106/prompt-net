import { getApiResponse, errorResponse, postApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const prompts = await prisma.prompt.findMany({
      include: {
        tags: true,
        author: true,
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
      promptText,
      inputs,
      sampleOutput,
      authorId,
      tagIdList,
      platform,
    } = await req.json();

    const newPrompt = await prisma.prompt.create({
      data: {
        title,
        description,
        promptText,
        inputs,
        sampleOutput,
        authorId,
        platform,
        // pass in list of object with only id property instead of list of whole object
        tags: {
          connect: tagIdList.map((tagId: number) => ({ id: tagId })),
        },
      },
    })
    return postApiResponse(newPrompt, 'prompt');
  }
  catch (err) {
    return errorResponse(err);
  }
}