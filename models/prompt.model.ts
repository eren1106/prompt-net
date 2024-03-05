import { Prompt as PrismaPrompt, Tag, User } from "@prisma/client"

export type Prompt = PrismaPrompt & {
  tags: Tag[]
  author: User
}