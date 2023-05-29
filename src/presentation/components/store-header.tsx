import { Box, Flex, Heading, Img } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';

type StoreHeaderProps = {
  props: {
    store_image: string;
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
        height={'100%'}
        width={['100%']}
        alignItems={'center'}
        maxWidth={{ xl: '1170px' }}
        margin={['0 auto']}
        gap={['1rem']}
      >
        {
          props.store_image ? (
            <>
              <Box
                width={'64px'}
                height={'64px'}
                rounded={'full'}
                position={'relative'}
                overflow={'hidden'}
              >
                <Img
                  src={props.store_image}
                  alt={props.store_name}
                />
              </Box>
              <Heading
                as={'h1'}
                fontSize={['1.5rem']}
                fontFamily={montserrat.style.fontFamily}
                color={'gray.50'}
                textTransform={['capitalize']}
              >
                {props.store_name}
              </Heading>
            </>
          ) : (
            <Heading
              as={'h1'}
              fontSize={['1.5rem']}
              fontFamily={montserrat.style.fontFamily}
              color={'gray.50'}
              textTransform={['capitalize']}
            >
              {props.store_name}
            </Heading>
          )
        }

      </Flex>
    </Box>
  )
}