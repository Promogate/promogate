export type OfferData = {
  image: string,
  title: string,
  price: string,
  oldPrice: string,
  destinationLink: string,
  storeImage: string,
  expirationDate: string
}

export type Offer = {
  id: string,
  image: string,
  title: string,
  old_price: string | null,
  price: string,
  destination_link: string,
  store_image: string,
  store_name: string,
  description: string,
  expiration_date: string,
  created_at: string,
  is_on_showcase: boolean,
  is_featured: boolean,
  is_free_shipping: boolean,
  resources_id: string
}

export type OfferWithClicks = Offer & {
  resources: {
    user_profile: {
      store_name: string,
    }
  },
  _count: {
    offer_clicks: number;
  };
}