import { api } from '@/config';
import { DashboardData, OfferWithClicks, RequestError } from '@/domain/models';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ReactNode, createContext } from 'react';

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
  data: {
    id: string,
    store_image: string,
    store_name: string,
    store_name_display: string,
    lomadee_source_id: string | null,
    admitad_verification: string | null,
    role: string,
    user_id: string,
    social_media: {
      facebook?: string;
      whatsapp?: string;
      instagram?: string;
      telegram?: string;
      twitter?: string;
    },
    resources: {
      offers: OfferWithClicks[]
    }
  }
}

interface PromogateContextProps {
  createUserProfile(input: CreateProfileInput): Promise<void>
  fetchDashboardData(profileId: string): Promise<DashboardData>;
  fetchStoreOffers(storeName: string): Promise<FetchStoreOffersResponse>
  fetchUserData(): Promise<any>;
  fetchStoreData(storeName: string): Promise<any>;
  authorization: string;
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

/*eslint-disable react-hooks/exhaustive-deps*/
export function PromogateContextProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const cookies = parseCookies();
  const router = useRouter();

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
      storeName: input.store_name,
      storeImage: input.store_image
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
    }}>
      {children}
    </PromogateContext.Provider>
  )
}