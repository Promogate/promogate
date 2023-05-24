import { HomeFooter, MainMenu } from '@/presentation/components';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Head from 'next/head';
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

const TermsOfUser = ({ isLogged }: PageProps) => {
  return (
    <>
      <Head>
        <title>Promogate - Políticas de Privacidade</title>
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
          Termos de Uso
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Essa página de Termos de Uso aborda uma série de tópicos importantes para estabelecer as regras e diretrizes
          de uso da plataforma Promogate, por seus assinantes, bem como o acesso aos sites pelos seus usuários das
          lojas derivadas dela.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Aceitação dos termos
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A utilização da plataforma implica a imediata aceitação dos Termos de Uso aqui descritos.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Os Termos de Uso aqui descritos, regulam contratualmente a relação entre a Promogate e o assinante e devem
          ser entendidos como licença para uso da plataforma.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Ao se cadastrar na plataforma, o assinante declara claramente que o uso do site está sujeito aos termos e
          condições estabelecidos e que o visitante concorda em cumpri-los.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Propriedade intelectual
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate é quem possui os direitos autorais e outros direitos de propriedade intelectual relacionados ao
          conteúdo da plataforma, salvo o que se refere aos direitos de uso e compartilhamento das marcas promovidas
          pela Promogate e seus assinantes, que se comprometem em atender a regulamentação determinada por cada rede e
          anunciante aqui promovidos. Isso pode incluir textos, imagens, vídeos, logotipos e outros elementos.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Uso adequado do site
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Todo assinante se compromete a atender as regras sobre o uso adequado do site, incluindo restrições sobre
          atividades ilegais, abusivas, difamatórias, ofensivas, spam ou violações de direitos autorais.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate é uma plataforma virtual de divulgação de anúncios de ofertas, descontos e promoções de lojas
          online, feitas pelos seus assinantes.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Limitações de responsabilidade
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Sendo uma plataforma de divulgação, a Promogate não se responsabiliza por compras, qualidade dos produtos,
          execução de prazos de entrega ou transação realizada entre os usuários e os anunciantes.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A plataforma é fornecida {`"no estado em que se encontra "`}e a Promogate não é responsável por quaisquer danos,
          perdas ou inconveniências decorrentes do uso inadequado ou da incapacidade de uso do site, bem como das
          informações compartilhadas por seus assinantes em relação às redes e anunciantes.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Ao clicar num link afiliado para a loja do anunciante, uma nova e direta relação jurídica é criada entre
          usuário e anunciante, isentando a Promogate de qualquer responsabilidade comercial e jurídica.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          As informações contidas nos anúncios, ofertas e cupons divulgados nos sites derivados da Promogate, tais como
          preço, validade, prazo de entrega, características do produto e demais informações, são de responsabilidade
          do assinante, contudo, cabe ao usuário verificar a veracidade das mesmas diretamente no site do anunciante.
          A Promogate não se responsabiliza pelas informações contidas nos anúncios, ofertas e cupons.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Links para sites de terceiros
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          É vedado o compartilhamento de links para outros sites de terceiros e a Promogate não tem controle sobre o
          conteúdo ou as práticas desses sites.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Essa regra não se aplica aos links das redes sociais disponíveis nos sites, bem como os links afiliados,
          todos previamente cadastrados na plataforma.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Sobre a identidade do usuário
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          O assinante se responsabiliza pela veracidade e atualização das informações de cadastro, bem como suas
          informações de acesso (login e senha).
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate se reserva ao direito de revelar a identidade dos usuários em caso de queixas formais ou ação
          judicial causada pelo mau uso da plataforma por parte do assinante e/ou do usuário.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Em caso de suspeitas de irregularidade, a Promogate detém o direito ao bloqueio e, se for o caso, total
          remoção da conta do assinante.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Sobre o conteúdo das ofertas, cupons e anúncios e os comentários sobre os mesmos
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate não tem responsabilidade sobre: preço, validade, prazo de entrega, características do produto e
          demais informações, divulgadas pelo seus assinantes. As publicações que estiverem em desacordo com esses
          Termos de Uso ou que ferirem a Política de Privacidade ou legislação vigente serão prontamente removidos da
          plataforma sem qualquer aviso prévio, e o responsável sofrerá sanções que vão desde a suspensão temporária do
          site, até a total remoção do cadastro.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Todo o conteúdo presente nas ofertas, cupons e anúncios promovidas pela plataforma são de responsabilidade
          de seus autores.
        </Text>
        <Text
          fontWeight={'bold'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          É proibido, e passível de punição:
        </Text>
        <UnorderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            Conteúdo falso, difamatório, discriminatório, abusivo, vulgar, de caráter pornográfico, que invada a
            privacidade de terceiros ou que viole parcial ou integralmente às leis brasileiras e internacionais;
          </ListItem>
          <ListItem>
            Conteúdo que contenha publicidade não autorizada, sem sentido, repetitiva e esquemas de pirâmide;
          </ListItem>
          <ListItem>
            Conteúdos que induzam, incitem ou promovam atos ilegais, violentos ou contrários à lei, à moral e aos bons
            costumes;
          </ListItem>
          <ListItem>
            Conteúdo que divulgue ou faça uso de pirataria, tais como: copiar, reproduzir, alterar e/ou comercializar
            quaisquer produtos sem a devida autorização de seu criador, infringindo a Lei de Direitos Autorais brasileira
            ou internacional;
          </ListItem>
          <ListItem>
            Conteúdo que direcione o usuário para sites piratas ou de conteúdo não idôneo;
          </ListItem>
          <ListItem>
            Conteúdo que ataque a fé, religiosidade, sexualidade, condição física, etnia e/ou visão política;
          </ListItem>
          <ListItem>
            Divulgar links ou informações visando únicamente a publicidade de um site, produto ou serviço, direta ou
            indiretamente para o usuário ou pessoas próximas a ele;
          </ListItem>
          <ListItem>
            Copiar parcial ou integralmente, o conteúdo e/ou as funcionalidades da Promogate sem a expressa autorização
            dos responsáveis;
          </ListItem>
          <ListItem>
            Utilização de crawlers, bots, mecanismos de disparo em massa para envio de conteúdo, ou ainda qualquer
            software ou sistema que tenha por finalidade distribuir conteúdo ou obter informações sobre os usuários.
          </ListItem>
        </UnorderedList>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Fica a critério da Promogate avaliar e decidir sobre a violação por parte do assinante e dos usuários a 
          estas normas, bem como a aplicação da punição cabível.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Compartilhamento de conteúdo
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Ao se cadastrar na plataforma, o assinante e usuários declaram que concordam com o compartilhamento dos seus 
          sites e conteúdos por parte da Promogate, em todos os seus canais de comunicação. Isso se aplica aos seguintes 
          conteúdos: site do assinante (total ou parcialmente), promoções e ofertas, comentários em qualquer área do 
          site, post no blog e comunicações ao suporte.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Todos os compartilhamentos de conteúdo serão devidamente identificados pelo assinante ou usuário que a 
          produziu.
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
          Ao se cadastrar na plataforma, o assinante declara claramente que leu e concorda com a  Política de 
          Privacidade (link de redirecionamento) da Promogate, onde explicamos como as informações pessoais são 
          coletadas, usadas, armazenadas e protegidas.
        </Text>

        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Alterações nos termos
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate se reserva ao direito de fazer alterações nos Termos de Uso a qualquer momento e é de 
          responsabilidade do usuário revisar periodicamente essas mudanças.
        </Text>
      </Box>
      <HomeFooter />
    </>
  )
}

export default TermsOfUser