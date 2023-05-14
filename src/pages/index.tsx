import { MainMenu } from '@/presentation/components';
import {
  Box,
  Grid,
  Heading,
  Text
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';

const inter = Inter({ subsets: ['latin'] });

type HomeProps = {
  isLogged: string | null
};

export default function Home({ isLogged }: HomeProps) {
  return (
    <>
      <Head>
        <title>Promogate - Plataforma Digital Gratuito, Métricas e compartilhamento para o Afiliado</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box as='main' fontFamily={inter.style.fontFamily}>
        <Grid
          maxWidth={'1170px'}
          margin={{ xl: '0 auto' }}
          gridTemplateColumns={{ xl: '480px 1fr' }}
          height={{ xl: 'calc(100vh - 80px)' }}
          alignItems={{ xl: 'center' }}
        >
          <Box
            width={{ xl: '480px' }}
            height={{ xl: '480px' }}
            position={'relative'}
          >
            <Image
              src={'/home-hero-banner.webp'}
              alt={'Promogate Redes e Lojas'}
              fill
            />
          </Box>
          <Box
            paddingLeft={{ xl: '4rem' }}
          >
            <Text
              fontSize={'2xl'}
              textTransform={'uppercase'}
              letterSpacing={'wider'}
              fontWeight={'light'}
            >
              Tudo em um só lugar
            </Text>
            <Heading
              fontFamily={inter.style.fontFamily}
              width={{ xl: '64%' }}
              marginTop={{ xl: '24px' }}
            >
              Torne-se afiliado de grandes lojas online.
            </Heading>
            <Text
              fontWeight={'normal'}
              width={{ xl: '64%' }}
              marginTop={{ xl: '24px' }}
            >
              Cadastre seus produtos em um só lugar e tenha sua estrutura digital para acompanhar seus resultados.
            </Text>
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
        isLogged: cookies['promogate.token']
      }
    }
  }

  return {
    props: {
      isLogged: null
    }
  }
}