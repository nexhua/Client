// Table: identity.users
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=users&schema=identity&view=table_structure

export interface User {
  id: number;
  createdAt: Date;

  email: string | null;
  isDisabled: boolean;
  isEmailVerified: boolean;
  locale: string | null;
  name: string | null;
  phoneNumber: string | null;
  photoUrl: string | null;
  providerId: string | null;
  uid: string | null;
  zone: string | null;
}

// Table: identity.userRoles
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=userRoles&schema=identity&view=table_structure

export interface UserRole {
  roleId: number;
  userId: number;
}

// Table: identity.roles
// https://dbdocs.io/mstf.nesin/ProjectGazi?table=roles&schema=identity&view=table_structure

export interface Role {
  id: number;
  name: string;
}
