import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../models/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { createUserSchema, loginSchema } from "../models/user-model";

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const data = createUserSchema.parse(request.body)

        // create a new user
        const verifyUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (verifyUser) {
            return reply.status(400).send({
                message: "Email já está em uso"
            })
        }
        //hash password
        const hashedPass = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: hashedPass
            }
        })
        reply.status(201).send({
            message: "Usuario criado com sucesso",
            user: {
                id: user.id, name: user.name, email: user.email
            }
        })
    } catch (error: any) {
        reply.status(400).send({ error: error.message });
    }
}

export const LoginUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // GET DATA BODY
        const data = loginSchema.parse(request.body)
        // BUSCA NO BANCO
        const user = await prisma.user.findUnique({ where: { email: data.email }})
        if(!user) return reply.status(404).send({ message: "Usuário não encontrado na base de dados" })
        const verifyPass = await bcrypt.compare(data.password, user.password)
        if(!verifyPass) return reply.status(401).send({ error: "Senha invalida" }) 
        // GENERATE JWT
        const token = jwt.sign({ id: user.id, email: user.email }, "supersecret",  { expiresIn: "1h" })
        reply.send({ message: "Login realizado com sucesso - validade de 1h", token})
    } catch (error: any) {
        reply.status(400).send({ error: error.message });
      }
}