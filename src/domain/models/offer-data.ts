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
  price: string,
  old_price: string,
  destination_link: string,
  store_image: string,
  expiration_date: string,
  _count: {
    offer_clicks: number;
};
}

export type OfferWithClicks = Offer & {
  _count: {
      offer_clicks: number;
  };
}