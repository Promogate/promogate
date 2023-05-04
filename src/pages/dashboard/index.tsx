import { PromogateContext } from '@/application/contexts'
import { api } from '@/config'
import { UserData } from '@/domain/models'
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
  Spinner,
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
import { Fragment, useContext } from 'react'
import { useQuery } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

type DashboardProps = {
  user: UserData
}

/* eslint-disable @next/next/no-img-element */
export default function Dashboard({ user }: DashboardProps) {
  const { fetchOffers} = useContext(PromogateContext);

  const { data, isLoading, isError } = useQuery(['offers', user.id], fetchOffers, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  })

  const offers: any = Array<any>
  
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        {
          user.user_profile.id ? (
            <Fragment>
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
                  <Heading
                    as='h3'
                    fontFamily={inter.style.fontFamily}
                    fontSize={{ xl: '0.825rem' }}
                    color={'gray.400'}
                  >
                    Em Breve
                  </Heading>
                </GridItem>
                <GridItem
                  backgroundColor={'white'}
                  boxShadow={'sm'}
                  borderRadius={{ xl: '0.5rem' }}
                  padding={{ xl: '1rem' }}
                >
                  <Heading
                    as='h3'
                    fontFamily={inter.style.fontFamily}
                    fontSize={{ xl: '0.825rem' }}
                    color={'gray.400'}
                  >
                    Em Breve
                  </Heading>
                </GridItem>
              </Grid>
              <Box
                padding={{ xl: '2rem 0' }}
              >
                <Heading
                  as={'h2'}
                  fontSize={{ xl: 'xl' }}
                  fontFamily={inter.style.fontFamily}
                  color={'gray.600'}
                  marginBottom={{ xl: '1rem' }}
                >
                  Top 10 produtos mais clicados
                </Heading>
                <Box
                  backgroundColor={'white'}
                  padding={{ xl: '1rem 0' }}
                  borderRadius={{ xl: '0.5rem' }}
                >
                  {
                    offers.isLoading ? (
                      <Spinner />
                    ) : (offers.data?.length === 0) ? (
                      <Box margin={'0 auto'} textAlign={'center'} alignItems={'center'}>
                        <Heading
                          as={'h2'}
                          fontSize={{ xl: 'lg' }}
                          fontWeight={'normal'}
                          fontFamily={inter.style.fontFamily}
                          color={'gray.300'}
                        >
                          Você ainda não tem ofertas cadastradas
                        </Heading>
                      </Box>
                    ) : (
                      <Table size={'sm'}>
                        <Thead>
                          <Tr>
                            <Th>Imagem do produto</Th>
                            <Th>Título do produto</Th>
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
                                  <Link
                                    href={`/dashboard/promocoes/${offer.id}`}
                                  >
                                    <Text
                                      fontStyle={inter.style.fontStyle}
                                      fontWeight={'medium'}
                                      color={'gray.600'}
                                    >
                                      {offer.title}
                                    </Text>
                                  </Link>
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
                          })
                          }
                        </Tbody>
                      </Table>
                    )
                  }
                </Box>
              </Box>
            </Fragment>
          ) : (
            <Heading>
              Precisa criar uma loja
            </Heading>
          )
        }
      </DashboardLayout>
    </Fragment>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);

  const { data } = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  return {
    props: {
      user: data
    }
  }
}) 