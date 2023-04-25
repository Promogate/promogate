import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineApi } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { TbDiscount2 } from 'react-icons/tb';

export function DashboardMenu() {
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
      <Box
        padding={{ xl: '2rem 0' }}
      >
        <Heading
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={{ xl: '0.625rem' }}
          letterSpacing={{ xl: '2px' }}
          color={'gray.400'}
          paddingBottom={{ xl: '1rem' }}
        >
          Menu principal
        </Heading>
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
        </Flex>
      </Box>
    </Flex>
  )
}