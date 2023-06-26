import { featuredOffersState } from '@/application/atoms/FeaturedAtom';
import { api } from '@/config';
import { OfferWithClicks } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import {
  FeaturedSlider,
  SingleProductPageContent,
  StoreFooter,
  StoreHeader
} from '@/presentation/components';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Img,
  Text,
  VStack
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'next-share';
import {
  Montserrat,
  Open_Sans
} from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';

type SingleProductResponse = {
  status: string;
  message: string;
  offer: OfferWithClicks;
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
  const featuredOffers = useRecoilValue(featuredOffersState);

  const structuredData = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": data.offer.title,
    "image": data.offer.image,
    "description": data.offer.description,
    "brand": {
      "@type": "Brand",
      "name": data.offer.title
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": data.offer.price,
      "url": data.offer.destination_link,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }

  return (
    <Fragment>
      <Head>
        <title>{data.offer.title}</title>
        <meta name='robots' content='max-image-preview:large' />
        <meta property='og:title' content={data.offer.title} />
        <meta property='og:description' content={data.offer.description} />
        <meta property='og:type' content='article' />
        <meta property='og:image' content={data.offer.image} />
        <meta property="og:image:width" content="1680" />
        <meta property="og:image:height" content="840" />
        <meta property="og:image:alt" content={data.offer.title} />
        <meta property='og:site_name' content='Promogate' />
        <meta property='og:locale' content='pt_BR' />
        <meta property='og:url' content={`https://promogate.app${router.asPath}`} />
        <link rel='canonical' content={`https://promogate.app/${data.offer.resources.user_profile.store_name}`} />
        <meta property='product:price.amount' content={data.offer.price} />
        <meta property='product:price.currency' content='BRL' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:site' content='@promogate' />
        <meta property='twitter:title' content={data.offer.title} />
        <meta property='twitter:description' content={data.offer.description} />
        <meta property='twitter:image' content={data.offer.image} />
        <meta property='twitter:creator' content={data.offer.store_name} />
        <meta property='fb:app_id' content="106988875737461" />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Box backgroundColor={'blackAlpha.50'}>
        <StoreHeader props={{
          store_image: data.offer.resources.user_profile.store_image,
          store_name: data.offer.resources.user_profile.store_name,
          store_name_display: data.offer.resources.user_profile.store_name,
          social_media: data.offer.resources.user_profile.social_media
        }} />
        <Grid
          maxWidth={['1170px']}
          margin={['1.5rem auto']}
          borderRadius={['lg']}
          gridTemplateColumns={['1fr', '1fr', '240px 8fr 4fr']}
          gap={['0', '1rem']}
          backgroundColor={['white']}
          padding={['1rem']}
          alignItems={['center']}
        >
          <Box
            marginBottom={['1rem', '2rem', 0]}
          >
            <VStack
              gap={['0.5rem']}
              top={0}
              left={0}
              width={'100%'}
              textAlign={'center'}
            >
              <Img
                src={data.offer.image}
                alt={data.offer.title}
                width={['120px', '160px', '240px']}
              />
            </VStack>
          </Box>
          <Box
            padding={['1rem']}
          >

            <Heading
              as='h1'
              fontSize={['1.3rem', '2rem']}
              fontFamily={montserrat.style.fontFamily}
              padding={{ xl: '0 0 1rem 0' }}
              fontWeight={['extrabold']}
            >
              {data.offer.title}
            </Heading>
            {
              data.offer.store_image ? (
                <Box
                  alignItems={'center'}
                  width={'100%'}
                  justifyContent={'space-between'}
                  margin={['0.5rem 0', '1rem 0', 0]}
                >
                  <Text
                    color={['gray.400']}
                    fontSize={['0.6rem']}
                  >
                    Vendido por
                  </Text>
                  <Img
                    src={data.offer.store_image}
                    alt={data.offer.title}
                    width={'80px'}
                  />
                </Box>
              ) : null
            }
          </Box>
          <Box>
            <Box
              margin={['0', '1rem', '2rem']}
            >
              <Grid
                placeItems={['center']}
                margin={['0.5rem 0']}
              >
                {data.offer.old_price && (
                  <Text
                    as={'span'}
                    color={'red.400'}
                    textDecoration={'line-through'}
                  >
                    {parseCurrency(data.offer.old_price)}
                  </Text>
                )}
                <Heading
                  as={'h2'}
                  fontFamily={montserrat.style.fontFamily}
                  color={['gray.700']}
                  fontSize={['1.8rem']}
                  fontWeight={['extrabold']}
                >
                  {parseCurrency(data.offer.price)}
                </Heading>
              </Grid>
              <Button
                as={Link}
                href={`/api/redir/${data.offer.id}`}
                target='_blank'
                rightIcon={<FiExternalLink />}
                colorScheme={'green'}
                width={['100%']}
                size={['lg']}
              >
                Pegar promoção
              </Button>
              <Text
                color={['gray.900']}
                textAlign={['center']}
                margin={['0.5rem 0']}
              >
                Oferta vista {data.offer._count.offer_clicks} vezes
              </Text>
              <Box
                textAlign={['center']}
              >
                <Text
                  color={'gray.400'}
                >
                  Compartilhe esta oferta:
                </Text>
                <Flex
                  gap={['1rem']}
                  margin={['0.5rem auto']}
                  justifyContent={['center']}
                  width={['100%']}
                >
                  <FacebookShareButton
                    url={data.offer.short_link}
                    quote={`${data.offer.title} %0A ${data.offer.old_price ? ` de *${parseCurrency(data.offer.old_price)}* por *${parseCurrency(data.offer.price)}*` : `por ${parseCurrency(data.offer.price)}`}`}
                  >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={data.offer.short_link}
                    title={`${data.offer.title} %0A ${data.offer.old_price ? ` de *${parseCurrency(data.offer.old_price)}* por *${parseCurrency(data.offer.price)}*` : `por ${parseCurrency(data.offer.price)}`}`}
                    separator=':: '
                  >
                    <WhatsappIcon size={24} round />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={data.offer.short_link}
                    title={`${data.offer.title} %0A ${data.offer.old_price ? ` de *${parseCurrency(data.offer.old_price)}* por *${parseCurrency(data.offer.price)}*` : `por ${parseCurrency(data.offer.price)}`}`}
                  >
                    <TelegramIcon size={24} round />
                  </TelegramShareButton>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Box
          as='article'
          fontFamily={openSans.style.fontFamily}
          padding={['1rem 1rem', '1rem 1rem', 0]}
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
              maxWidth={['815px']}
            >
              {
                data.offer.description ? (
                  null
                ) : (
                  <Box
                    margin={{ xl: '1rem 0' }}
                  >
                    <Text
                      fontSize={{ xl: '0.9rem' }}
                    >
                      {data.offer.description}
                    </Text>
                  </Box>
                )
              }
              <FeaturedSlider offers={featuredOffers} storeName={data.offer.resources.user_profile.store_name} />
            </Box>
            <Grid
              gap={['1rem']}
              margin={['1rem', '1rem', 0]}
            >
              <Grid gap={['1rem']} marginBottom={['1rem', '1.5rem']}>
                <Box>
                  <Heading
                    fontSize={['1rem']}
                    fontFamily={montserrat.style.fontFamily}
                    color={'gray.400'}
                  >
                    Segurança
                  </Heading>
                  <Text
                    fontSize={['0.8rem']}
                    fontWeight={'normal'}
                    marginTop={['0.5rem', '1rem']}
                    fontFamily={openSans.style.fontFamily}
                    color={'gray.400'}
                  >
                    Todas as lojas, ofertas e cupons anunciados, são verificados para garantir a melhor experiência de
                    compra
                  </Text>
                </Box>
                <Divider />
                <Box>
                  <Heading
                    fontSize={['1rem']}
                    fontFamily={montserrat.style.fontFamily}
                    color={'gray.400'}
                  >
                    Melhores Ofertas
                  </Heading>
                  <Text
                    fontSize={['0.8rem']}
                    fontWeight={'normal'}
                    marginTop={['0.5rem', '1rem']}
                    fontFamily={openSans.style.fontFamily}
                    color={'gray.400'}
                  >
                    Nossa equipe de especialistas coleta e reúne aqui as melhores ofertas da internet, tudo em um só
                    lugar.
                  </Text>
                </Box>
                <Divider />
                <Box>
                  <Heading
                    fontSize={['1rem']}
                    fontFamily={montserrat.style.fontFamily}
                    color={'gray.400'}
                  >
                    Cupons de Desconto
                  </Heading>
                  <Text
                    fontSize={['0.8rem']}
                    fontWeight={'normal'}
                    marginTop={['0.5rem', '1rem']}
                    fontFamily={openSans.style.fontFamily}
                    color={'gray.400'}
                  >
                    Tenha acesso aos melhores cupons de desconto do Brasil para você economizar ainda mais.
                  </Text>
                </Box>
              </Grid>
              <Box
                position={['sticky']}
                top={3}
              >
                <Link
                  href={'https://promogate.app'}
                  target='_blank'
                >
                  <Box
                    width={'300px'}
                    height={'300px'}
                    position={'relative'}
                    overflow={'hidden'}
                    margin={['0 auto']}
                  >
                    <Image
                      src={'/Quer-alavancar-suas-vendas-como-afiliado.gif'}
                      alt={'Promogate - Quer alavancar suas vendas como afiliado'}
                      fill
                      priority
                    />
                  </Box>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <SingleProductPageContent />
        <StoreFooter />
      </Box >
    </Fragment >
  )
}
