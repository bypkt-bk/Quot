import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usersModel = {
  async getAllUser() {
    return await prisma.user.findMany();
  },

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  async getUserByGoogleId(id: string) {
    return await prisma.user.findUnique({
      where: { googleId: id },
    });
  },

  async getStoreOwnerByGoogleId(id: string) {
    return await prisma.user.findUnique({
      where: { googleId: id },
      include: {
        ownedStores: {
          select: {
            name: true,
            address: true,
            revenue: true
          }
        }
      }
    });
  },

  async createUser(name: string, email: string, googleId: string) {
    return await prisma.user.create({
      data: {
        name,
        email,
        googleId,
      },
    });
  },

  async updateUser(
    googleId: string,
    name: string,
    email?: string,
    taxId?: string,
    phoneNumber?: string,
  ) {
    return await prisma.user.update({
      where: { googleId },
      data: {
        name,
        ...(email && { email }),
        ...(taxId && { taxId }),
        ...(phoneNumber && { phoneNumber }),
      },
    });
  },

  async deleteUser(googleId: string) {
    return await prisma.user.delete({
      where: { googleId },
    });
  },
};
