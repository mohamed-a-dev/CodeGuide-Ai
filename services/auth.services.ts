'use server'
import prisma from "@/lib/prisma"
import { RegisterForm } from "@/types/auth.types"
import bcrypt from "bcryptjs";

export const createUser = async (user: RegisterForm) => {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    await prisma.user.create({ data: { ...user, password: hashedPassword } })
}
