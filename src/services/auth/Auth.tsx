import auth, {type FirebaseAuthTypes} from '@react-native-firebase/auth';
import {type FirebaseAuthError} from '../../interfaces/firebase/Firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const configure = (): void => {
  GoogleSignin.configure({
    webClientId:
      '645068528921-revl5j26jj8sbrnlmea8t0425bfeeenf.apps.googleusercontent.com',
  });
};

configure();

export function SignInWithEmail(
  email: string,
  password: string,
  onSuccess?: () => void,
  onError?: (error: FirebaseAuthError) => void,
): void {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      if (onSuccess !== undefined) {
        onSuccess();
      }
    })
    .catch((error: FirebaseAuthError) => {
      if (onError !== undefined) {
        onError(error);
      }
    })
    .catch((error: any) => {
      if (onError !== undefined) {
        onError(error);
      }
    });
}

export function SignUpWithEmail(
  email: string,
  password: string,
  onSuccess?: () => void,
  onError?: (error: FirebaseAuthError | null) => void,
): void {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (onSuccess !== undefined) {
        onSuccess();
      }
    })
    .catch((error: FirebaseAuthError) => {
      if (onError !== undefined) {
        onError(error);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
}

export function SignOut(
  onSuccess?: () => void,
  onError?: (error: FirebaseAuthError) => void,
): void {
  auth()
    .signOut()
    .then(() => {
      if (onSuccess !== undefined) {
        onSuccess();
      }
    })
    .catch((error: FirebaseAuthError) => {
      if (onError !== undefined) {
        onError(error);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
}

export function subscribe(
  handler: (user: FirebaseAuthTypes.User | null) => void,
): () => void {
  return auth().onAuthStateChanged(handler);
}

export async function googleSignIn(): Promise<FirebaseAuthTypes.UserCredential> {
  console.log('Check if device supports Google Play');
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  const {user} = await GoogleSignin.signIn();
  console.log('users id token', user);

  const googleCredential = auth.GoogleAuthProvider.credential(user.id);
  console.log('google credential, ', googleCredential);

  return await auth().signInWithCredential(googleCredential);
}

export function getUser(): FirebaseAuthTypes.User | null {
  return auth().currentUser;
}
