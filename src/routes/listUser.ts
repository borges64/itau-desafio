import { FastifyInstance } from "fastify";
import { registerUser, LoginUser } from "../controllers/usercontroller";

export default async function UserRoutes(fastify: FastifyInstance) {
    fastify.post("/user/register", registerUser)
    fastify.post("/login", LoginUser)
}