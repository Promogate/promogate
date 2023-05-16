import { Hero, HomeFooter, MainMenu } from '@/presentation/components';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { FiExternalLink } from 'react-icons/fi';

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

type HomepageProps = {
  isLogged: boolean
};

export default function Home({ isLogged }: HomepageProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box as='main' maxWidth={{ xl: '1170px' }} margin={'0 auto'}>
        <Hero />
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
        <Grid gridTemplateColumns={{ xl: '1fr 1fr' }}>
          <Box>
            <Box width={{ xl: '400px' }} height={{ xl: '280px' }} position={'relative'} margin={{ xl: '0 auto' }}>
              <Image
                src='/all_data.svg'
                alt='Painel administrativo com todos os dados'
                fill
              />
            </Box>
            <Heading fontSize={{ xl: '2rem' }} fontFamily={montserrat.style.fontFamily} marginTop={{ xl: '56px' }}
              color={'#2b2b2b'} >
              Saiba o que mais converte
            </Heading>
            <Text fontWeight={'normal'} width={{ xl: '72%' }} marginTop={{ xl: '32px' }}
              fontFamily={openSans.style.fontFamily}>
              Obtenha uma visão geral rápida do seu programa de afiliados a qualquer momento ou vá granular com filtros
              poderosos. comparar conversões em diferentes ambientes móveis.
            </Text>
          </Box>
          <Box>
            <Box width={{ xl: '400px' }} height={{ xl: '280px' }} position={'relative'} margin={{ xl: '0 auto' }}>
              <Image
                src='/social_share.svg'
                alt='Painel administrativo com todos os dados'
                fill
              />
            </Box>
            <Heading fontSize={{ xl: '2rem' }} fontFamily={montserrat.style.fontFamily} marginTop={{ xl: '56px' }}
              color={'#2b2b2b'}>
              Divulgue sua loja
            </Heading>
            <Text fontWeight={'normal'} width={{ xl: '72%' }} marginTop={{ xl: '32px' }}
              fontFamily={openSans.style.fontFamily}>
              User o potencial de suas redes sociais e compartilhe sua loja e seus produtos cadastrados. Tenha um maior
              alcance e mais conversões, diretamente do seu painel administrativo.
            </Text>
          </Box>
        </Grid>
        <Flex paddingRight={{ xl: '320px' }} flexDirection={'column'} gap={{ xl: '32px' }} color={'#2b2b2b'}
          marginTop={{ xl: '144px' }}>
          <Text fontSize={'2xl'} textTransform={'uppercase'} letterSpacing={'widest'} fontWeight={'light'}
            fontFamily={montserrat.style.fontFamily}>
            NÃO SOMOS UMA REDE
          </Text>
          <Heading as='h1' fontSize={{ xl: '5rem' }} fontFamily={montserrat.style.fontFamily} width={{ xl: '80%' }}>
            Receba <Text as={'span'} color={'#5528FF'}>100%</Text> da sua comissão.
          </Heading>
          <Text fontFamily={openSans.style.fontFamily} fontSize={{ xl: '21px' }} width={{ xl: '80%' }}>
            Somos uma plataforma com painel administrativo e um site individual, gratuitos, para você divulgar suas
            ofertas e promoções
          </Text>
        </Flex>
        <Box
          margin={{ xl: '104px 0' }}
          textAlign={{ xl: 'center' }}
        >
          <Heading fontSize={{ xl: '2rem' }} fontFamily={montserrat.style.fontFamily} marginTop={{ xl: '56px' }}
            color={'#2b2b2b'} >
            Veja nossa loja
          </Heading>
          <Grid margin={{ xl: '2rem 0' }} justifyContent={'center'}>
            <GridItem display={'grid'} justifyContent={'center'} gap={{ xl: '24px'}}>
              <Box rounded={'full'} position={'relative'} height={'120px'} width={'120px'} boxShadow={{ xl: '2xl' }}
                overflow={'hidden'} margin={'0 auto'}>
                <Image src='/novo_promogate.png' alt='Loja Promogate' fill />
              </Box>
              <Button maxWidth={'max-content'} backgroundColor={'#5528FF'} _hover={{ backgroundColor: '#5528FF' }}
                color={'white'} onClick={() => router.push('/promogate')} rightIcon={<FiExternalLink />}>
                Visite nossa loja!
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <HomeFooter />
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