import { api } from '@/config';
import { FetchStoreOffersResponse } from '@/domain/@types';
import { OfferWithClicks } from '@/domain/models';
import {
  FeaturedSlider,
  HomeFooter,
  OfferCard,
  StoreFooterContent,
  StoreHeader
} from '@/presentation/components';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

type SingleStoreProps = {
  store_name: string;
  offerData: FetchStoreOffersResponse
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { store_name } = ctx.query as { store_name: string };
  const cookies = parseCookies(ctx);
  const { data } = await api.get<FetchStoreOffersResponse>(`/resources/offers/${store_name}`, {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })
  return {
    props: {
      store_name,
      offerData: data
    }
  }
}

export default function Home({ store_name, offerData }: SingleStoreProps) {
  const featuredOffers = offerData.data.resources.offers.filter(offer => offer.is_featured)
  return (
    <Fragment>
      <Head key={offerData.data.id}>
        <title>
          Promogate | {offerData.data.store_name_display}
        </title>
        <meta name="lomadee-verification" content={offerData.data.lomadee_source_id as string} />
        <meta name="verify-admitad" content={offerData.data.admitad_verification as string} />
        <meta property='og:title' content={`Promogate - ${offerData.data.store_name_display}`} />
        <meta property='og:description' content="Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado" />
        <meta property='og:type' content='site' />
        <meta property='og:image' content={offerData.data.store_image} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado" />
        <meta property='og:site_name' content='Promogate' />
        <meta property='og:locale' content='pt_BR' />
        <meta property='og:url' content={`https://promogate.app/${offerData.data.store_name}`} />
        <link rel='canonical' content={`https://promogate.app/${offerData.data.store_name}`} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:site' content='@promogate' />
        <meta property='twitter:title' content={offerData.data.store_name} />
        <meta property='twitter:description' content="Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado" />
        <meta property='twitter:image' content={offerData.data.store_image} />
        <meta property='twitter:creator' content="@promogate" />
        <meta property='fb:app_id' content="106988875737461" />
      </Head>
      <Box
        as='main'
        backgroundColor={'gray.50'}
      >
        <StoreHeader props={{
          store_image: offerData.data.store_image,
          store_name_display: offerData.data.store_name_display,
          store_name: offerData.data.store_name,
          social_media: offerData.data.social_media
        }} />
        <Grid
          gridTemplateColumns={['1fr', '9fr 3fr']}
          maxWidth={['1170px']}
          margin={['1rem auto']}
          padding={['1rem']}
          gap={['1.5rem']}
        >
          <Box maxWidth={['815px']}>
            <Heading
              fontSize={['2xl']}
              fontFamily={montserrat.style.fontFamily}
              color={'gray.600'}
            >
              Destaque
            </Heading>
            <FeaturedSlider offers={featuredOffers} storeName={offerData.data.store_name} />
            <Box
              display={['none', 'block']}
            >
              <Link
                href={'https://wavvves.com.br'}
                target='_blank'
              >
                <Box
                  width={'728px'}
                  height={'90px'}
                  position={'relative'}
                  overflow={'hidden'}
                  margin={['0 auto']}
                >
                  <Image
                    src={'/Impulsionando-o-Seu-Sucesso-Online.gif'}
                    alt={'wavvves - Impulsionando o Seu Sucesso Online'}
                    fill
                    priority
                  />
                </Box>
              </Link>
            </Box>
            <Box
              margin={{ xl: '3rem 0' }}
            >
              <Heading
                fontSize={['2xl']}
                fontFamily={montserrat.style.fontFamily}
                color={'gray.600'}
              >
                Todas as ofertas
              </Heading>
              <Grid
                gridTemplateColumns={['1fr', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
                margin={['1rem 0']}
                gap={['1rem']}
                position={'relative'}
              >
                {
                  offerData.data.resources.offers.map((offer: OfferWithClicks) => {
                    return <OfferCard key={offer.id} data={offer} storeName={offerData.data.store_name} />
                  })
                }
              </Grid>
            </Box>
          </Box>
          <Box position={['relative']}>
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
            <Grid gap={'1rem'}>
              <Box
                height={'600px'}
                width={'300px'}
              >
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258286762385899"
                  crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-9258286762385899"
                  data-ad-slot="1379343231"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
                <script>
                  (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
              </Box>
              <Box
                height={'300px'}
                width={'300px'}
              >
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9258286762385899"
                  crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-9258286762385899"
                  data-ad-slot="1379343231"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
                <script>
                  (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
              </Box>
            </Grid>
          </Box>
        </Grid>
        <StoreFooterContent />
        <HomeFooter />
      </Box>
    </Fragment>
  )

}