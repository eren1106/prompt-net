import prisma from "@/lib/prisma";
import { customApiResponse, errorResponse, getApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    const promptList = await prisma.promptList.findUnique({
      where: { id: Number(id) },
      include: { prompts: true },
    });

    if (!promptList) return getApiResponse(promptList); // return NOT FOUND

    const {
      promptId
    } = await req.json();

    const promptExists = promptList.prompts.some((prompt) => prompt.id === promptId);

    let updatedList;
    if (promptExists) {
      // remove prompt from list
      updatedList = await prisma.promptList.update({
        where: { id: Number(id) },
        data: { prompts: { disconnect: { id: promptId } } },
        include: {
          prompts: true,
        }
      });

      return customApiResponse(updatedList, "Removed prompt from list");
    }

    // add prompt to list
    updatedList = await prisma.promptList.update({
      where: { id: Number(id) },
      data: { prompts: { connect: { id: promptId } } },
      include: {
        prompts: true,
      }
    });

    return customApiResponse(updatedList, "Added prompt to list");
  } catch (err) {
    return errorResponse(err);
  }
}