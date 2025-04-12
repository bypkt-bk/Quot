import { usersModel } from "../models/users.model";

export const usersService = {
  async getAllUsers() {
    return await usersModel.getAllUser();
  },
  async getUserByGoogleId(id: string) {
    return await usersModel.getUserByGoogleId(id);
  },
  async createUser(name: string, email: string, googleId: string) {
    return await usersModel.createUser(name, email, googleId);
  },
  async updateUser(
    googleId: string,
    name: string,
    email?: string,
    taxId?: string,
    phoneNumber?: string,
  ) {
    return await usersModel.updateUser(
      googleId,
      name,
      email,
      taxId,
      phoneNumber,
    );
  },
  async deleteUser(googleId: string) {
    return await usersModel.deleteUser(googleId);
  },

  async getStoreOwnerByGoogleId(id: string) {
    return await usersModel.getStoreOwnerByGoogleId(id);
  },
};
