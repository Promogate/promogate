import { Offer } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

type OfferCardProps = {
  data: Offer
}

const inter = Inter({ subsets: ['latin'] });

/*eslint-disable @next/next/no-img-element*/
export function OfferCard({ data }: OfferCardProps) {


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
        <img src={data.image} alt={data.title} />
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
            fontSize={{ xl: '1rem' }}
            fontWeight={'medium'}
            color={'gray.600'}
            wordBreak={'break-word'}
            as={Link}
            href={`/redirecionar/produto/${data.id}`}
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
        <Button
          as={Link}
          href={`/redirecionar/produto/${data.id}`}
          target='_blank'
          width={'100%'}
          backgroundColor={'black'}
          _hover={{
            backgroundColor: 'black'
          }}
          color='white'
          rightIcon={<FiExternalLink />}
          fontFamily={inter.style.fontFamily}
        >
          Abrir na loja
        </Button>
      </Box>
    </Flex>
  )
}