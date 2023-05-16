import {
  Button,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';
import {
  Montserrat,
  Open_Sans
} from 'next/font/google';
import { useRouter } from 'next/router';

const openSans = Open_Sans({ subsets: ['latin'], preload: true });
const montserrat = Montserrat({ subsets: ['latin'], preload: true });

export function Hero() {
  const router = useRouter();

  return (
    <Flex paddingRight={{ xl: '320px' }} flexDirection={'column'} gap={{ xl: '32px' }} color={'#2b2b2b'}
      backgroundImage={'/hero_image.svg'} backgroundRepeat={'no-repeat'} backgroundSize={'500px'}
      backgroundPosition={'right'}>
      <Heading as='h1' fontSize={{ xl: '5rem' }} fontFamily={montserrat.style.fontFamily}>
        Sua estrutura digital como afiliado, <Text as={'span'} color={'#5528FF'}>gratuita</Text>.
      </Heading>
      <Text fontFamily={openSans.style.fontFamily} fontSize={{ xl: '21px' }} width={{ xl: '80%' }}>
        Nunca foi tão fácil ter uma estrutura digital para divulgar os produtos
        e lojas que você é afiliado. Tenha um painel administrativo fácil de gerir
        e um site somente para você.
      </Text>
      <Button maxWidth={'max-content'} backgroundColor={'#5528FF'} _hover={{ backgroundColor: '#5528FF' }}
        color={'white'} onClick={() => router.push('/cadastrar-se')}>
        Começar agora!
      </Button>
    </Flex>
  )
}