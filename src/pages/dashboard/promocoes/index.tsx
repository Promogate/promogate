import { PromogateContext } from '@/application/contexts';
import { api, queryClient } from '@/config';
import { MeResponse, Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  IconButton,
  Spinner,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast
} from '@chakra-ui/react';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ChangeEvent, Fragment, useContext } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

type UpdateOfferShowcase = {
  is_on_showcase: boolean;
  offerId: string
}

type UpdateOfferFeatured = {
  is_featured: boolean;
  offerId: string
}

type OffersPageProps = MeResponse

/* eslint-disable @next/next/no-img-element */
export default function OffersPage({ status, user }: OffersPageProps) {
  const toast = useToast();
  const cookies = parseCookies();
  const query = useQueryClient();
  const router = useRouter();

  const { authorization } = useContext(PromogateContext);

  const { data, isLoading } = useQuery(['offers', user.id], async () => {
    const { data } = await api.get<Offer[]>('/dashboard/offers', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  }, {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })

  const mutation = useMutation(async ({ is_on_showcase, offerId }: UpdateOfferShowcase) => {
    await api.put(`/resources/offer/${offerId}/update/showcase`, {
      is_on_showcase
    }, {
      headers: {
        Authorization: authorization
      }
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['offers', user.id])
    },
    onError: () => {
      toast({
        status: 'error',
        description: 'Houve algum erro'
      })
    }
  })

  const isFeatured = useMutation(async ({ is_featured, offerId }: UpdateOfferFeatured) => {
    await api.put(`/resources/offer/${offerId}/update/featured`, {
      is_featured
    }, {
      headers: {
        Authorization: authorization
      }
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['offers', user.id])
    },
    onError: () => {
      toast({
        status: 'error',
        description: 'Houve algum erro'
      })
    }
  })

  const handleShowcaseStatus = async (e: ChangeEvent<HTMLInputElement>, offerId: string) => {
    e.preventDefault();
    await mutation.mutateAsync({
      is_on_showcase: e.currentTarget.checked,
      offerId
    })
  }

  const handleIsFeaturedStatus = async (e: ChangeEvent<HTMLInputElement>, offerId: string) => {
    e.preventDefault();
    await isFeatured.mutateAsync({
      is_featured: e.currentTarget.checked,
      offerId
    })
  }

  const handleQueryInvalidation = () => {
    query.refetchQueries(['offers', user.id])
  }

  return (
    <Fragment>
      <Head>
        <title>Promogate - Promoções</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            as={'h2'}
            fontSize={['2rem']}
            fontFamily={inter.style.fontFamily}
            color={'gray.600'}
          >
            Promoções
          </Heading>
          <Button
            as={Link}
            href={'/dashboard/promocoes/adicionar'}
            variant={'outline'}
          >
            Adicionar Oferta
          </Button>
        </Flex>
        <Box
          padding={{ xl: '2rem 0' }}
        >
          <Button
            margin={['1rem 0']}
            rightIcon={<RxUpdate />}
            variant={'outline'}
            onClick={handleQueryInvalidation}
            size={['sm']}
          >
            Atualizar ofertas
          </Button>
          <Box
            backgroundColor={'white'}
            padding={{ xl: '2rem 1rem' }}
            borderRadius={{ xl: '1rem' }}
          >
            {
              isLoading ? (
                <Spinner />
              ) : (data?.length === 0) ? (
                <Box
                  margin={'0 auto'}
                  padding={['2rem', 0]}
                  textAlign={'center'}
                  alignItems={'center'}
                  border={['1px']}
                  borderColor={['gray.200']}
                  borderRadius={['lg']}
                >
                  <Heading
                    as={'h2'}
                    fontSize={['lg']}
                    fontWeight={'normal'}
                    fontFamily={inter.style.fontFamily}
                    color={'gray.300'}
                  >
                    Você ainda não tem ofertas cadastradas
                  </Heading>
                </Box>
              ) : (
                <>
                  <Box
                    display={['block', 'block', 'none']}
                  >
                    <Grid
                      gridTemplateColumns={['1fr']}
                    >
                      {data?.map((offer) => {
                        return (
                          <Flex
                            key={offer.id}
                            padding={['1rem']}
                            backgroundColor={'white'}
                            flexDirection={'column'}
                            border={['1px']}
                            borderColor={['gray.200']}
                            borderRadius={['1rem']}
                            overflow={['hidden']}
                            fontFamily={inter.style.fontFamily}
                          >
                            <Box
                              borderRadius={{ xl: '1rem' }}
                              overflow={'hidden'}
                              height={{ xl: '160px' }}
                            >

                              <img
                                className='object-contain h-full w-full'
                                src={offer.image}
                                alt={offer.title}
                              />
                            </Box>
                            <Box
                              flex={1}
                              marginTop={{ xl: '1rem' }}
                              display={'flex'}
                              flexDirection={'column'}
                            >
                              <Box flex={1}>
                                <Heading
                                  fontFamily={inter.style.fontFamily}
                                  fontSize={{ xl: '14px' }}
                                  fontWeight={'medium'}
                                  color={'gray.700'}
                                  wordBreak={'break-word'}
                                  padding={['1rem 0']}
                                >
                                  {offer.title}
                                </Heading>
                              </Box>
                              <Flex
                                gap={['16px']}
                              >
                                <Box>
                                  <Heading
                                    fontSize={['1rem']}
                                  >
                                    Vitrine
                                  </Heading>
                                  <Switch
                                    value={String(offer.is_on_showcase) === 'false' ? 'true' : 'false'}
                                    onChange={(e) => handleShowcaseStatus(e, offer.id)}
                                    defaultChecked={offer.is_on_showcase}
                                    colorScheme='green'
                                  />
                                </Box>
                                <Box>
                                  <Heading
                                    fontSize={['1rem']}
                                  >
                                    Destaque
                                  </Heading>
                                  <Switch
                                    value={String(offer.is_featured) === 'false' ? 'true' : 'false'}
                                    onChange={(e) => handleIsFeaturedStatus(e, offer.id)}
                                    defaultChecked={offer.is_featured}
                                    colorScheme='green'
                                  />
                                </Box>
                              </Flex>
                              <Box
                                margin={['1rem 0']}
                              >
                                <Heading
                                  fontSize={['1rem']}
                                >
                                  Compartilhar
                                </Heading>
                                <HStack
                                  margin={['1rem 0']}
                                  spacing={['1.5rem']}
                                >
                                  <FacebookShareButton
                                    url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  >
                                    <FacebookIcon size={32} />
                                  </FacebookShareButton>
                                  <TelegramShareButton
                                    url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  >
                                    <TelegramIcon size={32} />
                                  </TelegramShareButton>
                                  <WhatsappShareButton
                                    url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  >
                                    <WhatsappIcon size={32} />
                                  </WhatsappShareButton>
                                </HStack>
                              </Box>
                              <Button
                                onClick={() => router.push(`/dashboard/promocoes/${offer.id}`)}
                                backgroundColor={'#5528ff'}
                                color={'white'}
                              >
                                Editar Oferta
                              </Button>
                            </Box>
                          </Flex>
                        )
                      })}
                    </Grid>
                  </Box>
                  <Box
                    display={['none', 'none', 'block']}
                  >
                    <Table size={'sm'}>
                      <Thead>
                        <Tr>
                          <Th>Produto</Th>
                          <Th>Título do produto</Th>
                          <Th>Compartilhar</Th>
                          <Th></Th>
                          <Th>Vitrine</Th>
                          <Th>Destaque</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data?.map((offer) => {
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
                                  <Text fontStyle={inter.style.fontFamily}>
                                    {offer.title}
                                  </Text>
                                </Link>
                              </Td>
                              <Td>
                                <Text fontStyle={inter.style.fontFamily}>
                                  <HStack>
                                    <FacebookShareButton
                                      url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                    >
                                      <FacebookIcon size={32} />
                                    </FacebookShareButton>
                                    <TelegramShareButton
                                      url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                    >
                                      <TelegramIcon size={32} />
                                    </TelegramShareButton>
                                    <WhatsappShareButton
                                      url={`https://promogate.app/${user.user_profile.store_name}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                    >
                                      <WhatsappIcon size={32} />
                                    </WhatsappShareButton>
                                  </HStack>
                                </Text>
                              </Td>
                              <Td>
                                <Text fontStyle={inter.style.fontFamily}>
                                  <HStack>
                                    <Tooltip label='Editar' placement='top' borderRadius={'base'}>
                                      <IconButton
                                        aria-label='editar-oferta'
                                        icon={<AiFillEdit />}
                                        size={'xs'}
                                        colorScheme={'blue'}
                                        as={Link}
                                        href={`/dashboard/promocoes/${offer.id}`}
                                      />
                                    </Tooltip>
                                  </HStack>
                                </Text>
                              </Td>
                              <Td>
                                <Text>
                                  <Switch
                                    value={String(offer.is_on_showcase) === 'false' ? 'true' : 'false'}
                                    onChange={(e) => handleShowcaseStatus(e, offer.id)}
                                    defaultChecked={offer.is_on_showcase}
                                    colorScheme='green'
                                  />
                                </Text>
                              </Td>
                              <Td>
                                <Text>
                                  <Switch
                                    value={String(offer.is_featured) === 'false' ? 'true' : 'false'}
                                    onChange={(e) => handleIsFeaturedStatus(e, offer.id)}
                                    defaultChecked={offer.is_featured}
                                    colorScheme='green'
                                  />
                                </Text>
                              </Td>
                            </Tr>
                          )
                        })}
                      </Tbody>
                    </Table>
                  </Box>
                </>
              )
            }
          </Box>
        </Box>
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
      status: data.status,
      user: data.user
    }
  }
}) 
