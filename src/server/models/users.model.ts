import { PrismaClient, type User } from "@prisma/client";
import { type User as UserEntity } from "../domain/entities/user.entity";

class UsersModel {
  private static prisma = new PrismaClient();

  public async getAllUser(): Promise<User[]> {
    return await UsersModel.prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User | null> {
    return await UsersModel.prisma.user.findUnique({
      where: { id },
    });
  }

  public async getUserByGoogleId(id: string): Promise<User | null> {
    return await UsersModel.prisma.user.findUnique({
      where: { googleId: id },
    });
  }

  public async getStoreOwnerByGoogleId(id: string): Promise<User | null> {
    return await UsersModel.prisma.user.findUnique({
      where: { googleId: id },
      include: {
        ownedStores: {
          select: {
            name: true,
            address: true,
            revenue: true,
          },
        },
      },
    });
  }

  public async createUser(
    name: string,
    email: string,
    googleId: string,
  ): Promise<User> {
    return await UsersModel.prisma.user.create({
      data: {
        name,
        email,
        googleId,
      },
    });
  }

  public async updateUser(user: Partial<UserEntity>): Promise<User> {
    const data = this.buildUpdateData(
      user.name ?? "",
      user.email,
      user.taxId ?? "",
      user.phoneNumber ?? "",
    );
    return await UsersModel.prisma.user.update({
      where: { googleId: user.googleId },
      data,
    });
  }

  public async deleteUser(googleId: string): Promise<User> {
    return await UsersModel.prisma.user.delete({
      where: { googleId },
    });
  }

  private buildUpdateData(
    name: string,
    email?: string,
    taxId?: string,
    phoneNumber?: string,
  ) {
    return {
      name,
      ...(email && { email }),
      ...(taxId && { taxId }),
      ...(phoneNumber && { phoneNumber }),
    };
  }
}

export const usersModel = new UsersModel();
