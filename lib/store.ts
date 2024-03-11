import { create } from 'zustand'

type CommentStore = {
  commentId: number | null,
  isEdit: boolean,
  setId: (id: number, isEdit?: boolean) => void,
  resetId: () => void,
}

export const useCommentStore = create<CommentStore>((set) => ({
  commentId: 0,
  isEdit: false,
  setId: (id: number, isEdit?: boolean) => set({ commentId: id, isEdit: isEdit ?? false }),
  resetId: () => set({ commentId: null })
}));