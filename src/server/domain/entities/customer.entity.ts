export class Customer {
  id: string;
  name: string;
  phoneNumber: string;
  address: string | null;
  taxId: string | null;
  storeId: string;

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    address: string | null,
    taxId: string | null,
    storeId: string
  ) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address || null;
    this.taxId = taxId || null;
    this.storeId = storeId;
  }
    validate() {
        if (!this.name) {
        throw new Error("Name is required");
        }
        if (!this.phoneNumber) {
        throw new Error("Phone number is required");
        }
        if (!this.storeId) {
        throw new Error("Store ID is required");
        }
    }
    update(
        name?: string,
        phoneNumber?: string,
        address?: string | null,
        taxId?: string | null,
        storeId?: string,
    ) {
        if (name) this.name = name;
        if (phoneNumber) this.phoneNumber = phoneNumber;
        if (address) this.address = address;
        if (taxId) this.taxId = taxId;
        if (storeId) this.storeId = storeId;
    }
}