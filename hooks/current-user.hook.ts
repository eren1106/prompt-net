import { User } from "@/models/user.model";
import { useSession } from "next-auth/react";

export const useCurrentUser = (): User => {
  const session = useSession();

  return session.data?.user;
};
