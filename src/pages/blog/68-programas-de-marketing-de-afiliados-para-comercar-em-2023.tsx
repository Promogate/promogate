import { MainMenu } from '@/presentation/components';
import { Box, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { parseCookies } from 'nookies';

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

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

type PageProps = {
  isLogged: boolean
};

export default function BlogPost({ isLogged }: PageProps) {
  return (
    <>
      <Head>
        <title>68 Programas de Marketing de Afiliados para começar em 2023</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box
        as='article'
        maxWidth={['1170px']}
        margin={['3rem 1rem', '0 auto']}
        padding={{ xl: '0 6rem' }}
        fontSize={'21px'}
      >
        <Heading
          fontSize={['3rem']}
          fontFamily={montserrat.style.fontFamily}
          color={'#2b2b2b'}
        >
          68 Programas de Marketing de Afiliados para começar em 2023
        </Heading>
        <Heading
          fontSize={['2rem']}
          fontFamily={montserrat.style.fontFamily}
          color={'#2b2b2b'}
        >
          O que é e Como funciona o Marketing de Performance
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Cookies são pequenos arquivos de texto que são armazenados no navegador do usuário quando ele visita um site.
          Eles desempenham um papel importante na coleta e armazenamento de informações sobre as interações dos usuários
          com um determinado site.
        </Text>
      </Box>
    </>
  )
}