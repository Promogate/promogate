import { api } from '@/config';
import { Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Skeleton
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { TfiAngleLeft } from 'react-icons/tfi';
import { useQuery } from 'react-query';

/* eslint-disable @next/next/no-img-element */
export default function OfferSinglePage() {
  const { id } = useRouter().query as { id: string };

  const { data, isLoading } = useQuery(['offer', id], async () => {
    const { data } = await api.get<Offer>(`/dashboard/offers/${id}`)
    return data
  })

  return (
    <Fragment>
      <Head>
        <title>Oferta - {data?.title}</title>
      </Head>
      <DashboardLayout>
        <Box>
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={{ xl: '1rem' }}
          >
            <IconButton
              as={Link}
              href='/dashboard/promocoes'
              aria-label='create'
              variant={'outline'}
            >
              <TfiAngleLeft />
            </IconButton>
          </Flex>
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
              Oferta
            </Heading>
          </Flex>
        </Box>
        <Box
          margin={{ xl: '2rem 0' }}
          padding={{ xl: '2rem' }}
          backgroundColor={'white'}
          borderRadius={{ xl: '1rem' }}
        >
          <Flex
            justifyContent={'space-between'}
          >
            <Grid
              gridTemplateColumns={'1fr auto'}
              gap={{ xl: '1rem' }}
            >
              <Skeleton isLoaded={!isLoading}>
                <Box
                  width={'120px'}
                  height={'auto'}
                >
                  <img
                    src={data?.image}
                    alt={data?.title}
                  />
                </Box>
              </Skeleton>
              <Box>
                <Skeleton isLoaded={!isLoading}>
                  <Heading
                    as={'h2'}
                    fontSize={{ xl: '2xl' }}
                    color={'gray.600'}
                  >
                    {data?.title}
                  </Heading>
                </Skeleton>
                <Flex
                  padding={{ xl: '1rem 0' }}
                  gap={{ xl: '1rem' }}
                >
                  <Skeleton isLoaded={!isLoading}>
                    <Button
                      variant={'outline'}
                    >
                      Excluir oferta
                    </Button>
                  </Skeleton>
                  <Skeleton isLoaded={!isLoading}>
                    <Button
                      backgroundColor={'black'}
                      color={'white'}
                      _hover={{
                        backgroundColor: 'black'
                      }}
                    >
                      Editar oferta
                    </Button>
                  </Skeleton>
                </Flex>
              </Box>
            </Grid>
          </Flex>
        </Box>
      </DashboardLayout>
    </Fragment>
  )
}
