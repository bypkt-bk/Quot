import { User } from "../domain/entities/user.entity";
import type { IUserRepository } from "../domain/interfaces/repositories/user.repository";

export class UsersService  {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async getUserByGoogleId(id: string) {
    return await this.userRepository.getUserByGoogleId(id);
  }
  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }
  async createUser(name: string, email: string, googleId: string) {
    return await this.userRepository.createUser(name, email, googleId);
  }
  async updateUser(
    googleId: string,
    name: string,
    email?: string,
    taxId?: string,
    phoneNumber?: string,
  ) {
    const user  = await this.userRepository.getUserByGoogleId(googleId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = new User(
      user.id,
      name,
      email || user.email,
      googleId,
      phoneNumber || user.phoneNumber,
      taxId || user.taxId,
    );
    updatedUser.validate();
    return await this.userRepository.updateUser(
      googleId,
      {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        taxId: updatedUser.taxId,
      },
    );
  }

};
