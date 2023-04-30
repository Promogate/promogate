import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })

type MainMenuProps = {
  isLogged: string | undefined
}

export function MainMenu({ isLogged }: MainMenuProps) {
  return (
    <Grid
      gridTemplateColumns={'auto 1fr auto'}
      height={'80px'}
      maxWidth={{ xl: '1250px' }}
      margin={'0 auto'}
      gap={'56px'}
    >
      <Box
        position={'relative'}
        height={'auto'}
        width={'120px'}
      >
        <Image src={'/promogate.svg'} alt={'Promogate logo'} fill />
      </Box>
      <Flex
        gap={'24px'}
        alignItems={'center'}
        color={'gray.600'}
      >
        <Box
          as={Link}
          href={'/nosso-objetivo'}
          fontFamily={inter.style.fontFamily}
        >
          Nosso objetivo
        </Box>
        <Box
          as={Link}
          href={'/ferramentas'}
          fontFamily={inter.style.fontFamily}
        >
          Ferramentas
        </Box>
      </Flex>
      <Flex
        gap={'16px'}
        alignItems={'center'}
        fontSize={'0.8rem'}
        color={'gray.500'}
      >
        {
          isLogged ? (
            <Flex
              fontFamily={inter.style.fontFamily}
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
            <>
              <Box
                as={Link}
                href={'/login'}
                fontFamily={inter.style.fontFamily}
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                Entrar
              </Box>
              <Box
                as={Link}
                href={'/cadastrar-se'}
                fontFamily={inter.style.fontFamily}
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                Cadastrar-se
              </Box>
            </>
          )
        }
      </Flex >
    </Grid >
  )
}