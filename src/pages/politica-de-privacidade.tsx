import { HomeFooter, MainMenu } from '@/presentation/components';
import { Box, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
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

const PrivacyPolicies = ({ isLogged }: PageProps) => {
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
          Política de Privacidade
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate se empenha em manter a privacidade dos nossos usuários, tanto dos nossos assinantes (Afiliados)
          quanto dos usuários que visitam seus sites. Aqui estabelecemos nossas práticas de coleta e compartilhamento
          de dados pessoais para a melhor prestação dos nossos serviços, com o objetivo de informar sobre o destino do
          uso dos seus dados pessoais e quaisquer informações que coletamos.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Informações coletadas:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Os tipos de informações pessoais que coletamos dos usuários são: nomes, endereços de e-mail, informações de
          contato, informações demográficas, fotos, outros tipos de dados (coletados através dos cookies).
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Salvo casos em contrário, os dados solicitados são obrigatórios e a utilização dos serviços oferecidos serão
          comprometidas caso esses dados não sejam fornecidos.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Cada usuário é responsável pelos dados pessoais ou de terceiros publicados ou compartilhados em nossa
          plataforma e confirmam que detém o consentimento para fornecê-los.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          As informações a seguir jamais serão coletadas por nossa plataforma, tanto pela Promogate quanto pelos seus
          assinantes e em hipótese alguma devem ser compartilhados:
        </Text>
        <UnorderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            Informações financeiras (dados bancários ou de cartão de crédito);
          </ListItem>
          <ListItem>
            Registros de Documentos (RG, CPF, CNH, Passaporte e semelhantes);
          </ListItem>
          <ListItem>
            Endereço residencial e/ou profissional.
          </ListItem>
        </UnorderedList>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Caso seja menor de 18 anos, não insira seus dados pessoais ainda que requeridos para o uso da plataforma,
          caso queira fazer uso dos serviços da plataforma e de seus assinantes solicite a seus pais (ou responsável
          legal) que faça isso por você.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Os Cookies (e demais ferramentas de rastreamento) utilizados pela Promogate, próprios ou de terceiros, tem
          como objetivo fornecer o melhor serviço para o usuário.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Compartilhamento de dados:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Todos os dados pessoais são coletados, são compartilhados com nosso provedor em nuvem com o objetivo único de
          armazenamento, para fornecer adequadamente nossos serviços, personalizar experiências, enviar comunicações de
          marketing, melhorar o site, com redes sociais através de campanhas de publicidade e para cumprir obrigações
          legais.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          O compartilhamento das informações pessoais com terceiros, como redes de afiliados, podem se fazem
          necessários dado o modelo de negócios a que a Promogate se destina.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Segurança de dados:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Tomamos todas as medidas de segurança necessárias para proteger as informações pessoais dos usuários contra
          acesso não autorizado, divulgação, alteração ou destruição.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Na Promogate, os dados pessoais dos assinantes e usuários podem ser acessados somente para operações
          estritamente relacionadas à finalidades indicadas e apenas por profissionais diretamente envolvidos nessas
          operações (administração, jurídico e administração do sistema) ou por terceiros (provedores de serviços
          terceirizados, provedores de hospedagem) e somente quando solicitado pelos assinantes.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A lista desses provedores pode ser solicitada a qualquer momento pelo titular dos dados.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Direitos dos usuários:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Todo usuário tem o direito e pode, a qualquer tempo, solicitar acesso a quais dados pessoais a plataforma
          detém, incluindo o direito a: retificação, exclusão, restrição de processamento e objeção ao processamento.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Direitos dos Titulares de dados
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          O titular dos dados pessoais tem direito a obter do controlador, em relação aos dados do titular por ele
          tratados, a qualquer momento e mediante requisição:
        </Text>
        <OrderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            Confirmação da existência de tratamento;
          </ListItem>
          <ListItem>
            Acesso aos dados;
          </ListItem>
          <ListItem>
            Correção de dados incompletos, inexatos ou desatualizados;
          </ListItem>
          <ListItem>
            Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade
            com o disposto nesta Lei;
          </ListItem>
          <ListItem>
            Portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa, de acordo
            com a regulamentação da  autoridade nacional, observados os segredos comercial e industrial;
          </ListItem>
          <ListItem>
            Eliminação dos dados pessoais tratados com o consentimento do titular, exceto nas hipóteses previstas no
            art. 16 da Lei Geral de Proteção de Dados Pessoais;
          </ListItem>
          <ListItem>
            Informação das entidades públicas e privadas com as quais o controlador realizou uso compartilhado de dados;
          </ListItem>
          <ListItem>
            Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;
          </ListItem>
          <ListItem>
            Revogação do consentimento, nos termos do § 5o do art. 8o da Lei Geral de Proteção de Dados Pessoais.
          </ListItem>
        </OrderedList>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Seu exercício desses direitos está sujeito a certas isenções para salvaguardar o interesse público e nossos
          interesses. Se você exercer algum desses direitos, verificaremos essas exceções e responderemos oportunamente
          ao seu pedido.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          O Usuário fica ciente de que a exclusão das informações essenciais para gestão de sua conta junto a Promogate
          implicará no término de seu cadastro, com consequente cancelamento dos serviços então prestados.
        </Text>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Se você não estiver satisfeito com nosso uso de seus dados pessoais ou nossa resposta a qualquer exercício
          destes direitos, você tem o direito de reclamar junto à Autoridade Brasileira de Proteção de Dados (ANPD).
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Cookies e tecnologias de rastreamento:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Os Cookies e ferramentas de rastreamento, tanto próprias quanto de terceiros são usados para coletar
          informações sobre o uso do site e personalizar a experiência do usuário. Abaixo, listamos os principais
          Cookies utilizados na nossa plataforma e a finalidade deles:
        </Text>
        <UnorderedList
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
          paddingLeft={{ xl: '2rem' }}
        >
          <ListItem>
            Cookies analíticos e de desempenho: Google Firebase | Google Analitycs;
          </ListItem>
          <ListItem>
            Cookies de personalização: Optimize | HotJar | Appsflyer;
          </ListItem>
          <ListItem>
            Cookies de publicidade e redes sociais: Facebook Pixel | Google AdSense | Google AdManager.
          </ListItem>
        </UnorderedList>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Retenção de dados:
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          Mantemos os dados pessoais na nossa base de dados pelo tempo necessário para a finalidade as quais foram
          coletados e demais finalidades permitidas a fim de cumprir requisitos regulatórios. Dados pessoais que não
          são mais necessários são destruídos com segurança de acordo com a política vigente.
        </Text>
        <Heading
          fontSize={'1.5rem'}
          fontFamily={montserrat.style.fontFamily}
          marginTop={[0, '32px', '56px']}
          color={'#2b2b2b'}
        >
          Histórico de Alterações da Política
        </Heading>
        <Text
          fontWeight={'normal'}
          marginTop={['24px', '32px']}
          fontFamily={openSans.style.fontFamily}
        >
          A Promogate se reserva ao direito de alterar, a qualquer tempo, o conteúdo dos nossos sites, o uso de Cookies, 
          essa Política de Privacidade, a Política de Cookies, bem como adicionar ou excluir novas páginas e 
          funcionalidades que afetem essa Política de Privacidade. Em caso de alterações, tomaremos as medidas 
          necessárias para que os assinantes sejam notificados e caso as alterações desta Política de Privacidade seja 
          relevante, atualizaremos a data em que a alteração foi feita e a notificação foi efetuada.
        </Text>
      </Box>
      <HomeFooter />
    </>
  )
}

export default PrivacyPolicies