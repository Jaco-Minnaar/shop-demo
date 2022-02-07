export interface ShopUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoUrl: string | null;
  providerId: string;
  displayName: string | null;
  isAdmin?: boolean;
}
