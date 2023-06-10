import { OfferWithClicks } from '@/domain/models';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { SwiperProps, SwiperSlide } from 'swiper/react';
import { Slider } from './slider';
import { SliderOfferCard } from './slider-offer-card';

type FeaturedSliderProps = {
  storeName: string;
  offers: OfferWithClicks[]
}

export function FeaturedSlider({ offers, storeName }: FeaturedSliderProps) {
  const variant = useBreakpointValue({
    base: 1.25,
    md: 3.5,
  });

  const settings: SwiperProps = {
    spaceBetween: 16,
    slidesPerView: variant,
    navigation: offers.length >= 4,
    draggable: offers.length >= 4,
    grabCursor: true,
  }

  return (
    <Box
      width={['calc(360px - 2rem)', '100%']}
      margin={['1rem 0']}
    >
      <Slider settings={settings}>
        {offers.map((offer: OfferWithClicks) => {
          return (
            <SwiperSlide key={offer.id}>
              <SliderOfferCard data={offer} storeName={storeName} />
            </SwiperSlide>
          )
        })}
      </Slider>
    </Box>
  )
}