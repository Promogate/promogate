"use client";

import { api } from '@/config';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { ReactNode, createContext } from 'react';

type SignInInput = {
  email: string;
  password: string;
}

type SignInOuput = {
  token: string;
  user: {
    id: string,
		name: string,
		email: string,
		created_at: string,
		user_profile: {
			id: string,
			store_image: string,
			store_name: string,
			role: string,
			social_media: ({
        facebook: string | null,
        instagram: string | null,
        whatsapp: string | null,
        telegram: string | null,
        twitter: string | null
      } | null)
		}
  }
}

type SignUpInput = {
  name: string
  email: string;
  password: string;
}

type SignUpOuput = {
  token: string;
  user: {
    id: string,
		name: string,
		email: string,
		created_at: string,
		user_profile: {
			id: string,
			store_image: string,
			store_name: string,
			role: string,
			social_media: ({
        facebook: string | null,
        instagram: string | null,
        whatsapp: string | null,
        telegram: string | null,
        twitter: string | null
      } | null)
		}
  }
}

interface AuthContextProps {
  signIn(input: SignInInput): Promise<SignInOuput>;
  signUp(input: SignUpInput): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider ({ children }: { children: ReactNode }) {
  const router = useRouter();
  const toast = useToast();
  
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

  async function signOut(): Promise<void> {
    try {
      destroyCookie(null, 'promogate.token');
      router.push('/login');
    } catch {
      toast({
        status: 'error',
        description: 'Erro eu tentar fazer logout'
      })
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}