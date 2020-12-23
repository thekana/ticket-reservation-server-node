export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  ORGANIZER = 'organizer',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface Event {
  id: number;
  name: string;
  ownerID: number;
  description: string;
  quota: number;
  remainingQuota: number;
}

export interface Reservation {
  id: number;
  userID: number;
  eventID: number;
  quota: number;
}
