import { api } from '@/config';
import { DashboardData, Offer, RequestError, UserData } from '@/domain/models';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';

type CreateProfileInput = {
  store_name: string;
  store_image: string;
  user_id: string
}

type CreateProfileOutput = {
  profile: string;
}

type FetchStoreOffersResponse = {
  store: {
    id: string,
    role: string,
    store_image: string,
    store_name: string,
    user_id: string,
  },
  offers: Offer[]
}

interface PromogateContextProps {
  createUserProfile(input: CreateProfileInput): Promise<void>
  fetchDashboardData(profileId: string): Promise<DashboardData>;
  fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse>
  fetchUserData(): Promise<any>;
  fetchStoreData(storeName: string): Promise<any>;
  user: UserData | null;
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

/*eslint-disable react-hooks/exhaustive-deps*/
export function PromogateContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const cookies = parseCookies();
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const { 'promogate.token': token } = parseCookies();

    if (token) {
      api.get('/users/me', {
        headers: {
          Authorization: `Bearer ${cookies['promogate.token']}`
        }
      }).then((fullfiled) => {
        const { data } = fullfiled;
        setUser(data);
      })
    }
  }, [])

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
    }).then((fullfiled) => {
      const { data } = fullfiled;
      toast({
        status: 'success',
        description: 'Loja criada com sucesso!'
      })
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
      user,
      fetchStoreOffers,
      fetchStoreData
    }}>
      {children}
    </PromogateContext.Provider>
  )
}