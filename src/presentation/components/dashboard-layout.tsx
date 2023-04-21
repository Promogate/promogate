import { Box, Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DashboardMenu } from './dashboard-menu';

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Grid
      gridTemplateColumns={{ lg: '2fr 10fr' }}
      backgroundColor={'#F5F4F7'}
    >
      <GridItem
        backgroundColor={'#FFFFFF'}
        height={'100vh'}
        position={'sticky'}
        borderRadius={{ lg: '0 16px 16px 0' }}
      >
        <DashboardMenu />
      </GridItem>
      <GridItem
        padding={{ lg: '2rem' }}
      >
        <Box>
          {children}
        </Box>
      </GridItem>
    </Grid>
  )
}