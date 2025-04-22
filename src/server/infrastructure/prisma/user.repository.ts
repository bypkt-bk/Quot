import { User } from "@/server/domain/entities/user.entity";
import type { IUserRepository } from "@/server/domain/interfaces/repositories/user.repository";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {
  private readonly prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUserById(id: string) {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!prismaUser) return null;

    const user = new User(
      prismaUser.id,
      prismaUser.name,
      prismaUser.email,
      prismaUser.googleId,
      prismaUser.phoneNumber,
      prismaUser.taxId,
    );

    return user;
  }

  public async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return new User(
        user.id,
        user.name,
        user.email,
        user.googleId,
        user.phoneNumber,
        user.taxId,
      );
    });
  }

  public async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.googleId,
      user.phoneNumber,
      user.taxId,
    );
  }

  public async getUserByGoogleId(googleId: string) {
    const user = await this.prisma.user.findUnique({
      where: { googleId },
    });
    if (!user) return null;
    return new User(
      user.id,
      user.name,
      user.email,
      user.googleId,
      user.phoneNumber,
      user.taxId,
    );
  }

  public async createUser(
    name: string,
    email: string,
    googleId: string,
    phoneNumber?: string | null,
    taxId?: string | null,
  ) {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        googleId,
        phoneNumber,
        taxId,
      },
    });
    return new User(
      user.id,
      user.name,
      user.email,
      user.googleId,
      user.phoneNumber,
      user.taxId,
    );
  }

  public async updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      phoneNumber?: string | null;
      taxId?: string | null;
    },
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return new User(
      user.id,
      user.name,
      user.email,
      user.googleId,
      user.phoneNumber,
      user.taxId,
    );
  }
  public async deleteUser(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return new User(
      user.id,
      user.name,
      user.email,
      user.googleId,
      user.phoneNumber,
      user.taxId,
    );
  }
}
