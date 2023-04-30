import { api } from '@/config'
import { OfferWithClicks } from '@/domain/models'
import { DashboardLayout } from '@/presentation/components'
import { withSSRAuth } from '@/utils'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { Fragment } from 'react'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

/* eslint-disable @next/next/no-img-element */
export default function Dashboard() {
  const cookies = parseCookies();

  const { data, isLoading } = useQuery(['analytics', cookies['promogate.token']], async () => {
    const { data } = await api.get<{ clicks: number }>('/dashboard/analytics/clicks', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  }, {
    staleTime: 1000 * 5,
    cacheTime: 1000 * 5
  })

  const offers = useQuery(['offers', 'dashboard'], async () => {
    const { data } = await api.get<OfferWithClicks[]>('/dashboard/analytics/offers/clicks', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  })

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <Heading
          as={'h2'}
          fontSize={{ xl: '2xl' }}
          fontFamily={inter.style.fontFamily}
          color={'gray.600'}
        >
          Dashboard
        </Heading>
        <Grid
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)' }}
          margin={{ xl: '1rem 0' }}
          gap={{ xl: '1rem' }}
        >
          <GridItem
            backgroundColor={'white'}
            boxShadow={'sm'}
            borderRadius={{ xl: '0.5rem' }}
            padding={{ xl: '1rem' }}
          >
            <Heading
              as={'span'}
              fontSize={{ xl: 'md' }}
              fontFamily={inter.style.fontFamily}
              fontWeight={'normal'}
              color={'gray.500'}
            >
              Total de cliques
            </Heading>
            <Heading
              as={'h3'}
              fontSize={{ xl: '3xl' }}
              color={'gray.600'}
            >
              <Skeleton isLoaded={!isLoading}>
                {data?.clicks}
              </Skeleton>
            </Heading>
          </GridItem>
          <GridItem
            backgroundColor={'white'}
            boxShadow={'sm'}
            borderRadius={{ xl: '0.5rem' }}
            padding={{ xl: '1rem' }}
          >
            2
          </GridItem>
          <GridItem
            backgroundColor={'white'}
            boxShadow={'sm'}
            borderRadius={{ xl: '0.5rem' }}
            padding={{ xl: '1rem' }}
          >
            3
          </GridItem>
        </Grid>
        <Box
          padding={{ xl: '2rem 0' }}
        >
          <Box
            backgroundColor={'white'}
            padding={{ xl: '1rem 0' }}
            borderRadius={{ xl: '1rem' }}
          >
            <Table size={'sm'}>
              <Thead>
                <Tr>
                  <Th>Imagem do produto</Th>
                  <Th>Título do produto</Th>
                  <Th>Loja</Th>
                  <Th>Cliques</Th>
                </Tr>
              </Thead>
              <Tbody>
                {offers.data?.map((offer) => {
                  return (
                    <Tr
                      key={offer.id}
                      backgroundColor={'white'}
                    >
                      <Td>
                        <Link
                          href={`/dashboard/promocoes/${offer.id}`}
                        >
                          <Box
                            position={'relative'}
                            width={'64px'}
                            height={'auto'}
                          >
                            <img
                              src={offer.image}
                              alt={offer.title}
                            />
                          </Box>
                        </Link>
                      </Td>
                      <Td>
                        <Text
                          fontStyle={inter.style.fontStyle}
                          fontWeight={'medium'}
                          color={'gray.600'}
                        >
                          {offer.title}
                        </Text>
                      </Td>
                      <Td>
                        <Box
                          position={'relative'}
                          width={'64px'}
                          height={'auto'}
                        >
                          <img
                            src={offer.store_image}
                            alt={offer.title}
                          />
                        </Box>
                      </Td>
                      <Td>
                        <Flex
                          width={'100%'}
                        >
                          <Text
                            fontStyle={inter.style.fontStyle}
                            fontWeight={'medium'}
                            color={'gray.600'}
                          >
                            {offer._count.offer_clicks}
                          </Text>
                        </Flex>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </DashboardLayout>
    </Fragment>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
}) 