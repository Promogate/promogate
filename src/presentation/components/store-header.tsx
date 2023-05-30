import { Box, Flex, Heading } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';

type StoreHeaderProps = {
  props: {
    store_image: string;
    store_name_display: string;
    store_name: string;
  }
}

const montserrat = Montserrat({ subsets: ['latin'], preload: true });

/*eslint-disable @next/next/no-img-element*/
export function StoreHeader({ props }: StoreHeaderProps) {
  return (
    <Box
      height={{ xl: '96px' }}
      backgroundColor={'black'}
    >
      <Flex
        as={Link}
        href={`/${props.store_name}`}        height={'100%'}
        width={['100%']}
        alignItems={'center'}
        maxWidth={{ xl: '1170px' }}
        margin={['0 auto']}
        gap={['1rem']}
      >
        <Heading
          as={'h1'}
          fontSize={['1.5rem']}
          fontFamily={montserrat.style.fontFamily}
          color={'gray.50'}
          textTransform={['capitalize']}
        >
          {props.store_name_display}
        </Heading>
      </Flex>
    </Box>
  )
}