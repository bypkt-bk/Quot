export class User {
  id: string;
  name: string;
  email: string;
  googleId: string;
  phoneNumber?: string | null;
  taxId?: string | null;
  private store: string[]    

  constructor(
    id: string,
    name: string,
    email: string,
    googleId: string,
    phoneNumber?: string | null,
    taxId?: string | null,
    store?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.googleId = googleId;
    this.phoneNumber = phoneNumber || null;
    this.taxId = taxId || null;
    this.store = store || [];
  }
  validate() {  
    if (!this.name) {
      throw new Error("Name is required");
    }
    if (!this.email) {
      throw new Error("Email is required");
    }
    if (!this.googleId) {
      throw new Error("Google ID is required");
    }
  }

}