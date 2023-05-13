export type OfferDataInput = {
  image: string,
  title: string,
  price: string,
  old_price: string,
  destination_link: string,
  store_name: string,
  expiration_date: string
}

export type Offer = {
  id: string,
  image: string,
  title: string,
  old_price: string,
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
      store_image: string
    }
  },
  _count: {
    offer_clicks: number;
  };
}