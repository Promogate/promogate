import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineApi } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { TbDiscount2 } from 'react-icons/tb';

export function DashboardMenu() {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      flexDirection={'column'}
      padding={{ lg: '2rem 2rem' }}
    >
      <Box
        width={'150px'}
        height={'37px'}
        position={'relative'}
      >
        <Image
          src='/promogate.png'
          alt='Logo Promogate'
          fill
        />
      </Box>
      <Box
        padding={{ lg: '2rem 0' }}
      >
        <Heading
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={{ lg: '0.625rem' }}
          letterSpacing={{ lg: '2px' }}
          color={'gray.400'}
          paddingBottom={{ lg: '1rem' }}
        >
          Menu principal
        </Heading>
        <Flex
          flexDirection={'column'}
          gap={{ lg: '16px' }}
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