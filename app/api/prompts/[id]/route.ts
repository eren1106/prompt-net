import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse, putApiResponse } from "@/utils/api-response";
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
      authorId,
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
        authorId,
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

// export const DELETE = async (req: NextRequest, { params }: any) => {
//   const { id } = params;

//   try {
//     await connectDB();
//     const note = await Note.findByIdAndDelete(id);
//     return deleteApiResponse(note, 'note');
//   }
//   catch (err) {
//     return errorResponse(err);
//   }
// }