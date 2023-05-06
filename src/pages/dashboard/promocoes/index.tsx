import { api } from '@/config';
import { Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
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
  useDisclosure
} from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { CiViewTable } from 'react-icons/ci';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { RxPlus } from 'react-icons/rx';
import { useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

/* eslint-disable @next/next/no-img-element */
export default function OffersPage() {
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { data, isLoading } = useQuery('offers', async () => {
    const { data } = await api.get<Offer[]>('/dashboard/offers')

    return data
  }, {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })

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
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement={'right-start'}
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                aria-label='create'
                variant={'outline'}
                onClick={onOpen}
              >
                <RxPlus />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Box
                  as={Link}
                  href='/dashboard/promocoes/adicionar'
                >
                  <Text
                    padding={{ xl: '0.5rem' }}
                    borderRadius={{ xl: 'md' }}
                    _hover={{
                      backgroundColor: 'gray.100',
                      transition: '300ms ease-out'
                    }}
                    display={'flex'}
                    alignItems={'center'}
                    gap={{ xl: '8px' }}
                    fontStyle={inter.style.fontFamily}
                  >
                    <AiOutlinePlus />
                    Adicionar promoção
                  </Text>
                </Box>
                <Divider orientation='horizontal' margin={{ xl: '4px 0' }} />
                <Box
                  as={Link}
                  href='/dashboard/promocoes/importar'
                >
                  <Text
                    padding={{ xl: '0.5rem' }}
                    borderRadius={{ xl: 'md' }}
                    _hover={{
                      backgroundColor: 'gray.100',
                      transition: '300ms ease-out'
                    }}
                    display={'flex'}
                    alignItems={'center'}
                    gap={{ xl: '8px' }}
                    fontStyle={inter.style.fontFamily}
                  >
                    <CiViewTable />
                    Importar via CSV
                  </Text>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
                                    aria-label='editar-oferta'
                                    icon={<FaFacebook />}
                                    size={'xs'}
                                    colorScheme={'facebook'}
                                  />
                                </Tooltip>
                                <Tooltip label='Compartilhar no Twitter' placement='top' borderRadius={'base'}>
                                  <IconButton
                                    aria-label='editar-oferta'
                                    colorScheme={'twitter'}
                                    icon={<FaTwitter />}
                                    size={'xs'}
                                  />
                                </Tooltip>
                                <Tooltip label='Compartilhar no Whatsapp' placement='top' borderRadius={'base'}>
                                  <IconButton
                                    aria-label='editar-oferta'
                                    colorScheme={'whatsapp'}
                                    icon={<FaWhatsapp />}
                                    size={'xs'}
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
  return {
    props: {}
  }
}) 
