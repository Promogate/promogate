import { userState } from '@/application/states/atoms';
import { api } from '@/config';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ReactNode, createContext } from 'react';
import { useRecoilState } from 'recoil';

type SigninInput = {
  email: string;
  password: string;
}

type SigninOuput = {
  token: string;
  user: string;
  profile: string;
}

type User = {
  user: string;
  profile: string;
}

interface AuthContextProps {
  signIn(input: SigninInput): Promise<SigninOuput>;
  user: User
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState)
  
  async function signIn(input: SigninInput): Promise<SigninOuput> {
    const { data } = await api.post<SigninOuput>('/signin', input);
    setUser({ user: data.user, profile: data.profile })
    setCookie(null, 'promogate.token', data.token);
    router.push('/dashboard');
    return data
  }

  return (
    <AuthContext.Provider value={{ signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}