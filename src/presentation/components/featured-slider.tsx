import { OfferWithClicks } from '@/domain/models';
import { useBreakpointValue } from '@chakra-ui/react';
import { SwiperProps, SwiperSlide } from 'swiper/react';
import { OfferCard } from './offer-card';
import { Slider } from './slider';

type FeaturedSliderProps = {
  offers: OfferWithClicks[]
}

export function FeaturedSlider({ offers }: FeaturedSliderProps) {
  const variant = useBreakpointValue({
    base: 1,
    md: 3.5
  });

  const settings: SwiperProps = {
    spaceBetween: 16,
    slidesPerView: variant,
    navigation: offers.length >= 4 ,
    draggable: offers.length >= 4,
  }

  return (
    <Slider settings={settings}>
      {offers.map((offer: OfferWithClicks) => {
        return (
          <SwiperSlide key={offer.id}>
            <OfferCard data={offer} storeName={offer.store_name} />
          </SwiperSlide>
        )
      })}
    </Slider>
  )
}