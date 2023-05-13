import { api, queryClient } from '@/config'
import { OfferDataInput, UserMeResponse } from '@/domain/models'
import { makeCurrencyStringReadable } from '@/main/utils'
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
  useToast
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TfiAngleLeft } from 'react-icons/tfi'
import { useMutation } from 'react-query'

type AddOffersPageProps = {
  userData: {
    status: string,
    user: {
      id: string,
      name: string,
      email: string,
      created_at: string,
      user_profile: {
        id: string,
        store_image: string,
        store_name: string,
        role: string,
        user_id: string,
        resources: {
          created_at: string,
          id: string,
          user_profile_id:string,
        }
      }
    }
  }
};

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function AddOffersPage({ userData }: AddOffersPageProps) {
  const cookies = parseCookies();
  const toast = useToast();
  const router = useRouter();
  const [description, setDescription] = useState('')

  const { register, handleSubmit, formState: { isSubmitting }, watch } = useForm<OfferDataInput>();

  const mutation = useMutation(async (data: OfferDataInput) => {
    const price = makeCurrencyStringReadable(data.price);
    const old_price = makeCurrencyStringReadable(data.old_price);

    await api.post(`/resources/${userData.user.user_profile.resources.id}/offer/create`, { 
      ...data,
      price,
      old_price,
      description }, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })
    
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['offers', userData.user.id]);
      toast({
        status: 'success',
        description: 'Oferta adicionada com sucesso!'
      });
      router.push('/dashboard/promocoes');
    },
    onError: (e: any) => {
      toast({
        status: 'error',
        description: e.message
      })
    }
  })

  const createOffer: SubmitHandler<OfferDataInput> = async (data) => {
    await mutation.mutateAsync(data);
  }

  const changeQuillDescription = (e: any) => {
    setDescription(e)
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
          as={'form'}
          onSubmit={handleSubmit(createOffer)}
        >
          <Box
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
                {...register('image')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Título da Oferta</FormLabel>
              <Input
                type='text'
                {...register('title')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço antigo (Opcional) </FormLabel>
              <Input
                type='text'
                {...register('old_price')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço final</FormLabel>
              <Input
                type='text'
                {...register('price')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Destino (Link Afiliado)</FormLabel>
              <Input
                type='text'
                {...register('destination_link')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nome da loja (Anunciante)</FormLabel>
              <Input
                type='text'
                {...register('store_name')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Data de expiração (Opcional)</FormLabel>
              <Input
                type='datetime-local'
                {...register('expiration_date')}
              />
            </FormControl>
            <FormControl
              as={GridItem}
              colSpan={2}
              position={'relative'}
            >
              <FormLabel>Descrição (Opcional)</FormLabel>
              <Input
                as={QuillNoSSRWrapper}
                theme='snow'
                height={'240px'}
                onChange={changeQuillDescription}
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
              type='submit'
              isLoading={isSubmitting}
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

  const { data } = await api.get<UserMeResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  return {
    props: {
      userData: data
    }
  }
}) 
