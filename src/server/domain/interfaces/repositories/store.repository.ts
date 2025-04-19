import type { Store
 } from "../../entities/store.entity";

 export interface IStoreRepository {
   getStoreById(id: string): Promise<Store | null>;
   getAllStores(): Promise<Store[]>;
   getStoreByOwnerId(userId: string): Promise<Store[]>;
   createStore(
     name: string,
     address: string,
     ownerIds: string[],
     revenue?: number,
     adminIds?: string[],
   ): Promise<Store | null>;
   updateStore(
     id: string,
     data: {
       name?: string;
       address?: string;
       revenue?: number;
     },
   ): Promise<Store | null>;
   updateStoreOwner(id: string, newOwnerIds: string[]): Promise<Store | null>;
   deleteStore(id: string): Promise<Store | null>;
 }