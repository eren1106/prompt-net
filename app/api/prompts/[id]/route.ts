import prisma from "@/lib/prisma";
import { deleteApiResponse, errorResponse, getApiResponse, putApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

interface RequestParams {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: RequestParams) => {
  const { id } = params;

  try {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        tags: true,
        author: true,
        // comments: {
        //   include: {
        //     parentComment: true,
        //   }
        // },
      }
    });
    return getApiResponse(prompt);
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const PUT = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    const {
      title,
      description,
      promptText,
      inputs,
      sampleOutput,
      tagIdList,
      platform,
    } = await req.json();

    const updatedPrompt = await prisma.prompt.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description,
        promptText,
        inputs,
        sampleOutput,
        platform,
        // pass in list of object with only id property instead of list of whole object
        tags: {
          connect: tagIdList.map((tagId: number) => ({ id: tagId })),
        },
      },
    })
    return putApiResponse(updatedPrompt, 'prompt');
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    const deletedPrompt = await prisma.prompt.delete({
      where: {
        id: Number(id),
      },
    })

    return deleteApiResponse(deletedPrompt, 'prompt');
  }
  catch (err) {
    return errorResponse(err);
  }
}