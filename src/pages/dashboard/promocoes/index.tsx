import { api, queryClient } from '@/config';
import { MeResponse, Offer, UserData } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Button,
  Flex,
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
import { FacebookShareButton, TelegramShareButton, WhatsappShareButton } from 'next-share';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { ChangeEvent, Fragment } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { FaFacebook, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

type UpdateOfferShowcase = {
  is_on_showcase: boolean;
  offerId: string
}

type OffersPageProps = {
  user: UserData
}

/* eslint-disable @next/next/no-img-element */
export default function OffersPage({ user }: OffersPageProps) {
  const toast = useToast();
  const cookies = parseCookies();

  const { data, isLoading } = useQuery('offers', async () => {
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
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('offers')
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
            fontSize={{ xl: '2xl' }}
            color={'gray.600'}
            fontStyle={inter.style.fontFamily}
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
          <Box
            backgroundColor={'white'}
            padding={{ xl: '2rem 1rem' }}
            borderRadius={{ xl: '1rem' }}
          >
            {
              isLoading ? (
                <Spinner />
              ) : (data?.length === 0) ? (
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
                      <Th>Produto</Th>
                      <Th>Título do produto</Th>
                      <Th>Compartilhar</Th>
                      <Th></Th>
                      <Th>Vitrine</Th>
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
                                <Tooltip label='Compartilhar no Facebook' placement='top' borderRadius={'base'}>
                                  <IconButton
                                    as={FacebookShareButton}
                                    aria-label='editar-oferta'
                                    icon={<FaFacebook />}
                                    size={'xs'}
                                    colorScheme={'facebook'}
                                    url={`https://promogate.app/${offer.store_name.toLocaleLowerCase()}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  />
                                </Tooltip>
                                <Tooltip label='Compartilhar no Twitter' placement='top' borderRadius={'base'}>
                                  <IconButton
                                    as={TelegramShareButton}
                                    aria-label='editar-oferta'
                                    colorScheme={'twitter'}
                                    icon={<FaTelegram />}
                                    size={'xs'}
                                    url={`https://promogate.app/${offer.store_name.toLocaleLowerCase()}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  />
                                </Tooltip>
                                <Tooltip label='Compartilhar no Whatsapp' placement='top' borderRadius={'base'}>
                                  <IconButton
                                    as={WhatsappShareButton}
                                    aria-label='editar-oferta'
                                    colorScheme={'whatsapp'}
                                    icon={<FaWhatsapp />}
                                    size={'xs'}
                                    url={`https://promogate.app/${offer.store_name.toLocaleLowerCase()}/produto/${offer.title.replaceAll(' ', '-')}?oid=${offer.id}&utm_click=1&rid=${offer.resources_id}`}
                                  />
                                </Tooltip>
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
                                  />
                                </Tooltip>
                                <Tooltip label='Excluir' backgroundColor={'red'} placement='top' borderRadius={'base'}>
                                  <IconButton
                                    aria-label='editar-oferta'
                                    colorScheme={'red'}
                                    variant={'outline'}
                                    icon={<BiTrash />}
                                    size={'xs'}
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
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
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
      user: data.user
    }
  }
}) 
