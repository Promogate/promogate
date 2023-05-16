import {
  Box, Grid, GridItem,
  HStack,
  Text
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const openSans = Open_Sans({ subsets: ['latin'], preload: true })

export function HomeFooter() {
  const currentYear = dayjs().year();
  const router = useRouter();

  return (
    <Box backgroundColor={'#fafafa'}>
      <Grid gridTemplateColumns={{ xl: '2fr repeat(3, 1fr)' }} maxWidth={{ xl: '1170px' }} margin={'144px auto 0'}
        padding={{ xl: '40px 0' }} alignItems={'center'}>
        <GridItem>
          <Box
            position={'relative'}
            height={'30px'}
            width={'160px'}
          >
            <Image src={'/promogate-logo.svg'} alt={'Promogate logo'} fill priority />
          </Box>
          <Text fontWeight={'normal'} marginTop={{ xl: '2rem' }} width={{ xl: '80%' }} fontFamily={openSans.style.fontFamily}>
            Promogate é uma plataforma gratuita com o objetivo de ajudar afiliados a construir seus primeiros canais
            de divulgação. Criando uma estrutura digital, acompanhamento de performance e compartilhamento social.
          </Text>
        </GridItem>
        <GridItem display='flex' flexDirection={'column'} gap={{ xl: '1rem' }}>
          <Text as={Link} href={'/quem-somos'}>
            Quem somos
          </Text>
          <Text as={Link} href={'/como-funciona'}>
            Como funciona?
          </Text>
        </GridItem>
        <GridItem display='flex' flexDirection={'column'} gap={{ xl: '1rem' }}>
          <Text as={Link} href={'/politica-de-privacidade'}>
            Política de Privacidade
          </Text>
          <Text as={Link} href={'/termos-de-uso'}>
            Termos de Uso
          </Text>
        </GridItem>
        <GridItem>
          <HStack gap={{ xl: '1rem' }}>
            <Text as='a' href={'https://facebook.com.br'} target='_blank'>
              <FaFacebook size={24} />
            </Text>
            <Text as='a' href={'https://linkedin.com.br'} target='_blank'>
              <FaLinkedin size={24} />
            </Text>
            <Text as='a' href={'https://instagram.com.br'} target='_blank'>
              <FaInstagram size={24} />
            </Text>
          </HStack>
        </GridItem>
      </Grid>
      <Box textAlign={'center'} padding={{ xl: '2rem 0' }}>
        <Text as='span' fontFamily={openSans.style.fontFamily} fontSize={{ xl: '0.825rem' }}>
          {currentYear} &copy; Promogate. Todos os direitos reservados.
        </Text>
      </Box>
    </Box>
  )
}