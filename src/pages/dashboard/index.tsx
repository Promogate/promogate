import { DashboardLayout } from '@/presentation/components'
import { Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { Fragment } from 'react'

export default function Dashboard() {
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <Heading>
          Dashboard works!
        </Heading>
      </DashboardLayout>
    </Fragment>
  )
}