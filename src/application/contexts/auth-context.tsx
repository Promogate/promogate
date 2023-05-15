import { userState } from '@/application/atoms';
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
  const [user, setUser] = useRecoilState(userState);
  
  async function signIn(input: SignInInput): Promise<SignInOuput> {
    const { data } = await api.post<SignInOuput>('/signin', input);
    setUser({
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      created_at: data.user.created_at,
      user_profile: {
        id: data.user.user_profile.id,
        role: data.user.user_profile.role,
        store_name: data.user.user_profile.store_name,
        store_image: data.user.user_profile.store_image,
        social_media: {
          facebook: data.user.user_profile.social_media?.facebook ? data.user.user_profile.social_media?.facebook : '',
          instagram: data.user.user_profile.social_media?.instagram ? data.user.user_profile.social_media?.instagram : '',
          whatsapp: data.user.user_profile.social_media?.whatsapp ? data.user.user_profile.social_media?.whatsapp : '',
          telegram: data.user.user_profile.social_media?.telegram ? data.user.user_profile.social_media?.telegram : '',
          twitter: data.user.user_profile.social_media?.twitter ? data.user.user_profile.social_media?.twitter : '',
        }
      }
    })
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