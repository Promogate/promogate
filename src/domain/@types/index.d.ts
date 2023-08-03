export type CouponsResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  coupons: Coupon[]
}

export type Coupon = {
  id: number;
  description: string;
  code: string;
  discount: number;
  store: {
    id: number;
    name: string;
    image: string;
    link: string;
  },
  category: {
    id: number;
    name: string;
  },
  vigency: string;
  link: string;
}

export type StoresResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  stores: Store[]
}

export type Store = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  hasOffer: number,
  maxCommission: number;
  events: StoreEvent[]
}

export type StoreEvent = {
  event: string;
  eventType: string;
  fixedCommission: boolean;
  commission: number;
}

export type SingleOfferResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type OffersResponse = {
  requestInfo: {
    status: string;
    message: string;
  },
  pagination: {
    page: number;
    size: number;
    totalSize: number;
    totalPage: number;
  },
  offers: Offer[]
}

export type Offer = {
  id: string;
  name: string;
  category: Record<string, unknown>;
  link: string;
  thumbnail: string;
  price: number;
  priceFrom?: number;
  discount?: number;
  installment: Record<string, unknown>;
  is_featured: boolean;
  store: OfferStore;
}

export type OfferStore = {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
  invisible: boolean;
  needPermission: boolean;
}

export type GetOffersParams = {
  size?: number;
  page?: number;
  sort?: string;
}

export type OfferDataInput = {
  image: string;
  title: string;
  price: string;
  old_price: string;
  destination_link: string;
  store_name: string;
  expiration_date: string;
  description: string;
}

export type SocialSoulOfferDataInput = {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  destinationLink: string;
  storeName: string;
  storeImage: string;
  description: string;
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
  },
  featured: OfferWithClicks[]
}

export type APIOffer = {
  id: string;
  image: string;
  title: string;
  old_price: string;
  price: string;
  destination_link: string;
  store_image: string;
  store_name: string;
  description: string;
  expiration_date: string;
  created_at: string;
  is_on_showcase: boolean;
  is_featured: boolean;
  is_free_shipping: boolean;
  resources_id: string;
  short_link: string;
}

export type OfferWithClicks = APIOffer & {
  resources: {
    user_profile: {
      store_name: string,
      store_name_display: string,
      store_image: string,
      social_media: {
        id: string,
        facebook: string,
        whatsapp: string,
        instagram: string,
        telegram: string,
        twitter:string,
        user_profile_id: string
      }
    }
  },
  _count: {
    offer_clicks: number;
  };
}