import { PromogateContext } from '@/application/contexts';
import { Offer } from '@/domain/models';
import { OfferCard, StoreFooter, StoreHeader } from '@/presentation/components';
import { Box, Grid, Heading, Spinner } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
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

  if (data === undefined) {
    return (
      <Fragment>
        <Heading>
          Loja não encontrada
        </Heading>
      </Fragment>
    )
  }

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
        <StoreHeader props={{ 
          id: data.user_profile.id, 
          role: data.user_profile.role, 
          store_image: data.user_profile.store_image, 
          store_name: data.user_profile.store_name, 
          user_id: data.user_profile.user_id
         }} />
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
                  data.user_profile.resources.offers.map((offer: Offer) => {
                    return <OfferCard key={offer.id} data={offer} storeName={offer.store_name} />
                  })
                )
              }
            </Grid>
          </Box>
          <Box>
            <Grid gap={'1rem'}>
              <Image
                src='/ads/300x600.png'
                alt='Ad 300x600px'
                width={300}
                height={600}
              />
              <Image
                src='/ads/300x250.png'
                alt='Ad 300x250px'
                width={300}
                height={250}
              />
            </Grid>
          </Box>
        </Grid>
        <StoreFooter props={{ 
          id: data.user_profile.id, 
          role: data.user_profile.role, 
          store_image: data.user_profile.store_image, 
          store_name: data.user_profile.store_name, 
          user_id: data.user_profile.user_id
         }}/>
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