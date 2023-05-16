import { MainMenu } from '@/presentation/components';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';

const montserrat = Montserrat({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

type HomepageProps = {
  isLogged: boolean
};

export default function Home({ isLogged }: HomepageProps) {
  return (
    <>
      <Head>
        <title>Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box as='main' maxWidth={{ xl: '1170px' }} margin={'0 auto'}>
        <Flex paddingRight={{ xl: '320px' }} flexDirection={'column'} gap={{ xl: '32px' }}>
          <Heading as='h1' fontSize={{ xl: '5rem' }} fontFamily={montserrat.style.fontFamily}>
            Sua estrutura digital como afiliado, <Text as={'span'} color={'#5528FF'}>gratuita</Text>.
          </Heading>
          <Text fontFamily={openSans.style.fontFamily} fontSize={{ xl: '21px' }}>
            Nunca foi tão fácil ter uma estrutura digital para divulgar os produtos
            e lojas que você é afiliado. Tenha um painel administrativo fácil de gerir
            e uma vitrine somente para você.
          </Text>
          <Button maxWidth={'max-content'} backgroundColor={'#5528FF'} _hover={{ backgroundColor: '#5528FF' }} color={'white'}>
            Saiba mais
          </Button>
        </Flex>
        <Grid
          maxWidth={'1170px'}
          margin={{ xl: '104px auto' }}
          gridTemplateColumns={{ xl: '1fr 1fr' }}
          alignItems={{ xl: 'center' }}
        >
          <Box>
            <Text
              fontSize={'2xl'}
              textTransform={'uppercase'}
              letterSpacing={'widest'}
              fontWeight={'light'}
              fontFamily={montserrat.style.fontFamily}
            >
              Tudo em um só lugar
            </Text>
            <Heading
              fontFamily={montserrat.style.fontFamily}
              width={{ xl: '72%' }}
              marginTop={{ xl: '24px' }}
            >
              Torne-se afiliado de grandes lojas online.
            </Heading>
            <Text
              fontWeight={'normal'}
              width={{ xl: '72%' }}
              marginTop={{ xl: '32px' }}
              fontFamily={openSans.style.fontFamily}
            >
              Cadastre seus produtos em um só lugar e tenha sua estrutura digital para acompanhar seus resultados.
            </Text>
          </Box>
          <Box
            width={{ xl: '560px' }}
            height={{ xl: '560px' }}
            position={'relative'}
          >
            <Image
              src={'/home-hero-banner.webp'}
              alt={'Promogate Redes e Lojas'}
              fill
            />
          </Box>
        </Grid>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['promogate.token']) {
    return {
      props: {
        isLogged: true
      }
    }
  }

  return {
    props: {
      isLogged: false
    }
  }
}