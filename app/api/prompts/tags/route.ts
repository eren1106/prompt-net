import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse } from "@/utils/api-response";

export const GET = async () => {
  try {
    const tags = await prisma.tag.findMany();
    return getApiResponse(tags);
  }
  catch (err) {
    return errorResponse(err);
  }
}