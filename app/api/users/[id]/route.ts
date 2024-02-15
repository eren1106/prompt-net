import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const prompt = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return getApiResponse(prompt);
  }
  catch (err) {
    return errorResponse(err);
  }
}