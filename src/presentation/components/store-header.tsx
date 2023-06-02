import { Box, Flex, Heading } from '@chakra-ui/react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

type SocialMedia = ({
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  telegram: string | null;
  twitter: string | null;
} | null);

type StoreHeaderProps = {
  props: {
    store_image: string;
    store_name_display: string;
    store_name: string;
    social_media?: SocialMedia
  }
}

const montserrat = Montserrat({ subsets: ['latin'], preload: true });

/*eslint-disable @next/next/no-img-element*/
export function StoreHeader({ props }: StoreHeaderProps) {

  return (
    <Box
      height={['80px', '96px']}
      padding={['1rem']}
      backgroundColor={'black'}
    >
      <Flex
        as={Link}
        href={`/${props.store_name}`}
        height={'100%'}
        width={['100%']}
        alignItems={'center'}
        maxWidth={['1170px']}
        margin={['0 auto']}
        gap={['1rem']}
        justifyContent={['space-between']}
      >
        <Flex
          alignItems={'center'}
          gap={['1rem']}
        >
          {
            props.store_image ? (
              <Box
                position='relative'
                width={'64px'}
                height={'64px'}
                rounded={'full'}
                overflow={'hidden'}
              >
                <Image
                  src={props.store_image}
                  alt={props.store_name_display}
                  fill
                  priority
                />
              </Box>
            ) : null
          }
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
      </Flex>
    </Box>
  )
}