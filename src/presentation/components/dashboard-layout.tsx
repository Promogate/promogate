import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DashboardMenu } from './dashboard-menu';

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Grid
      gridTemplateColumns={{ xl: '2fr 10fr'}}
    >
      <GridItem
        height={'100vh'}
        position={'relative'}
        borderRadius={{ xl: '0 16px 16px 0' }}
      >
        <DashboardMenu />
      </GridItem>
      <GridItem
        padding={{ xl: '2rem' }}
        backgroundColor={'#F5F4F7'}
      >
        <Box>
          {children}
        </Box>
      </GridItem>
    </Grid>
  )
}