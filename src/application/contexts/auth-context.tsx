import { api } from '@/config';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ReactNode, createContext } from 'react';

type SignInInput = {
  email: string;
  password: string;
}

type SignInOuput = {
  token: string;
  user: string;
  profile: string;
}
type SignUpInput = {
  name: string
  email: string;
  password: string;
}

type SignUpOuput = {
  token: string;
  user: string;
  profile: string;
}

interface AuthContextProps {
  signIn(input: SignInInput): Promise<SignInOuput>;
  signUp(input: SignUpInput): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  async function signIn(input: SignInInput): Promise<SignInOuput> {
    const { data } = await api.post<SignInOuput>('/signin', input);
    setCookie(null, 'promogate.token', data.token);
    router.push('/dashboard');
    return data
  }
  
  async function signUp(input: SignUpInput): Promise<void> {
    const { data } = await api.post<SignUpOuput>('/users/signup', input)
    setCookie(null, 'promogate.token', data.token);
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}