export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  picture?: string;
  pictureUrl: string;
  dateOfBirth: Date;
  isBanned: 0 | 1;
  isEmailConfirmed: 0 | 1;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  USER = 2,
  ADMIN = 7
}
