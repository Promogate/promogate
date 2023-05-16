import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { Inter, Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] });

type MainMenuProps = {
  isLogged: boolean
}

export function MainMenu({ isLogged }: MainMenuProps) {
  return (
    <Grid
      gridTemplateColumns={'160px 1fr auto'}
      height={'104px'}
      alignItems={'center'}
      maxWidth={{ xl: '1170px' }}
      margin={'0 auto'}
      gap={'80px'}
    >
      <Box
        position={'relative'}
        height={'30px'}
        width={'160px'}
      >
        <Image src={'/promogate-logo.svg'} alt={'Promogate logo'} fill priority />
      </Box>
      <Flex fontFamily={montserrat.style.fontFamily} gap={{ xl: '48px' }} alignItems={'center'} fontWeight={'medium'}>
        <Text as={Link} href={'/quem-somos'}>
          Quem somos
        </Text>
        <Text as={Link} href={'/como-funciona'}>
          Como funciona
        </Text>
      </Flex>
      <Flex
        gap={'16px'}
        alignItems={'center'}
        fontSize={'0.8rem'}
        color={'gray.500'}
        width={'100%'}
        justifyContent={'flex-end'}
      >
        {
          isLogged ? (
            <Flex
              fontFamily={montserrat.style.fontFamily}
              fontSize={{ xl: '0.825rem' }}
              gap={'2px'}
              alignItems={'center'}
              margin={{ xl: '0.5rem 0 0 0' }}
            >
              <Text>Você está logado. Ir para o </Text>
              <Text
                as={Link} href={'/dashboard'}
                fontWeight={'semibold'}
                color={'#571770'}
                display={'flex'}
                alignItems={'center'}
              >
                Dashboard
                <BsArrowRightShort />
              </Text>
            </Flex>
          ) : (
            <Flex gap={{ xl: '24px' }} width={'100%'} justifyContent={'flex-end'} alignItems={'center'}>
              <Box
                as={Link}
                href={'/login'}
                fontFamily={montserrat.style.fontFamily}
                fontSize={{ xl: '1rem' }}
                color={'#2b2b2b'}
                fontWeight={'bold'}
              >
                Entrar
              </Box>
              <Button as={Link} href={'/cadastrar-se'} fontFamily={montserrat.style.fontFamily}
                fontSize={{ xl: '1rem' }} color={'#2b2b2b'} variant={'outline'} fontWeight={'bold'}
                borderColor={'#2b2b2b'}
              >
                Cadastrar-se
              </Button>
            </Flex>
          )
        }
      </Flex >
    </Grid >
  )
}