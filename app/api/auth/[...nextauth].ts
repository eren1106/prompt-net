import { LoginSchema } from "@/schemas";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import { getUserByUsernameOrEmail } from "@/services/user.service";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { usernameOrEmail, password } = validatedFields.data;

          const user = await getUserByUsernameOrEmail(usernameOrEmail);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })],
  secret: process.env.SECRET,
  session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

// export a single value (the handler function) under multiple names (GET and POST).
export { handler as GET, handler as POST } 