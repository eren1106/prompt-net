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
    const prompt = await prisma.promptList.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        prompts: true,
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
      authorId,
      promptIdList,
    } = await req.json();

    const updatedList = await prisma.promptList.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description,
        authorId,
        prompts: {
          connect: promptIdList.map((promptId: number) => ({ id: promptId })),
        },
      },
    })
    return putApiResponse(updatedList, 'prompt list');
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const DELETE = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    const deletedList = await prisma.promptList.delete({
      where: {
        id: Number(id),
      },
    })

    return deleteApiResponse(deletedList, 'prompt list');
  }
  catch (err) {
    return errorResponse(err);
  }
}