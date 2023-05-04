import { userAtom } from '@/application/states/atoms';
import { api } from '@/config';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ReactNode, createContext } from 'react';
import { useRecoilState } from 'recoil';

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

type User = {
  user: string;
  profile: string | '';
}

interface AuthContextProps {
  signIn(input: SignInInput): Promise<SignInOuput>;
  signUp(input: SignUpInput): Promise<void>;
  user: User
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userAtom)
  
  async function signIn(input: SignInInput): Promise<SignInOuput> {
    const { data } = await api.post<SignInOuput>('/signin', input);
    setUser({ user: data.user, profile: data.profile })
    setCookie(null, 'promogate.token', data.token);
    router.push('/dashboard');
    return data
  }
  
  async function signUp(input: SignUpInput): Promise<void> {
    const { data } = await api.post<SignUpOuput>('/users/signup', input)
    setCookie(null, 'promogate.token', data.token);
    setUser({ user: data.user, profile: data.profile });
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, user }}>
      {children}
    </AuthContext.Provider>
  )
}