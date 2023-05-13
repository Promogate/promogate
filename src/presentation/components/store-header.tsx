import { Box, Grid } from '@chakra-ui/react';
import Image from 'next/image';

type StoreHeaderProps = {
  props: {
    store_image: string;
    store_name: string;
  }
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
            src={props.store_image}
            alt={props.store_name}
            fill
          />
        </Box>
      </Grid>
    </Box>
  )
}