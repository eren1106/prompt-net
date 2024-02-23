import { Prompt as PrismaPrompt, Tag } from "@prisma/client"

export type Prompt = PrismaPrompt & {
  tags: Tag[]
}