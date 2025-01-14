import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify"
import UserRoutes from "./routes/listUser";

const server = Fastify();

server.register(fastifyJwt, {
    secret: "supersecret"
})
server.register(UserRoutes)

server.listen({
    port: 3000
}, (err, address) => {
    if(err) {
        console.log(err);
        process.exit(1)
    }
    console.log(`Server online ✅ - ${address}`)
})