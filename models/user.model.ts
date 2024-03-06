import { User as PrismaUser } from "@prisma/client"
import { Prompt } from "./prompt.model"
import { PromptList } from "./prompt-list.model"

export type User = PrismaUser & {
  createdPrompts: Prompt[]
  promptLists: PromptList[]
}