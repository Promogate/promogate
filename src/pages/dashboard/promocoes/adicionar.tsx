import { DashboardLayout } from '@/presentation/components'
import {
  Flex,
  Heading,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { TfiAngleLeft } from 'react-icons/tfi'

export default function AddOffersPage() {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <IconButton
          as={Link}
          href='/dashboard/promocoes'
            aria-label='create'
            variant={'outline'}
          >
            <TfiAngleLeft />
          </IconButton>
          <Heading
            as={'h2'}
            fontSize={{ lg: '2xl' }}
            color={'gray.600'}
          >
            Adicionar oferta
          </Heading>
        </Flex>
      </DashboardLayout>
    </Fragment>
  )
}