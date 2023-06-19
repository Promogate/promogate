import { OfferWithClicks } from '@/domain/models';
import { parseCurrency, truncateString } from '@/main/utils';
import { Badge, Box, Button, Flex, HStack, Heading, Tag, Text } from '@chakra-ui/react';
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
  const productName = data.title.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f,.'‘’"“”+]/g, '').replace(/[\s/]/g, '-');

  const offerUrl = `/${store}/produto/${productName}/?oid=${data.id}&utm_click=1&rid=${data.resources_id}`

  return (
    <Flex
      as={Link}
      href={offerUrl}
      target='_blank'
      borderRadius={['lg']}
      backgroundColor={'white'}
      flexDirection={'column'}
      justifyContent={['space-between']}
      fontFamily={inter.style.fontFamily}
    >
      <Flex
        padding={['1rem']}
        flexDirection={'column'}
        flex={1}
      >
        <HStack
          spacing={['0.5rem']}
          marginBottom={['1rem ']}
        >
          <Tag
            colorScheme={'blackAlpha'}
            fontWeight={['normal']}
            textTransform={['none']}
          >
            {data.store_name}
          </Tag>
          {data.is_featured ? (
            <Badge
              variant={'outline'}
              colorScheme={'green'}
              fontWeight={['normal']}
              textTransform={['none']}
            >
              Destaque
            </Badge>
          ) : null}
        </HStack>
        <Box
          borderRadius={['1rem']}
          overflow={['hidden']}
          height={['160px']}
        >

          <img
            className='object-contain h-full w-full'
            src={data.image}
            alt={data.title}
          />
        </Box>
        <Heading
          as='h3'
          margin={['0.5rem 0']}
          fontSize={['1.275rem', '1rem']}
          fontWeight={['medium']}
          color={['gray.600']}
          flex={1}
        >
          {truncateString(data.title)}
        </Heading>
        <Box
          margin={['1rem 0']}
        >
          <Text
            as='span'
            color={'red.400'}
            textDecoration={'line-through'}
            fontSize={['xs']}
          >
            {data.old_price && data.old_price !== '0' ? parseCurrency(data.old_price) : null}
          </Text>
          <Text
            color={'gray.700'}
            fontSize={['xl']}
            fontWeight={['semibold']}
          >
            {parseCurrency(data.price)}
          </Text>
        </Box>
        <Flex
          width={['100%']}
          justifyContent={['flex-end']}
          gap={['1rem', '1rem', '1.5rem']}
        >
          <Text
            as='span'
            color={'gray.400'}
            fontSize={['xs']}
          >
            {data._count.offer_clicks > 1 ? `${data._count.offer_clicks} visualizações` : `${data._count.offer_clicks} visualização`}
          </Text>
        </Flex>
      </Flex>
      <Button
        colorScheme='purple'
        borderRadius={['0 0 0.5rem 0.5rem']}
      >
        Ver Oferta
      </Button>
    </Flex>
  )
}