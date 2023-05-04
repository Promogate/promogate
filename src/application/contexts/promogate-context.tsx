import { api } from '@/config';
import { Offer, RequestError } from '@/domain/models';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { ReactNode, createContext } from 'react';

type CreateProfileInput = {
  store_name: string;
  store_image: string;
  user_id: string
}

type CreateProfileOutput = {
  profile: string;
}

interface PromogateContextProps {
  createUserProfile(input: CreateProfileInput): Promise<void>
  fetchOffers(): Promise<Offer[]>;
  fetchUserData(): Promise<any>;
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

/*eslint-disable react-hooks/exhaustive-deps*/
export function PromogateContextProvider ({ children }: { children: ReactNode }) {
  const toast = useToast();

  async function fetchOffers(): Promise<Offer[]> {
    const { data } = await api.get<Offer[]>('/resources/offers');
    return data
  }

  async function fetchUserData(): Promise<any> {
    const { data } = await api.get<{ clicks: number }>('/dashboard/analytics/clicks')
  
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

  return (
    <PromogateContext.Provider value={{ fetchOffers, fetchUserData, createUserProfile }}>
      {children}
    </PromogateContext.Provider>
  )
}