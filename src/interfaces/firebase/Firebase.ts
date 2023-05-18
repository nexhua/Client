export interface FirebaseError {
  code: string;
  message: string;
  name: string;
}

export interface FirebaseAuthError extends FirebaseError {
  credential: AuthCredential;
  email: string;
  phoneNumber: string;
  tenantId: string;
}

export interface AuthCredential {
  providerId: string;
  signInMethod: string;
}
