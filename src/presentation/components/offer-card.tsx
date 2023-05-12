import { OfferWithClicks } from '@/domain/models';
import { parseCurrency } from '@/main/utils';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

type OfferCardProps = {
  data: OfferWithClicks;
  storeName: string;
}

const inter = Inter({ subsets: ['latin'] });

/*eslint-disable @next/next/no-img-element*/
export function OfferCard({ data, storeName }: OfferCardProps) {
  const store = storeName.toLocaleLowerCase().replace(' ', '-');
  const productName = data.title.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\s,]/g, '-');

  const offerUrl = `/${store}/produto/${productName}?oid=${data.id}&utm_click=1&rid=${data.resources_id}`

  return (
    <Flex
      as={Link}
      href={offerUrl}
      target='_blank'
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
      fontFamily={inter.style.fontFamily}
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
            fontSize={{ xl: '14px' }}
            fontWeight={'medium'}
            color={'gray.700'}
            wordBreak={'break-word'}
            as={Link}
            href={offerUrl}
            target='_blank'
          >
            {data.title}
          </Heading>
        </Box>
        <Flex
          width={'100%'}
          margin={{ xl: '1rem 0' }}
          alignItems={'center'}
          gap={{ xl: '4px' }}
        >
          <Heading
            as={'span'}
            fontFamily={inter.style.fontFamily}
            fontSize={{ xl: '1rem' }}
            color={'gray.800'}
            wordBreak={'break-word'}
          >
            {parseCurrency(data.price)}
          </Heading>
          {data.old_price && (
            <Text
              as={'span'}
              fontSize={'xs'}
              color={'red.400'}
              textDecoration={'line-through'}
            >
              {parseCurrency(data.old_price)}
            </Text>
          )}
        </Flex>
        <Flex
          width={'100%'}
          justifyContent={'flex-end'}
        >
          <Text
            fontSize={{ xl: 'xs' }}
          >
            {data._count.offer_clicks} visualizações
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}