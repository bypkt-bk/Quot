import { usersModel } from "../models/users.model";

export const usersService = {
    async getUsers() {
        return await usersModel.getUser();
    },
    async getUserByGoogleId(id: number) {
        return await usersModel.getUserByGoogleId(id);
    },
    async createUser(name: string, email: string, googleId: string) {
        return await usersModel.createUser(name, email, googleId);
    },
    async updateUser(
        id: number,
        name: string,
        email?: string,
        taxId?: string,
        phoneNumber?: string
    ) {
        return await usersModel.updateUser(id, name, email, taxId, phoneNumber);
    },
    async deleteUser(id: number) {
        return await usersModel.deleteUser(id);
    },
}