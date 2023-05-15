import { api } from '@/config';
import { MeResponse } from '@/domain/models';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import { parseCookies } from 'nookies';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { DashboardMenu } from './dashboard-menu';

interface DashboardLayoutProps {
  children: ReactNode
}

const inter = Inter({ subsets: ['latin'] })

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookies = parseCookies();

  const { data } = useQuery(['user-profile', cookies['promogate.token']], async () => {
    const { data } = await api.get<MeResponse>('/users/me', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  }, {
    cacheTime: 1000 * 60 * 60 * 15,
    staleTime: 1000 * 60 * 60 * 15,
  })

  return (
    <Grid
      gridTemplateColumns={{ xl: '2fr 10fr'}}
      fontFamily={inter.style.fontFamily}
    >
      <GridItem
        height={'100vh'}
        position={'relative'}
        borderRadius={{ xl: '0 16px 16px 0' }}
      >
        <DashboardMenu me={data} />
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