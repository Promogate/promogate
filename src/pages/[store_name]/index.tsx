import { PromogateContext } from '@/application/contexts';
import { OfferWithClicks } from '@/domain/models';
import {
  FeaturedSlider,
  OfferCard,
  StoreFooter,
  StoreFooterContent,
  StoreHeader
} from '@/presentation/components';
import {
  Box,
  Grid,
  Heading,
  Spinner
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Fragment, useContext } from 'react';

const inter = Inter({ subsets: ['latin'] });

type SingleStoreProps = {
  store_name: string;
}

export default function Home({ store_name }: SingleStoreProps) {
  const { fetchStoreOffers } = useContext(PromogateContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['showcase', store_name],
    queryFn: async () => await fetchStoreOffers(store_name),
    staleTime: 1000 * 60 * 5
  });

  if (!data || isLoading) {
    return (
      <>
        <Head>
          <title>Promogate</title>
        </Head>
        <StoreHeader props={{ store_image: '/promogate-logo.svg', store_name: 'Promogate' }} />
        <Grid
          placeItems={'center'}
          height={'100vh'}
        >
          <Spinner />
        </Grid>
      </>
    )
  } else {
    
    const featuredOffers = data.data.resources.offers.filter(offer => offer.is_featured)
  
    return (
      <Fragment>
        <Head>
          <title>
            Promogate | {data.data.store_name_display}
          </title>
        </Head>
        <Box
          as='main'
          backgroundColor={'gray.50'}
        >
  
          <StoreHeader props={{ store_image: data.data.store_image, store_name: data.data.store_name_display }} />
  
          <Grid
            gridTemplateColumns={{ xl: '9fr 3fr' }}
            maxWidth={['1170px']}
            margin={'0 auto'}
            padding={['1rem']}
            gap={{ xl: '1.5rem' }}
          >
            <Box maxWidth={['815px']}>
              <Heading
                fontSize={['2xl']}
                fontFamily={inter.style.fontFamily}
                color={'gray.600'}
              >
                Destaque
              </Heading>
              <Box
                margin={['1rem 0']}
                width={['360px', '768px', 'auto']}
              >
                <FeaturedSlider offers={featuredOffers} />
              </Box>
              <Box
                margin={{ xl: '3rem 0' }}
              >
                <Heading
                  fontSize={['2xl']}
                  fontFamily={inter.style.fontFamily}
                  color={'gray.600'}
                >
                  Todas as ofertas
                </Heading>
                <Grid
                  gridTemplateColumns={['1fr', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
                  margin={['1rem 0']}
                  gap={['1rem']}
                  position={'relative'}
                >
                  {
                    isLoading ? (
                      <Spinner />
                    ) : isError ? (
                      <Heading
                        fontSize={{ xl: 'xl' }}
                        fontFamily={inter.style.fontFamily}
                        color={'gray.600'}
                      >
                        Destaque
                      </Heading>
                    ) : (
                      data.data.resources.offers.map((offer: OfferWithClicks) => {
                        return <OfferCard key={offer.id} data={offer} storeName={data.data.store_name} />
                      })
                    )
                  }
                </Grid>
              </Box>
            </Box>
            <Box>
              <Grid gap={'1rem'}>
                <Box
                  height={'600px'}
                  width={'300px'}
                >
                  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258286762385899"
                    crossOrigin="anonymous"></script>
                  <ins className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-9258286762385899"
                    data-ad-slot="1379343231"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                  <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                  </script>
                </Box>
                <Box
                  height={'300px'}
                  width={'300px'}
                >
                  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258286762385899"
                    crossOrigin="anonymous"></script>
                  <ins className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-9258286762385899"
                    data-ad-slot="1379343231"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                  <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                  </script>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <StoreFooterContent />
          <StoreFooter />
        </Box>
  
      </Fragment>
    )
  }

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { store_name } = ctx.query as { store_name: string };

  return {
    props: {
      store_name
    }
  }
}