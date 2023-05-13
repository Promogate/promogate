import { MeResponse } from '@/domain/models';
import { Badge, Box, Flex } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiNetworkChart } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbDiscount2, TbPlugConnected } from 'react-icons/tb';

const inter = Inter({ subsets: ['latin'] })

type DashboardMenuProps = {
  me: MeResponse | undefined
}

export function DashboardMenu({ me }: DashboardMenuProps) {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, 'promogate.token');
    router.push('/login');
  }

  return (
    <Flex
      height={'100vh'}
      flexDirection={'column'}
      padding={{ xl: '2rem 2rem' }}
      position={'fixed'}
      fontFamily={inter.style.fontFamily}
    >
      <Box
        width={'120px'}
        height={'32px'}
        position={'relative'}
      >
        <Image
          src='/promogate.svg'
          alt='Logo Promogate'
          fill
        />
      </Box>
      <Flex
        padding={{ xl: '2rem 0' }}
        flexDirection={'column'}
        justifyContent={'space-between'}
        height={'100vh'}
        fontSize={{ xl: '0.8rem' }}
      >
        <Flex
          flexDirection={'column'}
          gap={{ xl: '16px' }}
        >
          <Flex
            as={Link}
            href={'/dashboard'}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
          >
            <RxDashboard />
            Dashboard
          </Flex>
          <Flex
            as={Link}
            href={'/dashboard/promocoes'}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
          >
            <TbDiscount2 />
            Promoções
          </Flex>
          <Flex
            alignItems={'center'}
            gap={'8px'}
            color={'gray.300'}
          >
            <TbPlugConnected />
            Categorias
            <Badge ml='1' colorScheme='yellow'>
              Em breve
            </Badge>
          </Flex>
          <Flex
            alignItems={'center'}
            gap={'8px'}
            color={'gray.300'}
          >
            <TbPlugConnected />
            API
            <Badge ml='1' colorScheme='yellow'>
              Em breve
            </Badge>
          </Flex>
          <Flex
            alignItems={'center'}
            gap={'8px'}
            color={'gray.300'}
          >
            <BiNetworkChart />
            Integrações
            <Badge ml='1' colorScheme='yellow'>
              Em breve
            </Badge>
          </Flex>
          <Flex
            alignItems={'center'}
            gap={'8px'}
            color={'gray.300'}
          >
            <AiOutlineWhatsApp />
            Whatsapp
            <Badge ml='1' colorScheme='yellow'>
              Em breve
            </Badge>
          </Flex>
        </Flex>
        <Flex
          padding={{ xl: '2rem 0' }}
          flexDirection={'column'}
          gap={{ xl: '16px' }}
          marginTop={'1'}
        >
          <Flex
            as={Link}
            href={`/dashboard/configuracoes`}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
            cursor={'pointer'}
          >
            <BsGear />
            Configurações
          </Flex>
          <Flex
            as={Link}
            href={`/${me?.user.user_profile.store_name}`}
            target='_blank'
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
            cursor={'pointer'}
          >
            <FiExternalLink />
            Ver loja
          </Flex>
          <Flex
            onClick={handleLogout}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
            cursor={'pointer'}
          >
            <RiLogoutCircleLine />
            Sair
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}