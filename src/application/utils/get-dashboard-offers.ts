import { api } from '@/config';
import { Offer } from '@/domain/models';

type Input = {
  authorization: string;
  page?: number;
  perPage?: number;
}

type Output = {
  page: number;
  per_page: number;
  total_offers: number;
  showcase_quantity: number;
  featured_quantity: number;
  offers: Offer[];
}

type RequestOutput = {
  page: number;
  per_page: number;
  total_offers: number;
  offers: Offer[]
}

export async function getDashboardOffers({
  authorization,
  page = 1, 
  perPage = 10
}: Input): Promise<Output> {
  const { data } = await api.get<RequestOutput>(`/dashboard/offers/`, {
    params: {
      page,
      perPage
    },
    headers: {
      Authorization: authorization
    }
  });

  const featuredOffers = data.offers.filter(item => item.is_on_showcase === true && item.is_featured === true)
  const showcaseQuantity = data.offers.filter(item => item.is_on_showcase);

  return {
    page: data.page,
    per_page: data.per_page,
    total_offers: data.total_offers,
    showcase_quantity: showcaseQuantity.length,
    featured_quantity: featuredOffers.length,
    offers: data.offers,
  }
}