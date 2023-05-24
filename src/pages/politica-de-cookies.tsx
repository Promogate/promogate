import { HomeFooter, MainMenu } from '@/presentation/components';
import { Box, Heading, ListItem, OrderedList, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';

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

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

const CookiesPolicies = ({ isLogged }: PageProps) => {
  return (
    <>
      <Head>
        <title>Promogate - Políticas de Cookies</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box
        maxWidth={['1170px']}
        margin={['3rem 1rem', '0 auto']}
        padding={{ xl: '0 6rem' }}
        fontSize={'21px'}
      >
        <Heading
          fontSize={['2rem']}
          fontFamily={montserrat.style.fontFamily}
          color={'#2b2b2b'}
        >
          Política de Cookies
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Esses tópicos relacionam o uso de Cookies na plataforma e a nossa
          Política de Cookies aplicada no Brasil.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Definição de cookies
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

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Armazenamento de Cookies
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Os Cookies são armazenados localmente no dispositivo do usuário, geralmente no diretório do navegador. O site
          que definiu o cookie pode acessá-lo e ler as informações contidas nele quando o usuário retorna ao site.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Consentimento do usuário
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          É importante ressaltar que os cookies podem ser gerenciados pelo usuário em seu navegador. Os usuários têm a
          opção de aceitar ou rejeitar cookies, bem como excluir os cookies armazenados.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Os diferentes tipo de Cookies e suas finalidades
        </Heading>
        <Text
          fontWeight={'bold'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Cookies próprios:
        </Text>
        <OrderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            <b>Cookies Essenciais:</b> Esses cookies são necessários para o funcionamento básico do site. Eles são usados
            para autenticação de usuários, manutenção de sessões e garantia da segurança do site.
          </ListItem>
          <ListItem>
            <b>Cookies de Preferências:</b> Esses cookies permitem que um site se lembre das preferências do usuário,
            como idioma, localização e configurações de exibição.
            Eles melhoram a experiência do usuário ao personalizar o conteúdo com base nas preferências individuais.
          </ListItem>
          <ListItem>
            <b>Cookies de Análise:</b> Esses cookies coletam informações sobre como os usuários interagem com o site, como
            páginas visitadas, tempo gasto no site e links clicados. Esses dados são usados para análise e otimização
            do site, ajudando a entender o desempenho e a usabilidade.
          </ListItem>
        </OrderedList>
        <Text
          fontWeight={'bold'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Cookies de terceiros:
        </Text>
        <OrderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
          start={4}
        >
          <ListItem>
            <b>Cookies de Marketing:</b> Esses cookies são usados para rastrear o comportamento do usuário e fornecer anúncios
            direcionados com base em seus interesses e atividades de navegação. Eles podem ser usados ​​por redes de
            publicidade para segmentar anúncios relevantes aos usuários.
          </ListItem>
          <ListItem>
            <b>Cookies de Redes Sociais:</b> Esses cookies são inseridos por serviços de redes sociais incorporados a
            um site. Eles permitem que os usuários compartilhem conteúdo do site em suas redes sociais e também podem
            rastrear a atividade do usuário nas redes sociais para fins de segmentação de anúncios.
          </ListItem>
          <ListItem>
            <b>Cookies de Remarketing:</b> Esses cookies são usados ​​para exibir anúncios personalizados para usuários que
            visitaram um determinado site anteriormente. Eles permitem que os anunciantes alcancem novamente os
            visitantes anteriores com anúncios relevantes, aumentando as chances de conversão.
          </ListItem>
        </OrderedList>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Duração dos cookies
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A duração dos cookies pode variar dependendo das configurações específicas de cada anunciante. Geralmente,
          existem dois tipos de duração para os cookies:
        </Text>

        <OrderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            <b>Cookies de Sessão:</b> Estes cookies são temporários e são armazenados apenas durante a visita do usuário ao
            site. Eles são excluídos assim que o usuário fecha o navegador. Os cookies de sessão são comumente usados
            para manter informações de login do usuário e rastrear a atividade durante uma única sessão de navegação.
          </ListItem>
          <ListItem>
            <b>Cookies Persistentes:</b> Esses cookies têm uma duração mais longa e permanecem no dispositivo do usuário mesmo
            depois que ele fecha o navegador. Eles são usados ​​para lembrar informações e preferências do usuário em
            visitas futuras ao site. A duração dos cookies persistentes pode variar, desde alguns dias até vários meses,
            dependendo das configurações definidas pelo anunciante.
          </ListItem>
        </OrderedList>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Quando um usuário clica em um link de afiliado e é redirecionado para o site do anunciante, um cookie é
          geralmente colocado no dispositivo do usuário. Esse cookie permite que o anunciante rastreie a origem daquele
          usuário por um determinado período de tempo.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Política de privacidade
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Ao utilizar a plataforma, o assinante e seus usuários declaram claramente que leu e concorda com a <Link href={'/politica-de-privacidade'}><b>Política de Privacidade</b></Link> da Promogate, onde explicamos como as
          informações pessoais são coletadas, usadas, armazenadas e protegidas.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Atualizações na política de cookies
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate se reserva ao direito de fazer alterações na Política de Cookies a qualquer momento e é de 
          responsabilidade do usuário revisar periodicamente essas mudanças. É importante lembrar que a legislação e as 
          diretrizes relacionadas a Cookies e privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </Text>
      </Box>
      <HomeFooter />
    </>
  )
}

export default CookiesPolicies