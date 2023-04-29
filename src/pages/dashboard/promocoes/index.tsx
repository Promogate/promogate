import { internalApiClient } from '@/config'
import { Offer } from '@/domain/models'
import { DashboardLayout } from '@/presentation/components'
import { withSSRAuth } from '@/utils'
import {
  Box,
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
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { Fragment } from 'react'
import { RxPlus } from 'react-icons/rx'
import { useQuery } from 'react-query'

/* eslint-disable @next/next/no-img-element */
export default function OffersPage() {
  const cookies = parseCookies();
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { data } = useQuery('offers', async () => {
    const { data } = await internalApiClient.get<Offer[]>('/dashboard/resources/offers', {
      headers: {
        'X-API-KEY': 'BRSEW0QC5N4VCAGS5572H85JV7W2',
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
        <Flex
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Heading
            as={'h2'}
            fontSize={{ xl: '2xl' }}
            color={'gray.600'}
          >
            Promoções
          </Heading>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement='right'
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
                  >
                    Adicionar promoção
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
                  <Th>Imagem do produto</Th>
                  <Th>Título do produto</Th>
                  <Th>Preço antigo</Th>
                  <Th>Novo preço</Th>
                  <Th>Link de destino</Th>
                  <Th>Image da loja</Th>
                  <Th>Data de expiração</Th>
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
                        <Text>
                          {offer.title}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {offer.old_price}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {offer.price}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {offer.destination_link}
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
                        {offer.expiration_date}
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
