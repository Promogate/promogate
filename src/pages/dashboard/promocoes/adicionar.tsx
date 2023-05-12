import { api } from '@/config'
import { OfferData, UserWithCategories } from '@/domain/models'
import { DashboardLayout } from '@/presentation/components'
import { withSSRAuth } from '@/utils'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  useToast
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { Fragment, useState } from 'react'
import { TfiAngleLeft } from 'react-icons/tfi'
import { useMutation } from 'react-query'

type AddOffersPageProps = UserWithCategories;

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function AddOffersPage({ user }: AddOffersPageProps) {
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

  console.log(user);

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
            padding={{ xl: '1.5rem 1.5rem 5rem 1.5rem' }}
            borderRadius={{ xl: '1rem' }}
            overflow={'auto'}
          >
            <FormControl>
              <FormLabel>(Link) Imagem da Oferta</FormLabel>
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
              <FormLabel>Destino (Link Afiliado)</FormLabel>
              <Input
                type='text'
                name='destinationLink'
                value={offerData.destinationLink}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nome da loja</FormLabel>
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
            <FormControl>
              <FormLabel>Data de expiração</FormLabel>
              <Select>
                {user?.user_profile.resources.categories.map((element, i) => {
                  return (
                    <option
                      key={i}
                    >
                      {element.name}
                    </option>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              as={GridItem}
              colSpan={2}
              position={'relative'}
            >
              <FormLabel>Descrição</FormLabel>
              <Input 
                as={QuillNoSSRWrapper} 
                theme='snow' 
                height={'240px'}
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
  const cookies = parseCookies(ctx);

  const { data } = await api.get('/users/me/categories', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  return {
    props: {
      user: data.user
    }
  }
}) 
