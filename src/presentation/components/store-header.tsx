import { Box, Grid } from '@chakra-ui/react';
import Image from 'next/image';

type StoreHeaderProps = {
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
	} | undefined
}

/*eslint-disable @next/next/no-img-element*/
export function StoreHeader({ props }: StoreHeaderProps) {
  return (
    <Box
      height={{ xl: '80px' }}
      backgroundColor={'black'}
    >
      <Grid
        height={'100%'}
        margin={'0 auto'}
        maxWidth={{ xl: '1250px' }}
        alignItems={'center'}
        gridTemplateColumns={{ xl: '1fr' }}
      >
        <Box
          width={'64px'}
          height={'64px'}
          rounded={'full'}
          position={'relative'}
          overflow={'hidden'}
          margin={'0 auto'}
        >
          <Image
            src={props?.store_image as string}
            alt={props?.store_name as string}
            fill
          />
        </Box>
      </Grid>
    </Box>
  )
}