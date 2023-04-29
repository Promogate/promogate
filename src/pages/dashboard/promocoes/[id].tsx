import { internalApiClient } from '@/config';
import { Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import { withSSRAuth } from '@/utils';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';
import { TfiAngleLeft } from 'react-icons/tfi';

type RouterQueryProps = {
  id: string
}

type OfferSinglePageProps = {
  offerData: Offer
}

/* eslint-disable @next/next/no-img-element */
export default function OfferSinglePage({ offerData }: OfferSinglePageProps) {
  return (
    <Fragment>
      <Head>
        <title>Oferta - {offerData.title}</title>
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
              <Box
                width={'120px'}
                height={'auto'}
              >
                <img
                  src={offerData.image}
                  alt={offerData.title}
                />
              </Box>
              <Box>
                <Heading
                  as={'h2'}
                  fontSize={{ xl: '2xl' }}
                  color={'gray.600'}
                >
                  {offerData.title}
                </Heading>
                <Flex
                  padding={{ xl: '1rem 0' }}
                  gap={{ xl: '1rem' }}
                >
                  <Button
                    variant={'outline'}
                  >
                    Excluir oferta
                  </Button>
                  <Button
                    backgroundColor={'black'}
                    color={'white'}
                    _hover={{
                      backgroundColor: 'black'
                    }}
                  >
                    Editar oferta
                  </Button>
                </Flex>
              </Box>
            </Grid>
            <Box
              width={'64px'}
              height={'auto'}
            >
              <img
                src={offerData.store_image}
                alt={offerData.title}
              />
            </Box>
          </Flex>
        </Box>
      </DashboardLayout>
    </Fragment>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const cookies = parseCookies(ctx)
  const { id } = ctx.query as RouterQueryProps;

  const { data } = await internalApiClient.get(`/resources/offers/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })


  return {
    props: {
      offerData: data
    }
  }
})
