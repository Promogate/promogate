import { PromogateContext } from '@/application/contexts';
import { api } from '@/config';
import { MeResponse, UserData } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Button,
  Flex,
  Grid,
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
} from '@chakra-ui/react';
import { Card, Metric, Text as TremorText } from '@tremor/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Fragment, useContext, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

type DashboardProps = {
  user: UserData
}

/* eslint-disable @next/next/no-img-element */
export default function Dashboard({ user }: DashboardProps) {
  const { fetchDashboardData } = useContext(PromogateContext);
  const [ctr, setCtr] = useState<number | null>(null)

  const { data, isLoading, isError } = useQuery(['dashboard-offers', user.id], async () => await fetchDashboardData(user.user_profile.id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  })

  useMemo(() => {
    if (data) {
      setCtr(( 100 * data?.analytics._count.destination_clicks) / data?.analytics._count.offer_clicks)
    }
  }, [data])

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
                gridTemplateColumns={{ xl: 'repeat(4, 1fr)' }}
                margin={{ xl: '1rem 0' }}
                gap={{ xl: '1rem' }}
              >
                <Card decoration="top" decorationColor="indigo">
                  <TremorText>
                    Visualizações da loja
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.offer_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="amber">
                  <TremorText>
                    Cliques nas ofertas
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.offer_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="green">
                  <TremorText>
                    Cliques para lojas
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.destination_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="teal">
                  <TremorText>
                    Taxa de Conversão
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{(ctr?.toFixed(2) && Number(ctr?.toFixed(2))) ? ctr?.toFixed(2) : 0}%</Metric>
                  </Skeleton>
                </Card>
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
                {
                  isLoading ? (
                    <Spinner />
                  ) : (data?.resources.offers.length === 0) ? (
                    <Box
                      margin={'0 auto'}
                      textAlign={'center'}
                      alignItems={'center'}
                      border={'1px'}
                      borderRadius={{ xl: '1rem' }}
                      borderColor={'yellow.200'}
                      backgroundColor={'yellow.50'}
                      padding={{ xl: '2rem' }}
                    >
                      <Heading
                        as={'h2'}
                        fontSize={{ xl: 'lg' }}
                        fontWeight={'normal'}
                        fontFamily={inter.style.fontFamily}
                        color={'yellow.500'}
                      >
                        Você ainda não tem ofertas cadastradas
                      </Heading>
                      <Flex
                        marginTop={{ xl: '1rem' }}
                        justifyContent={'center'}
                        gap={{ xl: '1rem' }}
                      >
                        <Button
                          as={Link}
                          href={'/dashboard/promocoes/adicionar'}
                          colorScheme='orange'
                          _hover={{
                            textDecoration: 'none'
                          }}
                        >
                          Adicionar oferta
                        </Button>
                      </Flex>
                    </Box>
                  ) : (
                    <Box
                      backgroundColor={'white'}
                      padding={{ xl: '1rem 0' }}
                      borderRadius={{ xl: '0.5rem' }}
                    >
                      <Table size={'sm'}>
                        <Thead>
                          <Tr>
                            <Th>Imagem do produto</Th>
                            <Th>Título do produto</Th>
                            <Th>Cliques</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data?.resources.offers.map((offer) => {
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
                                      {offer._count.offer_clicks ?? ''}
                                    </Text>
                                  </Flex>
                                </Td>
                              </Tr>
                            )
                          })
                          }
                        </Tbody>
                      </Table>
                    </Box>
                  )
                }
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

  const { data } = await api.get<MeResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  return {
    props: {
      user: data.user
    }
  }
}) 