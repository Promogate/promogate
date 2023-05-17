import { HomeFooter, MainMenu } from '@/presentation/components';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { parseCookies } from 'nookies';

type PageProps = {
  isLogged: boolean
}

const montserrat = Montserrat({ subsets: ['latin'], preload: true });
const openSans = Open_Sans({ subsets: ['latin'], preload: true });

export default function HowItWorks({ isLogged }: PageProps) {
  return (
    <>
      <Head>
        <title>Promogate - Como funciona</title>
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box
        as='main'
        maxWidth={['1170px']}
        margin={['0 1rem', '0 auto']}
        fontSize={['21px', '1.175rem']}
      >
        <Heading fontSize={['3rem', '3rem', '5rem']} fontFamily={montserrat.style.fontFamily} marginTop={['32px']}
          color={'#2b2b2b'} textAlign={'center'}>
          Como funciona?
        </Heading>
        <Grid gridTemplateColumns={{ xl: '1fr 1fr' }}>
          <Box display='grid' placeItems={'center'}>
            <Box width={['360px', '512px']} height={['360px', '512px']} position={'relative'}>
              <Image src='/passo_01.webp' alt='Passo 1' fill />
            </Box>
          </Box>
          <Flex flexDirection={'column'} alignSelf={'center'} justifyContent={'center'} height={'100%'}>
            <Heading
              fontSize={'2rem'}
              fontFamily={montserrat.style.fontFamily}
              marginTop={[0, '32px', '56px']}
              color={'#2b2b2b'}
            >
              Cadastro simplificado e definição do nome da loja.
            </Heading>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Com o cadastro simplificado, precisamos apenas de um e-mail válido e uma senha, em seguida escolha um
              nome (ela estará também no endereço da sua vitrine na internet) e você pode também escolher uma logo para
              sua loja, mas isso é opcional.
            </Text>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Já no painel, na aba <span className='font-bold'>Configurações</span>, você pode incluir a logo, caso não
              tenha feito no cadastro, ou alterar tanto a logo quanto no nome da loja (isso pode afetar seus links
              afiliados), é possível também incluir os links das suas redes sociais (Instagram, Facebook e Twitter) e
              canais de divulgação (Grupo de Whatsapp e Telegram).
            </Text>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Nessa aba você poderá também escolher as cores padrão da sua vitrine entre as 05 opções de cores
              disponíveis
            </Text>
          </Flex>
        </Grid>
        <Grid gridTemplateColumns={{ xl: '1fr 1fr' }}>
          <Box display='grid' placeItems={'center'}>
            <Box width={['360px', '512px']} height={['360px', '512px']} position={'relative'}>
              <Image src='/passo_02.webp' alt='Passo 1' fill />
            </Box>
          </Box>
          <Flex flexDirection={'column'} alignSelf={'center'} justifyContent={'center'} height={'100%'}>
            <Heading
              fontSize={'2rem'}
              fontFamily={montserrat.style.fontFamily}
              marginTop={[0, '32px', '56px']}
              color={'#2b2b2b'}
            >
              Cadastro das ofertas e definição do destaque e vitrine.
            </Heading>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Feito o cadastro da loja, o próximo passo é cadastrar as ofertas e cupons que você pretende promover.
              A princípio o cadastro é feito manualmente, incluindo informações como:
            </Text>
            <UnorderedList fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}
              paddingLeft={{ xl: '2rem' }}>
              <ListItem>
                Link da Imagem;
              </ListItem>
              <ListItem>
                Título da oferta;
              </ListItem>
              <ListItem>
                Valor <span className='font-bold'>sem</span> desconto (opcional);
              </ListItem>
              <ListItem>
                Valor <span className='font-bold'>com desconto</span>;
              </ListItem>
              <ListItem>
                Descrição;
              </ListItem>
              <ListItem>
                Data de validade (por padrão as ofertas tem validade de 30 dias);
              </ListItem>
              <ListItem>
                Link afiliado.
              </ListItem>
            </UnorderedList>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              <span className='font-bold'>Não</span> há limite para o cadastro de ofertas, contudo você precisará
              escolher 10 delas para mostrar no destaque (essa ação é opcional) e um limite de 50 ofertas para apresentar
              na vitrine.
            </Text>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Você poderá editar as informações das ofertas sempre que necessário.
            </Text>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              Você poderá alterar a qualquer tempo quais ofertas serão apresentadas no destaque e na vitrine, dentro
              dos limites estabelecidos.
            </Text>
          </Flex>
        </Grid>
        <Grid gridTemplateColumns={{ xl: '1fr 1fr' }}>
          <Box display='grid' placeItems={'center'}>
            <Box width={['360px', '512px']} height={['360px', '512px']} position={'relative'}>
              <Image src='/passo_03.webp' alt='Passo 1' fill />
            </Box>
          </Box>
          <Flex flexDirection={'column'} alignSelf={'center'} justifyContent={'center'} height={'100%'}>
            <Heading
              fontSize={'2rem'}
              fontFamily={montserrat.style.fontFamily}
              marginTop={[0, '32px', '56px']}
              color={'#2b2b2b'}
            >
              Compartilhamento nas redes sociais usando as ferramentas da plataforma.
            </Heading>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              <span className='font-bold'>TODAS</span> as ofertas cadastradas (independente de estarem visíveis na
              vitrine) podem ser compartilhadas por você diretamente do painel administrativo ou por seus visitantes
              nas páginas individuais dos produtos.
            </Text>
            <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
              A Promogate não restringe ou limita o compartilhamento das ofertas,
              contudo é preciso estar atento às regras de compartilhamento dos canais de divulgação. A Promogate não se
              responsabiliza por punições, banimentos ou sanções aplicadas por parte dos canais de divulgação.
            </Text>
          </Flex>
        </Grid>
        <Box margin={['2rem 0', '0 auto']} maxWidth={{ xl: '900px' }}>
          <Heading
            fontSize={'2rem'}
            fontFamily={montserrat.style.fontFamily}
            marginTop={[0, '32px', '56px']}
            color={'#2b2b2b'}
          >
            Para quem é a Promogate?
          </Heading>
          <Text fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}>
            É pra você:
          </Text>
          <UnorderedList fontWeight={'normal'} marginTop={['1rem']} fontFamily={openSans.style.fontFamily}
            paddingLeft={{ xl: '2rem' }}>
            <ListItem>
              Que está vendendo pelo WhatsApp e Direct;
            </ListItem>
            <ListItem>
              Que não sabe como criar ou não pode investir numa estrutura própria;
            </ListItem>
            <ListItem>
              Que deseja começar a vender online;
            </ListItem>
            <ListItem>
              Que busca vender automaticamente.
            </ListItem>
          </UnorderedList>
        </Box>
        <Box margin={['80px 0', '104px auto 0 auto']} maxWidth={{ xl: '900px' }}>
          <Heading
            fontSize={'2rem'}
            fontFamily={montserrat.style.fontFamily}
            marginTop={[0, '32px', '56px']}
            textAlign={['center', 'left']}
            color={'#2b2b2b'}
          >
            FAQ
          </Heading>
          <Accordion margin={['2rem 0']} maxWidth={{ xl: '900px' }} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Como posso criar um site na Promogate?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                O cadastro na plataforma é simplificado, tudo o que você precisa é de um e-mail e senha, escolher um
                nome para sua loja e uma imagem para logo, o site é criado automaticamente.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  A Promogate é uma plataforma paga?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Você pode começar a usar a Promogate gratuitamente. Nenhuma informação de cartão de crédito é necessária,
                o que significa que você não será cobrado por utilizar a plataforma. Recursos PRO ficarão disponíveis
                em breve e serão cobrados à parte após a contratação dos mesmos.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Preciso comprar hospedagem e um domínio com certificado SSL para o meu site?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Não, você não precisa comprar hospedagem. Hospedamos seus sites para você (em nuvem). Também fornecemos
                um certificado SSL para todos os sites criados na Promogate gratuitamente.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Quantos sites posso criar em um plano gratuito?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Você pode criar quantos sites gratuitos precisar, contudo, cada site requer um cadastro individual.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Quantos produtos posso cadastrar?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Você pode adicionar quantos produtos desejar. Além disso, não terá nenhum limite nas vendas e visitas
                em seu site.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Posso integrar a Promogate ao meu site existente?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Essa funcionalidade estará disponível em breve, você poderá criar um site usando a estrutura que
                desejar e usar a Promogate como plataforma para gerir suas ofertas.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Preciso entender de tecnologia para montar meu site na Promogate?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Não precisa! Nossa plataforma é extremamente intuitiva e feita da forma mais simples para você conseguir
                montar seu site com tranquilidade. Caso tenha alguma dúvida, basta chamar nosso suporte que vamos te
                ajudar da melhor forma.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Quanto tempo preciso para criar o meu site?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                Em 5 minutos você já poderá estar com a sua loja rodando em todo Brasil.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box as='span' flex={'1'} textAlign={'left'} fontFamily={montserrat.style.fontFamily}
                  fontSize={['1.2rem']} fontWeight={['bold', 'medium']}>
                  Quanto da minha comissão a Promogate recebe?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel fontFamily={openSans.style.fontFamily}>
                A Promogate não é uma rede de afiliados, é simplesmente uma plataforma com painel administrativo e um
                site, gratuitos, para você divulgar suas ofertas e promoções, portanto não gerimos, recebemos,
                repassamos, integral ou parcialmente as comissões sobre as vendas dos afiliados. Esse processo é feito
                diretamente entre o afiliado e a rede/anunciante.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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