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
        height={'100vh'}
        position={'relative'}
      >
        <DashboardMenu />
      </GridItem>
      <GridItem
        padding={{ lg: '2rem 2rem 2rem 0' }}
      >
        <Box>
          {children}
        </Box>
      </GridItem>
    </Grid>
  )
}