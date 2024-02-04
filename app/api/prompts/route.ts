import { getApiResponse, errorResponse, postApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";
import prisma from '@/lib/prisma';

export const GET = async () => {
  try {
    const prompts = await prisma.prompt.findMany();
    return getApiResponse(prompts);
  }
  catch (err) {
    return errorResponse(err);
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newPrompt = await prisma.prompt.create({
      data: body,
    })
    return postApiResponse(newPrompt, 'prompt');
  }
  catch (err) {
    return errorResponse(err);
  }
}