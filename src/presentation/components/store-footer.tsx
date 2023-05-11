import { Grid, Heading } from '@chakra-ui/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], preload: true });

type StoreFooterProps = {
  props: {
		id: string,
		image: string,
		title: string,
		old_price: string | null,
		price: string,
		destination_link: string,
		store_image: string,
		store_name: string,
		description: string,
		expiration_date: string,
		created_at: string,
		is_on_showcase: boolean,
		is_featured: boolean,
		is_free_shipping: boolean,
		resources_id: string
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
        &copy; 2023 Promogate. Todos os direitos reservados.
      </Heading>
    </Grid>
  )
}