import { PromogateContext } from '@/application/contexts'
import { Offer } from '@/domain/models'
import { OfferCard, StoreFooter, StoreHeader } from '@/presentation/components'
import { Box, Grid, Heading, Spinner } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useContext } from 'react'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

const Banner = () => {
  return (
    <Box
      margin={'0 auto'}
      position={'relative'}
      width={728}
      height={90}
    >
      <Image
        src='/ads/728x90.png'
        alt='Ad 728x90px'
        fill
      />
    </Box>
  )
}

export default function Home() {
  const router = useRouter();
  const { store_name } = router.query as { store_name: string };
  const { fetchStoreOffers } = useContext(PromogateContext)

  const { data, isLoading, isError } = useQuery(['showcase', store_name], async () => await fetchStoreOffers(store_name), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5
  })

  console.log(data);

  return (
    <Fragment>
      <Head>
        <title>{String(data?.store.store_name).charAt(0).toUpperCase() + data?.store.store_name.slice(1)}</title>
      </Head>
      <main>
        <StoreHeader props={data?.store}/>
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
                  data?.offers.slice(0,8).map((offer: Offer) => {
                    return <OfferCard key={offer.id} data={offer} />
                  })
                )
              }
            </Grid>
            { (data?.offers.length) && (data?.offers.length >= 9) ? <Banner /> : null}
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
                  data?.offers.map((offer: Offer) => {
                    return <OfferCard key={offer.id} data={offer} />
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
        <StoreFooter props={data?.store} />
      </main>
    </Fragment>
  )
}
