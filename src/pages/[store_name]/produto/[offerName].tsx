import { api } from '@/config';
import { OfferWithClicks } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import { StoreFooter, StoreHeader } from '@/presentation/components';
import { Box, Button, Divider, Flex, Grid, HStack, Heading, Img, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { useQuery } from 'react-query';

type SingleProductResponse = {
  status: string;
  message: string;
  offer: OfferWithClicks
}

const inter = Inter({ subsets: ['latin'], preload: true });

export default function SingleProductPage() {
  const router = useRouter();
  const { oid, utm_click, rid } = router.query as { oid: string, utm_click: string, rid: string };

  const { data, isLoading } = useQuery(['offer', oid], async () => {
    const { data } = await api.get<SingleProductResponse>(`/resources/${rid}/offer/${oid}`)
    return data
  }, {
    cacheTime: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15
  })

  if (data === undefined) {
    return (
      <Fragment>
        <Heading>
          Loja não encontrada
        </Heading>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>{data.offer.title}</title>
      </Head>
      <StoreHeader props={data.offer} />
      <Box
        backgroundColor={'gray.50'}
        fontFamily={inter.style.fontFamily}
      >
        <Grid
          maxWidth={{ xl: '1160px' }}
          margin={'0 auto'}
          gridTemplateColumns={'auto 300px'}
          gap={{ xl: '24px' }}
          padding={{ xl: '2rem 0' }}
        >
          <Box
            padding={{ xl: '1rem' }}
            borderRadius={{ xl: 'lg' }}
            backgroundColor={'white'}
            height={'max-content'}
          >
            <Grid
              gridTemplateColumns={{ xl: '8fr 4fr' }}
              gap={'24px'}
            >
              <Box
                padding={{ xl: '1rem 0' }}
              >
                <Heading
                  as='h1'
                  fontSize={'2xl'}
                  fontFamily={inter.style.fontFamily}
                  padding={{ xl: '0 0 1rem 0' }}
                >
                  {data.offer.title}
                </Heading>
                <Flex
                  alignItems={'center'}
                  width={'100%'}
                  justifyContent={'space-between'}
                >
                  <Flex
                    gap={{ xl: '0.5rem' }}
                  >
                    <Heading
                      as={'h2'}
                      fontFamily={inter.style.fontFamily}
                      fontSize={{ xl: '2xl' }}
                    >
                      {parseCurrency(data.offer.price)}
                    </Heading>
                    {data.offer.old_price && (
                      <Text
                        as={'span'}
                        color={'red.400'}
                        textDecoration={'line-through'}
                      >
                        {parseCurrency(data.offer.old_price)}
                      </Text>
                    )}
                  </Flex>
                  <Flex
                    alignItems={'center'}
                    fontSize={{ xl: '0.825rem' }}
                    gap={{ xl: '0.25rem' }}
                  >
                    <Text>
                      Oferta vista {data.offer._count.offer_clicks} vezes
                    </Text>
                  </Flex>
                </Flex>
                <Divider orientation='horizontal' />
                <Box
                  margin={{ xl: '1rem 0' }}
                >
                  <HStack
                    margin={{ xl: '1rem 0' }}
                  >
                    <Text
                      color={'gray.400'}
                    >
                      Compartilhe esta oferta:
                    </Text>
                    <HStack>
                      <FacebookShareButton
                        url={`https://promogate.app${router.asPath}`}
                        quote={data.offer.title}
                      >
                        <FacebookIcon size={24} round />
                      </FacebookShareButton>
                      <WhatsappShareButton
                        url={`https://promogate.app${router.asPath}`}
                        title={data.offer.title}
                        separator=':: '
                      >
                        <WhatsappIcon size={24} round />
                      </WhatsappShareButton>
                      <TelegramShareButton
                        url={`https://promogate.app${router.asPath}`}
                      >
                        <TelegramIcon size={24} round />
                      </TelegramShareButton>
                    </HStack>
                  </HStack>
                  <Text
                    fontSize={{ xl: '0.9rem' }}
                  >
                    {data.offer.description}
                  </Text>
                </Box>
              </Box>
              <Box position={'relative'}>
                <VStack
                  padding={{ xl: '2rem 0' }}
                  gap={{ xl: '0.5rem' }}
                  pos={'sticky'}
                  top={0}
                  left={0}
                  width={'100%'}
                  textAlign={'center'}
                >
                  <Img
                    src={data.offer.image}
                    alt={data.offer.title}
                    height={'240px'}
                  />

                  <Button
                    as={Link}
                    href={data.offer.destination_link}
                    target='_blank'
                    rightIcon={<FiExternalLink />}
                    colorScheme={'green'}
                    width={'100%'}
                    size={{ xl: 'lg' }}
                  >
                    Abrir na loja
                  </Button>
                  <Divider orientation='horizontal' />
                  <HStack>
                    <Button
                      leftIcon={<FaRegComments />}
                    >
                      Deixe um comentário
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Grid>
          </Box>
          <Grid
            gap={{ xl: '1rem' }}
          >
            <Image
              src={'/ads/300x250.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
            <Image
              src={'/ads/300x600.png'}
              alt={'_'}
              width={300}
              height={250}
            />
          </Grid>
        </Grid>
      <StoreFooter props={data.offer} />
      </Box>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { oid, utm_click, rid } = ctx.query as { oid: string, utm_click: string, rid: string };
  await api.get<SingleProductResponse>(`/resources/${rid}/offer/${oid}?utm_click=${utm_click}`)

  return {
    props: {}
  }
}