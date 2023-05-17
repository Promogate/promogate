import { HomeFooter, MainMenu } from '@/presentation/components';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import { parseCookies } from 'nookies';

type PageProps = {
  isLogged: boolean
};

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

export default function AboutUs({ isLogged }: PageProps) {

  return (
    <>
      <MainMenu isLogged={isLogged} />
      <Box maxWidth={{ xl: '1170px' }} margin={'0 auto'} padding={{ xl: '0 6rem' }}>
        <Heading fontSize={{ xl: '2rem' }} fontFamily={montserrat.style.fontFamily} marginTop={{ xl: '32px' }}
          color={'#2b2b2b'} >
          Quem somos
        </Heading>
        <Text fontSize={'2xl'} textTransform={'uppercase'} letterSpacing={'widest'} fontWeight={'light'}
          fontFamily={montserrat.style.fontFamily} marginTop={{ xl: '32px' }}>
          Nossa Experiência
        </Text>
        <Text fontWeight={'normal'} marginTop={{ xl: '16px' }} fontFamily={openSans.style.fontFamily}>
          Com quase 10 anos lidando com o mercado de e-commerce e marketing de performance, atendendo clientes nas
          áreas de Programação, Marketing, Criação de Conteúdo e Anúncios, identificamos que as principais dificuldades
          dos afiliados está na criação e manutenção de uma estrutura de divulgação das ofertas e cupons dos produtos e
          serviços promovidos.
        </Text>
        <Text fontWeight={'normal'} marginTop={{ xl: '32px' }} fontFamily={openSans.style.fontFamily}>
          Os custos elevados e a necessidade de aprendizado no uso de diversas ferramentas, além das rígidas regras de
          negócios das redes de afiliados e anunciantes, deixam a tarefa cansativa e pouco produtiva, obrigando o
          afiliado a dedicar muito tempo e dinheiro com o risco de não ter o mínimo retorno necessário.
        </Text>
        <Text fontWeight={'normal'} marginTop={{ xl: '32px' }} fontFamily={openSans.style.fontFamily}>
          Nosso objetivo é desenvolver um ambiente integrado que ofereça:
        </Text>
        <UnorderedList fontWeight={'normal'} marginTop={{ xl: '1rem' }} fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}>
          <ListItem>
            A facilidade de cadastrar, gerir e compartilhar as ofertas que os afiliados pretendem promover;
          </ListItem>
          <ListItem>
            Um site onde essas ofertas podem ser expostas;
          </ListItem>
          <ListItem>
            Ferramentas de marketing para que o usuário possa medir seus resultados e facilitar a divulgação dessas ofertas;
          </ListItem>
          <ListItem>
            Tudo isso de forma simples e prática e principalmente <span className='font-bold'>com custo inicial zero</span>.
          </ListItem>
        </UnorderedList>
        <Text fontWeight={'normal'} marginTop={{ xl: '32px' }} fontFamily={openSans.style.fontFamily}>
          Uma série de funcionalidades e métricas já estarão disponíveis na versão gratuita para que você alcance seus 
          objetivos sem a necessidade de investir nada além de tempo.
        </Text>
        <Text fontWeight={'normal'} marginTop={{ xl: '32px' }} fontFamily={openSans.style.fontFamily}>
          Na medida em que começar a obter resultados, você pode contratar ferramentas específicas de acordo com suas 
          necessidades e objetivos. Não serão oferecidos pacotes cheios de funções que você não quer ou precisa, apenas 
          para justificar a cobrança.
        </Text>
        <Text fontWeight={'normal'} marginTop={{ xl: '32px' }} fontFamily={openSans.style.fontFamily}>
          Você cresce, nós crescemos também.
        </Text>
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