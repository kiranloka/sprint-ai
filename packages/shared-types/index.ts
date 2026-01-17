import { z } from "zod";

export const register = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const login = z.object({
  username: z.string().min(3).max(255),
  password: z.string().min(8).max(255),
});

export type Register = z.infer<typeof register>;
export type Login = z.infer<typeof login>;
