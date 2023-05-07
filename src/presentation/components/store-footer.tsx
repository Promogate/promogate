import { Grid, Heading } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], preload: true });

type StoreFooterProps = {
  props: {
    id: string;
    role: string;
    store_image: string;
    store_name: string;
    user_id: string;
  } | undefined;
}

export function StoreFooter({ props }: StoreFooterProps) {
  return (
    <Grid
      height={'20vh'}
      margin={'0 auto'}
      maxWidth={{ xl: '1250px' }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Heading
        as={'p'}
        fontSize={'14px'}
        fontWeight={'normal'}
        fontFamily={inter.style.fontFamily}
      >
        &copy; Promogate.
      </Heading>
    </Grid>
  )
}