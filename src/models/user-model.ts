import { z } from "zod";

export interface User{
    name: string,
    cpf: string,
    email: string,
    password: string
}

export const createUserSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z.string().regex(/^\d{11}$/, "O CPF deve ter 11 dígitos"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });
  
  export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string(),
  });