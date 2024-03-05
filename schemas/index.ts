import * as z from "zod";

export const LoginSchema = z.object({
  usernameOrEmail: z.string().min(2, "Username or email required at least 2 characters"),
  password: z.string().min(6, "Minimim length of password is 6"),
});

export const SignupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  fullname: z.string().min(2, "Fullname must be at least 2 characters."),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6),
});