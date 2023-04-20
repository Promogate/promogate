import { Button, Grid } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Coupon Website</title>
      </Head>
      <Grid
        as='main'
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Button
          as={Link}
          href={'/login'}
          minWidth={'150px'}
          maxWidth={'500px'}
        >
          Login
        </Button>
      </Grid>
    </>
  )
}
