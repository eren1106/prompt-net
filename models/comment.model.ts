import { Comment as PrismaComment, UserLikeComment } from "@prisma/client"
import { User } from "./user.model"

export type Comment = PrismaComment & {
  parentComment: Comment,
  author: User
  likes: UserLikeComment[]
}