import { LoginSchema } from "@/schemas";
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from 'bcrypt';
// import { oauthSignUpUser } from "@/services/auth.service";
import { createUserWithFullNameEmail, getUserByEmail } from "@/data/user";

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
        // email: { label: "Username / Email", type: "text", placeholder: "yourname / youremail.your.com" },
        // password: { label: "Password", type: "password" }
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (user.email) {
          //check if user is in database
          const userExist = await getUserByEmail(user.email);
          if (userExist) {
            /* TODO: check if the user's signup method is google
              if yes => sign in user, if no => throw error that user had registered */

            return true;
          }
          // await oauthSignUpUser({
          //   fullname: user.name,
          //   email: user.email,
          // });

          await createUserWithFullNameEmail(user?.name ?? '', user.email);
        }
      }
      return true
    },
    // The returned value will be encrypted, and it is stored in a cookie.
    async jwt({ token, user }) {
      console.log("-- TOKEN --");
      console.log("TOKEN: ", token);
      console.log("USER: ", user);

      // if(user) {
      //   token.user = user;
      // }

      return token;
    },
    // make above returned data (jwt) available to the client. ref: https://next-auth.js.org/configuration/callbacks
    async session({ session, token, user }) {
      console.log("-- SESSION --");
      console.log("TOKEN: ", token);
      console.log("SESSION: ", session);
      console.log("USER: ", user);

      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      // session.user.id = token.id

      // if(token.user) {
      //   session.user = token.user;
      // }

      const existingUser = await getUserByEmail(session.user.email);

      if(existingUser) session.user = existingUser;
      
      return session;
    },
  }
}
