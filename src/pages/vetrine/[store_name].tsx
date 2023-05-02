import { PromogateContext } from '@/application/contexts'
import { Offer } from '@/domain/models'
import { OfferCard } from '@/presentation/components'
import { Box, Grid, Heading, Spinner } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Fragment, useContext } from 'react'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { fetchOffers } = useContext(PromogateContext)

  const { data, isLoading, isError } = useQuery(['offers'], fetchOffers, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5
  })

  return (
    <Fragment>
      <Head>
        <title>Página inicial</title>
      </Head>
      <main>
        <Box
          padding={{ xl: '1rem' }}
          maxWidth={{ xl: '1250px' }}
          margin={'0 auto'}
        >
          <Heading
            fontSize={{ xl: 'xl' }}
            fontFamily={inter.style.fontFamily}
            color={'gray.600'}
          >
            Destaque
          </Heading>
          <Grid
            gridTemplateColumns={{ xl: 'repeat(5, 1fr)' }}
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
                data?.map((offer: Offer) => {
                  return <OfferCard key={offer.id} data={offer} />
                })
              )
            }
          </Grid>
        </Box>
      </main>
    </Fragment>
  )
}
