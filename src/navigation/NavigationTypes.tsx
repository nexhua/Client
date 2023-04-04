import {type NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type StackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;
type SignUpProps = NativeStackScreenProps<StackParamList, 'SignUp'>;

export type {StackParamList, SignInProps, SignUpProps};
