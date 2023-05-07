import { PromogateContext } from '@/application/contexts';
import { Badge, Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { useContext } from 'react';
import { AiOutlineApi, AiOutlineWhatsApp } from 'react-icons/ai';
import { BiNetworkChart } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbDiscount2 } from 'react-icons/tb';

export function DashboardMenu() {
  const router = useRouter();

  const { user } = useContext(PromogateContext)

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
        height={'100%'}
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
            as={Link}
            href={'/dashboard/api'}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
          >
            <AiOutlineApi />
            API
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
            href={`/v/${user?.user_profile.store_name}`}
            alignItems={'center'}
            gap={'8px'}
            color={'gray.600'}
            cursor={'pointer'}
          >
            <FiExternalLink />
            Vitrine
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