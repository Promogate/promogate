import { api } from '@/config';
import { Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiViewTable } from 'react-icons/ci';
import { RxPlus } from 'react-icons/rx';
import { useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

/* eslint-disable @next/next/no-img-element */
export default function OffersPage() {
  const cookies = parseCookies();
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { data } = useQuery('offers', async () => {
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
            <Table size={'sm'}>
              <Thead>
                <Tr>
                  <Th fontStyle={inter.style.fontFamily}>Imagem do produto</Th>
                  <Th>Título do produto</Th>
                  <Th>Preço antigo</Th>
                  <Th>Novo preço</Th>
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
                          {offer.old_price}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontStyle={inter.style.fontFamily}>
                          {offer.price}
                        </Text>
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
