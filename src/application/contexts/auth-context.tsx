import { api } from '@/config';
import { ReactNode, createContext } from 'react';

type SigninInput = {
  email: string;
  password: string;
}

type SigninOuput = {
  token: string
}

interface AuthContextProps {
  signIn(input: SigninInput): Promise<SigninOuput>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  
  async function signIn(input: SigninInput): Promise<SigninOuput> {
    const { data } = await api.post('/users/sigin', input);
    return data
  }

  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  )
}