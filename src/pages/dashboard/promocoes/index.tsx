import { PromogateContext } from '@/application/contexts';
import { getDashboardOffers } from '@/application/utils';
import { api } from '@/config';
import { MeResponse } from '@/domain/models';
import { DashboardLayout, Pagination } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  HStack,
  Heading,
  IconButton,
  Skeleton,
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'next-share';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ChangeEvent, Fragment, useContext, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';

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


const openSans = Open_Sans({ subsets: ['latin'], preload: true })
const montserrat = Montserrat({ subsets: ['latin'], preload: true })

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
  const query = useQueryClient();
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { authorization } = useContext(PromogateContext);

  const { data, isLoading } = useQuery({
    queryKey: ['offers', user.id],
    queryFn: async () => await getDashboardOffers({ authorization, page }),
    staleTime: 1000 * 60 * 5
  })

  const mutation = useMutation({
    mutationFn: async ({ is_on_showcase, offerId }: UpdateOfferShowcase) => {
      await api.put(`/resources/offer/${offerId}/update/showcase`, {
        is_on_showcase
      }, {
        headers: {
          Authorization: authorization
        }
      })
    },
    onSuccess: () => {
      query.invalidateQueries(['offers', user.id])
    },
    onError: () => {
      toast({
        status: 'error',
        description: 'Houve algum erro'
      })
    }
  })

  const isFeatured = useMutation({
    mutationFn: async ({ is_featured, offerId }: UpdateOfferFeatured) => {
      await api.put(`/resources/offer/${offerId}/update/featured`, {
        is_featured
      }, {
        headers: {
          Authorization: authorization
        }
      })
    },
    onSuccess: () => {
      query.invalidateQueries(['offers', user.id])
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

  if (!data || isLoading) {
    return (
      <Grid placeItems={'center'} height={'100vh'}>
        <Spinner />
      </Grid>
    )
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
            fontFamily={openSans.style.fontFamily}
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
          fontFamily={openSans.style.fontFamily}
        >
          <Grid
            width={['full', 'full', '50%']}
            gridTemplateColumns={['1fr', '1fr 1fr']}
            margin={['0 0 1rem']}
            gap={['1rem']}
          >
            <Card
              padding={['1rem']}
              display={'grid'}
              borderLeft={['4px']}
              borderColor={['green.200']}
            >
              <Text
                fontSize={['0.875rem']}
                color={['gray.600']}
              >
                Ofertas na Vitrine
              </Text>
              <Skeleton isLoaded={!isLoading}>
                <Text
                  fontSize={['2rem']}
                  color={['gray.600']}
                  fontWeight={['semibold']}
                >
                  {data.showcase_quantity}/50
                </Text>
              </Skeleton>
            </Card>
            <Card
              padding={['1rem']}
              display={'grid'}
              borderLeft={['4px']}
              borderColor={['green.200']}
            >
              <Text
                fontSize={['0.875rem']}
                color={['gray.600']}
              >
                Ofertas em Destaque
              </Text>
              <Skeleton isLoaded={!isLoading}>
                <Text
                  fontSize={['2rem']}
                  color={['gray.600']}
                  fontWeight={['semibold']}
                >
                  {data?.featured_quantity}/10
                </Text>
              </Skeleton>
            </Card>
          </Grid>
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
              ) : (data?.offers.length === 0) ? (
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
                    fontFamily={openSans.style.fontFamily}
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
                      {data?.offers.map((offer) => {
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
                            fontFamily={openSans.style.fontFamily}
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
                                  fontFamily={openSans.style.fontFamily}
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
                        {data?.offers.map((offer) => {
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
                                  <Text fontStyle={openSans.style.fontFamily}>
                                    {offer.title}
                                  </Text>
                                </Link>
                              </Td>
                              <Td>
                                <Text fontStyle={openSans.style.fontFamily}>
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
                                <Text fontStyle={openSans.style.fontFamily}>
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
                                    isDisabled={offer.is_on_showcase === false ? true : false}
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
          <Pagination 
            totalCountOfRegisters={data.total_offers}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </DashboardLayout>
    </Fragment>
  )
}
