import { api } from '@/config'
import { MeResponse, OfferDataInput } from '@/domain/models'
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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TfiAngleLeft } from 'react-icons/tfi'

type AddOffersPageProps = MeResponse

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function AddOffersPage({ status, user }: AddOffersPageProps) {
  const cookies = parseCookies();
  const toast = useToast();
  const router = useRouter();
  const [description, setDescription] = useState('')
  const query = useQueryClient();

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<OfferDataInput>();

  const mutation = useMutation({
    mutationFn: async (data: OfferDataInput) => {
      const price = makeCurrencyStringReadable(data.price);
      const old_price = makeCurrencyStringReadable(data.old_price);

      await api.post(`/resources/${user.user_profile.resources.id}/offer/create`, {
        ...data,
        price,
        old_price,
        description
      }, {
        headers: {
          Authorization: `Bearer ${cookies['promogate.token']}`
        }
      })

    },
    onSuccess: () => {
      query.invalidateQueries(['offers', user.id]);
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
          marginBottom={['1rem']}
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
          as={'form'}
          onSubmit={handleSubmit(createOffer)}
          height={['max-content']}
        >
          <Box
            display={'grid'}
            gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
            gap={['1rem']}
            backgroundColor={'white'}
            padding={['2rem']}
            borderRadius={'1rem'}
            overflow={'auto'}
          >
            <FormControl
              as={GridItem}
            >
              <FormLabel>(Link) Imagem da Oferta</FormLabel>
              <Input
                type='text'
                {...register('image')}
              />
            </FormControl>
            <FormControl
              as={GridItem}
            >
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
              colSpan={[1, 2]}
              position={'relative'}
              height={['240px', '240px']}
            >
              <FormLabel>Descrição (Opcional)</FormLabel>
              <Input
                as={QuillNoSSRWrapper}
                theme='snow'
                height={['max-content', '240px']}
                padding={['0 0 1rem 0']}
                marginBottom={['1rem', '1rem', 0]}
                onChange={changeQuillDescription}
              />
            </FormControl>
          </Box>
          <Flex
            justifyContent={'flex-end'}
            padding={['2rem 0']}
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

  const { data } = await api.get<MeResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${cookies['promogate.token']}`
    }
  })

  return {
    props: {
      status: data.status,
      user: data.user
    }
  }
}) 
