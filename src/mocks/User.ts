import {type UserRole, type User, type Role} from '../interfaces/identity/User';

export const users: User[] = [
  {
    id: 15,
    createdAt: new Date(),
    email: 'random@gmail.com',
    isDisabled: false,
    isEmailVerified: false,
    locale: null,
    name: 'John',
    phoneNumber: null,
    photoUrl: null,
    providerId: null,
    uid: 'ovcjHk79JtcZribOmel8ILNqiV32',
    zone: null,
  },
  {
    id: 25,
    createdAt: new Date(),
    email: null,
    isDisabled: false,
    isEmailVerified: false,
    locale: null,
    name: null,
    phoneNumber: null,
    photoUrl: null,
    providerId: null,
    uid: null,
    zone: null,
  },
  {
    id: 90,
    createdAt: new Date(),
    email: null,
    isDisabled: false,
    isEmailVerified: false,
    locale: null,
    name: null,
    phoneNumber: null,
    photoUrl: null,
    providerId: null,
    uid: null,
    zone: null,
  },
];

export const userRoles: UserRole[] = [
  {
    roleId: 75,
    userId: 15,
  },
];

export const roles: Role = {
  id: 75,
  name: 'normal',
};
