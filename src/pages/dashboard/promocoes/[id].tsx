import { API_KEY, api } from '@/config';
import { Offer } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';

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
        <title>Oferta</title>
      </Head>
      <DashboardLayout>
        <Box>
          <Flex
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Heading
              as={'h2'}
              fontSize={{ lg: '2xl' }}
              color={'gray.600'}
            >
              Oferta - {offerData.title}
            </Heading>
          </Flex>
        </Box>
        <Box
          margin={{ lg: '2rem 0' }}
          padding={{ lg: '2rem' }}
          backgroundColor={'white'}
          borderRadius={{ lg: '1rem' }}
        >
          <Flex
            justifyContent={'space-between'}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  const { id } = ctx.query as RouterQueryProps;

  const { data } = await api.get(`/resources/offers/${id}`, {
    headers: {
      Authorization: `Beaber ${cookies['couponwebsite.access_token']}`,
      'X-API-KEY': API_KEY
    }
  })

  return {
    props: {
      offerData: data
    }
  }
}