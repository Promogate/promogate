import { Offer } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

type OfferCardProps = {
  data: Offer;
  storeName: string;
}

const inter = Inter({ subsets: ['latin'] });

/*eslint-disable @next/next/no-img-element*/
export function OfferCard({ data, storeName }: OfferCardProps) {
  return (
    <Flex
      boxShadow={{ xl: 'lg' }}
      borderRadius={{ xl: 'lg' }}
      padding={{ xl: '1rem' }}
      backgroundColor={'white'}
      minHeight={{ xl: '360px' }}
      flexDirection={'column'}
      _hover={{
        transform: 'scale(1.025)',
      }}
      transition={'175ms ease-in-out'}
    >
      <Box
        borderRadius={{ xl: '1rem' }}
        overflow={'hidden'}
      >
        <Link
          href={`/v/${storeName}/produto/${data.id}`}
        >
          <img src={data.image} alt={data.title} />
        </Link>
      </Box>
      <Box
        flex={1}
        marginTop={{ xl: '1rem' }}
        display={'flex'}
        flexDirection={'column'}
      >
        <Box flex={1}>
          <Heading
            fontFamily={inter.style.fontFamily}
            fontSize={{ xl: '14px' }}
            fontWeight={'medium'}
            color={'gray.700'}
            wordBreak={'break-word'}
            as={Link}
            href={`/v/${storeName}/produto/${data.id}`}
            target='_blank'
          >
            {data.title}
          </Heading>
        </Box>
        <Heading
          as={'span'}
          fontFamily={inter.style.fontFamily}
          fontSize={{ xl: '1rem' }}
          fontWeight={'medium'}
          color={'gray.600'}
          wordBreak={'break-word'}
          margin={{ xl: '1rem 0' }}
        >
          {parseCurrency(data.price)}
        </Heading>
      </Box>
    </Flex>
  )
}