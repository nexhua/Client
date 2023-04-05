import {type NativeStackScreenProps} from '@react-navigation/native-stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type StackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
};

type SignInProps = NativeStackScreenProps<StackParamList, 'SignIn'>;
type SignUpProps = NativeStackScreenProps<StackParamList, 'SignUp'>;
type MainProps = NativeStackScreenProps<StackParamList, 'Main'>;

export type {StackParamList, SignInProps, SignUpProps, MainProps};
