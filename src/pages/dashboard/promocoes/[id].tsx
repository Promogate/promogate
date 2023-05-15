import { api, queryClient } from '@/config'
import { MeResponse, OfferDataInput, OfferWithClicks } from '@/domain/models'
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
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TfiAngleLeft } from 'react-icons/tfi'
import { useMutation, useQuery } from 'react-query'

type SingleOfferPageProps = {
  status: string;
  message: string;
  offer: OfferWithClicks
}

type SingleOffersPageProps = MeResponse

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const inter = Inter({ subsets: ['latin'] })

export default function AddOffersPage({ status, user }: SingleOffersPageProps) {
  const cookies = parseCookies();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const deletePopup = useDisclosure();

  const { data, isLoading } = useQuery(['offer', id], async () => {
    const { data } = await api.get<SingleOfferPageProps>(`/resources/${user.user_profile.resources.id}/offer/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

    return data
  }, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5
  })

  const [description, setDescription] = useState<any>()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<OfferDataInput>({
    defaultValues: {
      title: data?.offer.title,
      destination_link: data?.offer.destination_link,
      expiration_date: data?.offer.expiration_date,
      image: data?.offer.image,
      old_price: data?.offer.old_price,
      price: data?.offer.price,
      store_name: data?.offer.store_name
    },
    values: data?.offer
  });

  const mutation = useMutation(async (data: OfferDataInput) => {
    const price = makeCurrencyStringReadable(data.price);
    const old_price = makeCurrencyStringReadable(data.old_price);

    await api.put(`/resources/${user.user_profile.resources.id}/offer/${id}`, {
      ...data,
      price,
      old_price,
      description
    }, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })

  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['offers', user.id]);
      toast({
        status: 'success',
        description: 'Oferta atualizada com sucesso!'
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

  const deleteMutation = useMutation(async () => {
    await api.delete(`/resources/offer/${id}`,{
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['offers', user.id]);
      toast({
        status: 'success',
        description: 'Oferta excluída com sucesso!'
      });
      router.push('/dashboard/promocoes');
    },
    onError: (e: any) => {
      toast({
        status: 'error',
        description: e.message
      })
    }
  });

  const handleDeleteOffer = async () => {
    await deleteMutation.mutateAsync();
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
            Editar oferta
          </Heading>
        </Flex>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            as={'form'}
            onSubmit={handleSubmit(createOffer)}
            margin={{ xl: '1rem 0' }}
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
              justifyContent={'space-between'}
              width={'100%'}
              padding={{ xl: '1rem 0' }}
              alignItems={'center'}
            >
              <Button
                colorScheme={'red'}
                variant={'outline'}
                margin={{ xl: '1rem 0' }}
                size={'sm'}
                onClick={deletePopup.onOpen}
              >
                Deletar Oferta
              </Button>
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
                Atualizar oferta
              </Button>
            </Flex>
          </Box>
        )}
      </DashboardLayout>

      <Modal
        isOpen={deletePopup.isOpen}
        onClose={deletePopup.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Heading
              as={'h3'}
              fontSize={{ xl: '1.275rem' }}
              fontFamily={inter.style.fontFamily}
              fontWeight={'medium'}
            >
              Você tem certeza que deseja excluir a oferta {`: ${data?.offer.title}?` ?? '?'}
            </Heading>
            <Flex width={'100%'} justifyContent={'space-between'}>
              <Button
                colorScheme={'red'}
                margin={{ xl: '1rem 0' }}
                size={'sm'}
                onClick={handleDeleteOffer}
              >
                Deletar Oferta
              </Button>
              <Button
                margin={{ xl: '1rem 0' }}
                size={'sm'}
                onClick={deletePopup.onClose}
                backgroundColor={'black'}
                _hover={{
                  backgroundColor: 'black'
                }}
                color={'white'}
              >
                Mudei de ideia. Não quero excluir
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
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
