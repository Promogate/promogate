import { MainMenu } from '@/presentation/components'
import { GetServerSideProps } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { parseCookies } from 'nookies'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  isLogged: string | null
}

export default function Home({ isLogged }: HomeProps) {
  return (
    <>
      <Head>
        <title>Coupon Website</title>
      </Head>
      <MainMenu isLogged={isLogged} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  
  if (cookies['promogate.token']) {
    return {
      props: {
        isLogged: cookies['promogate.token']
      }
    }
  }

  return {
    props: {
      isLogged: null
    }
  }
}