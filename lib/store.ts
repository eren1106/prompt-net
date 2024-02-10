import { create } from 'zustand'

type ReplyingCommentStore = {
  replyingCommentId: number | null,
  setId: (id: number) => void,
  resetId: () => void,
}

export const useReplyingCommentStore = create<ReplyingCommentStore>((set) => ({
  replyingCommentId: 0,
  setId: (id: number) => set({ replyingCommentId: id }),
  resetId: () => set({ replyingCommentId: null })
}));