import { api } from '@/config'
import { OfferData } from '@/domain/models'
import { DashboardLayout } from '@/presentation/components'
import { withSSRAuth } from '@/utils'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { Fragment, useState } from 'react'
import { TfiAngleLeft } from 'react-icons/tfi'
import { useMutation } from 'react-query'

export default function AddOffersPage() {
  const cookies = parseCookies();
  const toast = useToast();
  const [offerData, setOfferData] = useState<OfferData>({
    image: '',
    title: '',
    price: '',
    oldPrice: '',
    destinationLink: '',
    storeImage: '',
    expirationDate: ''
  })

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setOfferData({ ...offerData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const createOffer = useMutation(async () => {
    await api.post('/resources/offer/create', offerData, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })
  }, {
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Oferta adicionada com sucesso!'
      }),
        setOfferData({
          image: '',
          title: '',
          price: '',
          oldPrice: '',
          destinationLink: '',
          storeImage: '',
          expirationDate: ''
        })
    },
    onError: (e: any) => {
      toast({
        status: 'error',
        description: e.message
      })
    }
  })

  const handleCreateOffer = async () => {
    await createOffer.mutateAsync()
  }

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
            fontSize={{ xl: '2xl' }}
            color={'gray.600'}
          >
            Adicionar oferta
          </Heading>
        </Flex>
        <Box
          padding={{ xl: '2rem 0' }}
        >
          <Box
            as={'form'}
            display={'grid'}
            gridTemplateColumns={{ xl: '1fr 1fr' }}
            gap={{ xl: '1rem' }}
            backgroundColor={'white'}
            padding={{ xl: '1.5rem' }}
            borderRadius={{ xl: '1rem' }}
          >
            <FormControl>
              <FormLabel>Image da oferta</FormLabel>
              <Input
                type='text'
                name='image'
                value={offerData.image}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Título</FormLabel>
              <Input
                type='text'
                name='title'
                value={offerData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço antigo</FormLabel>
              <Input
                type='text'
                name='oldPrice'
                value={offerData.oldPrice}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço atual</FormLabel>
              <Input
                type='text'
                name='price'
                value={offerData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Link da oferta</FormLabel>
              <Input
                type='text'
                name='destinationLink'
                value={offerData.destinationLink}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image da loja</FormLabel>
              <Input
                type='text'
                name='storeImage'
                value={offerData.storeImage}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de expiração</FormLabel>
              <Input
                type='datetime-local'
                name='expirationDate'
                value={offerData.expirationDate}
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Flex
            justifyContent={'flex-end'}
            padding={{ xl: '1rem 0' }}
          >
            <Button
              size={'lg'}
              backgroundColor={'black'}
              _hover={{
                backgroundColor: 'black'
              }}
              color={'white'}
              onClick={handleCreateOffer}
              isLoading={createOffer.isLoading}
            >
              Adicionar oferta
            </Button>
          </Flex>
        </Box>
      </DashboardLayout>
    </Fragment>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
}) 
