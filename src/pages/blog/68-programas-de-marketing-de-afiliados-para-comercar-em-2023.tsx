import { storeLinks } from '@/domain/models';
import { HomeFooter, MainMenu } from '@/presentation/components';
import { Box, Heading, ListItem, OrderedList, Text } from '@chakra-ui/react';
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
  const postReferrer = {
    amazon: 'https://associados.amazon.com.br/',
    shopee: 'https://shopee.com.br/m/afiliados',
    magazineLuiza: 'https://m.magazinevoce.com.br/',
    netshoes: 'https://www.netshoes.com.br/especial/afiliados?gclid=CjwKCAjwscGjBhAXEiwAswQqNO9JY5foFFOnX8KOCBQSCFB6P6YIcTNl84Xc1tzOGsUyVkJuDVvy6BoCmNQQAvD_BwE&gclsrc=aw.ds',
  }

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
        padding={['', '', '2rem 6rem']}
        fontSize={'21px'}
      >
        <Heading
          fontSize={['2rem', '3rem']}
          fontFamily={montserrat.style.fontFamily}
          color={'#2b2b2b'}
        >
          68 Programas de Marketing de Afiliados para começar em 2023 - Promogate
        </Heading>
        <Box
          margin={['2rem 0']}
        >
          <Heading
            fontSize={['1.5rem', '2rem']}
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
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            O marketing de afiliados oferece uma das formas mais produtivas e variadas de trabalhar em casa e que vão
            muito além do que você está acostumado a ver e ouvir por aí? E pior, você está deixando de ganhar muito
            dinheiro por conta disso.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Existem muito mais opções de afiliação além das já conhecidas Hotmart, Monetizze e Eduzz, há muito mais
            possibilidades além de se afiliar a infoprodutos, gerar uma tonelada de conteúdos, investir em tráfego e no
            fim torcer para dar certo.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            O primeiro passo é conhecer bem os programas afiliados e escolher entre eles os que mais se parecem com
            você. E esse modelo de negócio oferece inúmeras oportunidades para quem está disposto a investir apenas
            tempo e esforço vendendo como um afiliado.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            A prática já é comum há muitos anos, mas apesar disso, as pessoas ainda têm dúvidas sobre como o marketing
            de afiliados funciona, principalmente pela associação do modelo de negócios com os infoprodutos.
          </Text>
          <Heading
            padding={['2rem 0 0']}
            fontSize={['1.5rem', '2rem']}
            fontFamily={montserrat.style.fontFamily}
            color={'#2b2b2b'}
          >
            Quanto o Marketing de Performance movimenta?
          </Heading>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Mas só para você ter uma ideia, mesmo com pandemia, lojas como <a href={postReferrer.amazon} target='_blank'>
              Amazon</a>, <a href={postReferrer.shopee} target='_blank'>Shopee</a>, <a href={postReferrer.magazineLuiza}>Magazine Luiza</a> e
            <a href={postReferrer.netshoes}>Netshoes</a> cresceram muito e movimentaram R$450 bilhões nos últimos três anos no Brasil, e a tendência é que esses
            valores continuem aumentando. E é aqui que estão suas comissões.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            E não sou eu quem tá dizendo isso não, vou deixar o link da matéria para você conferir: <a href='https://g1.globo.com/economia/noticia/2023/05/11/com-pandemia-comercio-eletronico-cresce-e-movimenta-r-450-bilhoes-em-tres-anos-no-pais.ghtml' target='_blank'
              className='underline'>https://g1.globo.com/economia/noticia/2023/05/11/com-pandemia-comercio-eletronico-cresce-e-movimenta-r-450-bilhoes-em-tres-anos-no-pais.ghtml</a>
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Vou te contar um segredo tá, elas vão continuar vendendo, muito, e cada vez mais, mesmo sem você, mas, ser
            afiliado dessas grandes empresas é uma maneira de uma fatia desse bolo poder parar no seu bolso.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Tudo bem, existem dezenas de programas disponíveis na internet, o que pode dificultar a busca de um que se
            encaixe bem nas suas possibilidades. Cada alternativa trabalha temas diferentes, com taxas de comissão
            variadas, mas não é nada que você não consiga lidar, eu garanto.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Confessa vai, você já tentou ser afiliado, mas  não deu muito certo né, ou não acredita que os infoprodutos
            realmente cumprem o que prometem, porém, por outro lado, também conhece as lojas que eu citei, já comprou
            nelas inclusive e sabe que elas realmente faturam bilhões todos os anos.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Ok, mas o que você está “tentando provar com isso tudo?” Só quero te mostrar que você não precisa ser um
            expert em internet ou em vendas, gastar milhares de reais em cursos que te ensinam a vender cursos, e não
            tem que montar toda uma mega estrutura digital com site, design, copy e vários outros detalhes que podem
            fugir das suas habilidades.
          </Text>
          <Heading
            padding={['2rem 0 0']}
            fontSize={['1.5rem', '2rem']}
            fontFamily={montserrat.style.fontFamily}
            color={'#2b2b2b'}
          >
            Conheça a Promogate
          </Heading>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Para isso existe a <a href='https://www.promogate.app' target='_blank'>Promogate</a>, que oferece uma
            plataforma gratuita onde você pode cadastrar os produtos das lojas que pretende vender, um site onde esses
            produtos serão apresentados e uma série de ferramentas para você compartilhar nas suas redes sociais ou
            seus canais de venda.
          </Text>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Tudo para facilitar sua vida como afiliado, e o melhor, <strong>você pode começar de graça!</strong>
          </Text>
          <Heading
            padding={['2rem 0 0']}
            fontSize={['2rem']}
            fontFamily={montserrat.style.fontFamily}
            color={'#2b2b2b'}
          >
            68 Programas de Marketing de Afiliados para começar em 2023
          </Heading>
          <OrderedList
            padding={['1rem']}
          >
            {storeLinks.map((link, i) => {
              return (
                <ListItem
                  key={i}
                >
                  <a href={link.destination} target='_blank' className='underline'>
                    {link.name}
                  </a>
                </ListItem>
              )
            })}
          </OrderedList>
          <Text
            fontWeight={'normal'}
            marginTop={['24px', '32px']}
            fontFamily={openSans.style.fontFamily}
          >
            Essa é uma pequena amostra do que você terá acesso tendo a <strong>Promogate</strong> como sua parceira de 
            negócios, são mais de 600 lojas em mais de 20 categorias.
          </Text>
        </Box>
      </Box>
      <HomeFooter />
    </>
  )
}