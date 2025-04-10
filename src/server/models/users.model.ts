import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersModel = {
    async getUser() {
        return await prisma.user.findMany();
    },

    async getUserByGoogleId(id: number) {
        return await prisma.user.findUnique({
            where: { id },
        });
    },

    async createUser(name: string, email: string,googleId:string) {
        return await prisma.user.create({
            data: {
                name,
                email,
                googleId,
            },
        });
    },

    async updateUser(
        id: number,
        name: string,
        email?: string,
        taxId?: string,
        phoneNumber?: string
    ) {
        return await prisma.user.update({
            where: { id },
            data: {
                name,
                ...(email && { email }),
                ...(taxId && { taxId }),
                ...(phoneNumber && { phoneNumber }),
            },
        });
    },

    async deleteUser(id: number) {
        return await prisma.user.delete({
            where: { id },
        });
    },
};
