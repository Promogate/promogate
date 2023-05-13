import { PromogateContext } from '@/application/contexts';
import { OfferWithClicks } from '@/domain/models';
import { OfferCard, StoreFooter, StoreHeader } from '@/presentation/components';
import { Box, Grid, Heading, Spinner } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Fragment, useContext } from 'react';
import { useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

type SingleStoreProps = {
  store_name: string;
}

export default function Home({ store_name }: SingleStoreProps) {

  const { fetchStoreOffers } = useContext(PromogateContext)

  const { data, isLoading, isError } = useQuery(['showcase', store_name], async () => await fetchStoreOffers(store_name), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <Grid
        placeItems={'center'}
        height={'100vh'}
      >
        <Spinner />
      </Grid>
    )
  }

  if (!data) {
    return (
      <Grid
        placeItems={'center'}
        height={'100vh'}
      >
        <Heading>
          Loja não encontrada
        </Heading>
      </Grid>
    )
  }

  const featuredOffers = data.user_profile.resources.offers.filter(offer => offer.is_featured)
  const commonOffers = data.user_profile.resources.offers.filter(offer => offer.is_featured === false)


  return (
    <Fragment>
      <Head>
        <title>
          {
            data?.user_profile.store_name ?
              data.user_profile.store_name.charAt(0).toUpperCase() +
              data.user_profile.store_name.slice(1) :
              'Loja Parceira'
          }
        </title>
      </Head>
      <main>
        <StoreHeader props={{ store_image: data.user_profile.store_image, store_name: data.user_profile.store_name }} />
        <Grid
          gridTemplateColumns={{ xl: '9fr 3fr' }}
          maxWidth={{ xl: '1250px' }}
          margin={'0 auto'}
          paddingY={{ xl: '2rem' }}
          gap={{ xl: '1.5rem' }}
        >
          <Box>
            <Heading
              fontSize={{ xl: 'xl' }}
              fontFamily={inter.style.fontFamily}
              color={'gray.600'}
            >
              Destaque
            </Heading>
            <Grid
              gridTemplateColumns={{ xl: 'repeat(4, 1fr)' }}
              margin={{ xl: '1rem 0' }}
              gap={{ xl: '1rem' }}
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
                  featuredOffers.map((offer: OfferWithClicks) => {
                    return <OfferCard key={offer.id} data={offer} storeName={data.user_profile.store_name} />
                  })
                )
              }
            </Grid>
            <Box
              margin={{ xl: '3rem 0' }}
            >
              <Heading
                fontSize={{ xl: 'xl' }}
                fontFamily={inter.style.fontFamily}
                color={'gray.600'}
              >
                Todas as ofertas
              </Heading>
              <Grid
                gridTemplateColumns={{ xl: 'repeat(4, 1fr)' }}
                margin={{ xl: '1rem 0' }}
                gap={{ xl: '1rem' }}
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
                    commonOffers.map((offer: OfferWithClicks) => {
                      return <OfferCard key={offer.id} data={offer} storeName={data.user_profile.store_name} />
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
        <StoreFooter />
      </main>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { store_name } = ctx.query as { store_name: string };

  return {
    props: {
      store_name
    }
  }
}