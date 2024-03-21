import NextAuth from "next-auth"
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions)

// export a single value (the handler function) under multiple names (GET and POST).
export { handler as GET, handler as POST } 