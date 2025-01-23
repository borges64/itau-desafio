import { IUser } from "../model/user-interface";
import { prisma } from "./prisma-service";

export async function createUser(userData: IUser) {
    const user = await prisma.user.create({
        data:{
            name: userData.name,
            email: userData.email,
            password: userData.password,
            cpf: userData.cpf
        }
    })
    const verifyUser = await prisma.user.findUnique({
        where:{
            email: userData.email
        }
    })
    if(verifyUser) {
        return "Email already exists"
    }
    return user
}