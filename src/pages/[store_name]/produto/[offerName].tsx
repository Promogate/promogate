import { api } from '@/config';
import { OfferWithClicks } from '@/domain/models';
import { parseAmbientUrl, parseCurrency } from '@/main/utils';
import { SingleProductPageContent, StoreFooter, StoreHeader } from '@/presentation/components';
import { Box, Button, Divider, Flex, Grid, HStack, Heading, Img, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

type SingleProductResponse = {
  status: string;
  message: string;
  offer: OfferWithClicks
}

const openSans = Open_Sans({ subsets: ['latin'], preload: true })
const montserrat = Montserrat({ subsets: ['latin'], preload: true })

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { oid, utm_click, rid } = ctx.query as { oid: string, utm_click: string, rid: string };
  const { data } = await api.get<SingleProductResponse>(`/resources/${rid}/offer/${oid}?utm_click=${utm_click}`)

  return {
    props: {
      status: data.status,
      message: data.message,
      offer: data.offer
    }
  }
}

export default function SingleProductPage(data: SingleProductResponse) {
  const router = useRouter();
  const { oid, utm_click, rid } = router.query as { oid: string, utm_click: string, rid: string };

  // const { data, isLoading } = useQuery(['offer', oid], async () => {
  //   const { data } = await api.get<SingleProductResponse>(`/resources/${rid}/offer/${oid}`)
  //   return data
  // }, {
  //   cacheTime: 1000 * 60 * 15,
  //   staleTime: 1000 * 60 * 15,
  //   initialData: data
  // })

  // if (isLoading) {
  //   return (
  //     <Grid
  //       justifyContent={'center'}
  //     >
  //       <Spinner />
  //     </Grid>
  //   )
  // }

  // if (!data) {
  //   return (
  //     <Grid
  //       justifyContent={'center'}
  //     >
  //       <Heading>
  //         Erro ao tentar encontrar o produto
  //       </Heading>
  //     </Grid>
  //   )
  // }

  return (
    <Fragment>
      <Head>
        <title>{data.offer.title}</title>
        <meta name='robots' content='max-image-preview:large'/>
        <meta property='og:title' content={data.offer.title} />
        <meta property='og:description' content={data.offer.description} />
        <meta property='og:type' content='article' />
        <meta property='og:image' content={data.offer.image} />
        <meta property="og:image:width" content="1680" />
        <meta property="og:image:height" content="840" />
        <meta property="og:image:alt" content={data.offer.title} />
        <meta property='og:site_name' content='Promogate' />
        <meta property='og:locale' content='pt_BR' />
        <meta property='og:url' content={parseAmbientUrl(`${data.offer.resources.user_profile.store_name}/${data.offer.title}?oid=${oid}&utm_click=1&rid=${rid}&utm_medium=share`)} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:site' content='@promogate' />
        <meta property='twitter:title' content={data.offer.title} />
        <meta property='twitter:description' content={data.offer.description} />
        <meta property='twitter:image' content={data.offer.image} />
        <meta property='twitter:creator' content={data.offer.store_name} />
      </Head>
      <StoreHeader props={{
        store_image: data.offer.resources.user_profile.store_image,
        store_name: data.offer.resources.user_profile.store_name
      }} />
      <Box
        as='article'
        fontFamily={openSans.style.fontFamily}
        padding={['1rem 1rem', '1rem 1rem', 0]}
        backgroundColor={'blackAlpha.50'}
      >
        <Grid
          maxWidth={['1170px']}
          minHeight={['100vh']}
          margin={'0 auto'}
          gridTemplateColumns={['1fr', '1fr', 'auto 300px']}
          gap={{ xl: '24px' }}
          padding={{ xl: '1rem 0' }}
        >
          <Box
            borderRadius={['lg']}
            backgroundColor={'white'}
            height={'max-content'}
          >
            <Grid
              gridTemplateColumns={['1fr', '1fr', '8fr 4fr']}
              gap={['24px']}
            >
              <Box
                padding={['1rem']}
              >
                <Heading
                  as='h1'
                  fontSize={['1.3rem', '2xl']}
                  fontFamily={montserrat.style.fontFamily}
                  padding={{ xl: '0 0 1rem 0' }}
                >
                  {data.offer.title}
                </Heading>
                <Flex
                  alignItems={'center'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  margin={['1rem 0', '1rem 0', 0]}
                >
                  <Flex
                    gap={{ xl: '0.5rem' }}
                    flexDirection={['column-reverse', 'column', 'row']}
                  >
                    <Heading
                      as={'h2'}
                      fontFamily={montserrat.style.fontFamily}
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
                    fontSize={['0.825rem']}
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
              <Box>
                <VStack
                  gap={{ xl: '0.5rem' }}
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
                  <Box
                    margin={['2rem']}
                  >
                    <Button
                      as={Link}
                      href={`/api/redir/${data.offer.id}`}
                      target='_blank'
                      rightIcon={<FiExternalLink />}
                      colorScheme={'green'}
                      width={['100%']}
                      size={['lg']}
                    >
                      Abrir na loja
                    </Button>
                  </Box>
                  <Divider orientation='horizontal' />
                  <HStack
                    padding={['1rem 0', '1rem 0', 0]}
                  >
                    <Button
                      leftIcon={<FaRegComments />}
                      width={['100%']}
                      size={['lg']}
                    >
                      Deixe um comentário
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Grid>
          </Box>
          <Grid
            gap={['1rem']}
            margin={['1rem', '1rem', 0]}
          >
            <Image
              src={'/ads/300x250.png'}
              alt={'_'}
              width={300}
              height={250}
            />
          </Grid>
        </Grid>
      </Box>
      <SingleProductPageContent />
      <StoreFooter />
    </Fragment>
  )
}
