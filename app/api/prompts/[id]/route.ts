import prisma from "@/lib/prisma";
import { errorResponse, getApiResponse } from "@/utils/api-response";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const prompt = await prisma.prompts.findUnique({
      where: {
        id: Number(id),
      },
    });
    return getApiResponse(prompt);
  }
  catch (err) {
    return errorResponse(err);
  }
}

// export const PUT = async (req: NextRequest, { params }: any) => {
//   const { id } = params;

//   try {
//     await connectDB();
//     const body = await req.json();
//     const updatedNote = await Note.findByIdAndUpdate(id, {...body}, { new: true });
//     return putApiResponse(updatedNote, 'note');
//   }
//   catch (err) {
//     return errorResponse(err);
//   }
// }

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