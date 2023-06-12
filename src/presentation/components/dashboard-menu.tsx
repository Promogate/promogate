import { MeResponse } from '@/domain/models';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { BsGear } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbDiscount2 } from 'react-icons/tb';
import { DashboardNavigationLinks } from './dashboardNavigationLink';

const inter = Inter({ subsets: ['latin'] })

type DashboardMenuProps = {
  me: MeResponse | undefined
}

const links = [
  {
    name: 'Dashboard',
    destination: '/dashboard',
    icon: <RxDashboard />
  },
  {
    name: 'Promoções',
    destination: '/dashboard/promocoes',
    icon: <TbDiscount2 />
  },
]

export function DashboardMenu({ me }: DashboardMenuProps) {
  const router = useRouter();
  const toast = useToast();

  const handleLogout = () => {
    try {
      destroyCookie(null, 'promogate.token');
    } catch {
      toast({
        status: 'error',
        description: 'Erro eu tentar fazer logout'
      })
    } finally {
      router.push('/login');
    }
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
          src='/promogate-logo.svg'
          alt='Logo Promogate'
          fill
        />
      </Box>
      <Flex
        padding={['2rem 0']}
        flexDirection={'column'}
        justifyContent={'space-between'}
        height={'100vh'}
        fontSize={{ xl: '0.8rem' }}
      >
        <DashboardNavigationLinks links={links} />
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