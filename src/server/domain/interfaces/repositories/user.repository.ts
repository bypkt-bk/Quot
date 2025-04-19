import type { User } from "../../entities/user.entity";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByGoogleId(googleId: string): Promise<User | null>;
  createUser(
    name: string,
    email: string,
    googleId: string,
    phoneNumber?: string | null,
    taxId?: string | null,
  ): Promise<User | null>;
  updateUser(
    id: string,
    data: {
      name?: string;
      email?: string;
      phoneNumber?: string | null;
      taxId?: string | null;
    },
  ): Promise<User | null>;
 deleteUser(id: string): Promise<User | null>;
}