import { api } from '@/config';
import { Offer } from '@/domain/models';
import { ReactNode, createContext } from 'react';

interface PromogateContextProps {
  fetchOffers(): Promise<Offer[]>
}

export const PromogateContext = createContext<PromogateContextProps>({} as PromogateContextProps);

export function PromogateContextProvider ({ children }: { children: ReactNode }) {

  async function fetchOffers(): Promise<Offer[]> {
    const { data } = await api.get<Offer[]>('/resources/offers');
    return data
  }

  return (
    <PromogateContext.Provider value={{ fetchOffers }}>
      {children}
    </PromogateContext.Provider>
  )
}