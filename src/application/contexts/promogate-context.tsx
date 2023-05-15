import { api } from '@/config';
import { DashboardData, OfferWithClicks, RequestError } from '@/domain/models';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';

type CreateProfileInput = {
  store_name: string;
  store_image: string;
  user_id: string
}

type CreateProfileOutput = {
  profile: string;
}

export type FetchStoreOffersResponse = {
  status: string,
  message: string,
  user_profile: {
    id: string,
    store_image: string,
    store_name: string,
    role: string,
    user_id: string,
    resources: {
      offers: OfferWithClicks[]
    }
  }
}

type MeResponse = {
  status: string,
  user: User
}

type User = {
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

interface PromogateContextProps {
  createUserProfile(input: CreateProfileInput): Promise<void>
  fetchDashboardData(profileId: string): Promise<DashboardData>;
  fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse>
  fetchUserData(): Promise<any>;
  fetchStoreData(storeName: string): Promise<any>;
  authorization: string;
  user: User;
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

/*eslint-disable react-hooks/exhaustive-deps*/
export function PromogateContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const cookies = parseCookies();
  const router = useRouter();
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    created_at: '',
    user_profile: {
      id: '',
      role: '',
      store_name: '',
      store_image: '',
      social_media: {
        facebook: '',
        instagram: '',
        whatsapp: '',
        telegram: '',
        twitter: '',
      }
    }
  });

  useEffect(() => {
    try {
      api.get<MeResponse>('/users/me', {
        headers: {
          Authorization: `Bearer ${cookies['promogate.token']}`
        }
      }).then((fullfiled) => {
        const { data } = fullfiled
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
      })
    } catch {
      destroyCookie(null, 'promogate.token');
    }
  })

  async function fetchDashboardData(profileId: string): Promise<DashboardData> {
    const { data } = await api.get<DashboardData>(`/analytics/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    });
    return data
  }

  async function fetchUserData(): Promise<any> {
    const { data } = await api.get<{ clicks: number }>('/dashboard/analytics/clicks', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  }

  async function fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse> {
    const { data } = await api.get<FetchStoreOffersResponse>(`/resources/offers/${storeName}`)
    return data
  }

  async function createUserProfile(input: CreateProfileInput): Promise<void> {
    api.post<CreateProfileOutput>(`/users/${input.user_id}/profile/create`, {
      store_name: input.store_name,
      store_image: input.store_image
    }, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    }).then((fullfiled) => {
      const { data } = fullfiled;

      toast({
        status: 'success',
        description: 'Loja criada com sucesso!'
      });

      router.push('/dashboard');
    }).catch((err: AxiosError<RequestError>) => {
      toast({
        status: 'error',
        description: err.response?.data.message
      })
    })
  }

  async function fetchStoreData(storeName: string): Promise<any> {
    const { data } = await api.get(`/resources/store/${storeName}`);
    return data
  }

  return (
    <PromogateContext.Provider value={{
      fetchDashboardData,
      fetchUserData,
      createUserProfile,
      fetchStoreOffers,
      fetchStoreData,
      authorization: `Bearer ${cookies['promogate.token']}`,
      user
    }}>
      {children}
    </PromogateContext.Provider>
  )
}