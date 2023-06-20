import { PromogateContext } from '@/application/contexts';
import { api } from '@/config';
import { OffersResponse } from '@/domain/@types';
import { MeResponse } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import { DashboardLayout, PageLoader, Pagination } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import { Alert, AlertIcon, Box, Button, Flex, Grid, GridItem, HStack, Heading, IconButton, Image, Skeleton, Text, Tooltip } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { BsCloudDownload } from 'react-icons/bs';
import { FiArrowLeft } from 'react-icons/fi';
import { RxExternalLink } from 'react-icons/rx';

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx);
  const { data } = await api.get<MeResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })
  return {
    props: {
      status: data.status,
      user: data.user
    }
  }
})

export default function SingleSocialSoulStore({ status, user }: MeResponse) {
  const router = useRouter();
  const { store_id } = router.query as { store_id: string };

  const { authorization } = useContext(PromogateContext);

  const { data, isLoading } = useQuery({
    queryKey: [user.user_profile.user_id, store_id],
    queryFn: fetchStoreOffers
  })

  async function fetchStoreOffers() {
    const { data } = await api.get<OffersResponse>(`/social-soul/offers/store/${store_id}`, {
      headers: {
        Authorization: authorization,
        'x-source-id': user.user_profile.lomadee_source_id
      },
      params: {
        size: 25
      }
    })
    return data
  }

  return (
    <>
      <Head>
        <title>Promogate - Integrações</title>
      </Head>
      <DashboardLayout>
        <Button
          aria-label='Voltar Página'
          onClick={() => router.back()}
          leftIcon={<FiArrowLeft />}
          marginBottom={['1rem']}
          variant={['outline']}
        >
          Voltar
        </Button>
        <Skeleton isLoaded={!isLoading}>
          <Heading
            marginBottom={['1rem']}
          >
            {data?.pagination.totalSize} Ofertas Disponíveis - {data?.offers[0].store.name}
          </Heading>
        </Skeleton>
        <Alert
          status='warning'
          marginBottom={['2rem']}
        >
          <AlertIcon />
          Estamos trabalhando para finalizar a integração com a SocialSoul
        </Alert>
        <Box
          margin={['2rem 0']}
        >
          {
            isLoading ?
              (
                <PageLoader />
              ) :
              (
                <>
                  <Box
                    marginBottom={['1rem']}
                  >
                    <Pagination
                      totalCountOfRegisters={data?.pagination.totalSize!}
                      registersPerPage={25}
                      onPageChange={() => { }}
                    />
                  </Box>
                  <Grid
                    gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
                    width={['100%']}
                    gap={['1rem']}
                  >
                    {data?.offers.map((offer, index) => {
                      return (
                        <GridItem
                          key={index}
                          backgroundColor={['white']}
                          display={['flex']}
                          flexDir={['column']}
                          alignItems={['center']}
                          justifyContent={['space-between']}
                          borderRadius={['lg']}
                          padding={['1rem']}
                        >
                          <Image
                            src={offer.thumbnail}
                            alt={offer.name}
                            width={['80px']}
                            paddingBottom={['1rem']}
                          />
                          <Heading
                            as='h2'
                            fontSize={['1rem']}
                            fontWeight={['semibold']}
                            textAlign={['center']}
                          >
                            {offer.name}
                          </Heading>
                          { }
                          <Flex
                            width={['100%']}
                            justify={['space-between']}
                            margin={['1rem 0']}
                          >
                            <Box>
                              <Text
                                fontSize={['0.8rem']}
                                color={['gray.400']}
                              >
                                Preço original
                              </Text>
                              <Text
                                fontSize={['0.8rem']}
                              >
                                {offer.priceFrom ? offer.priceFrom : 'Não informado'}
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize={['0.8rem']}
                                color={['gray.400']}
                              >
                                Preço atual
                              </Text>
                              <Text
                                fontSize={['0.8rem']}
                              >
                                {parseCurrency(offer.price)}
                              </Text>
                            </Box>
                          </Flex>
                          <HStack>
                            <Tooltip
                              label='Ver oferta'
                            >
                              <IconButton
                                aria-label='Link da oferta'
                                target='_blank'
                                as={Link}
                                href={offer.link}
                                icon={<RxExternalLink />}
                                size={'sm'}
                              />
                            </Tooltip>
                            <Button
                              leftIcon={<BsCloudDownload />}
                              size={'sm'}
                            >
                              Importar para Loja
                            </Button>
                          </HStack>
                        </GridItem>
                      )
                    })}
                  </Grid>
                  <Box
                    marginTop={['1rem']}
                  >
                    <Pagination
                      totalCountOfRegisters={data?.pagination.totalSize!}
                      registersPerPage={25}
                      onPageChange={() => { }}
                    />
                  </Box>
                </>
              )
          }
        </Box>
      </DashboardLayout>
    </>
  )
}
