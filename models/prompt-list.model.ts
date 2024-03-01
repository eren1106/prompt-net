import { PromptList as PrismaPromptList } from "@prisma/client"
import { Prompt } from "./prompt.model"

export type PromptList = PrismaPromptList & {
  prompts: Prompt[]
}