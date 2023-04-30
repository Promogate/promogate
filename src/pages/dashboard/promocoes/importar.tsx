import { api, queryClient } from '@/config'
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
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { TfiAngleLeft } from 'react-icons/tfi'
import { useMutation } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

export default function AddOffersPage() {
  const toast = useToast();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const mutation = useMutation(async (data: any) => {
    const file = data.file[0] as FileList;

    await api.post('/dashboard/offers/importer/csv', {
      file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }, {
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Importação feita com sucesso'
      }),
      queryClient.invalidateQueries('offers'),
      router.push('/dashboard/promocoes')
    }
  })
  
  const handleUpload = async (data: any) => {
    await mutation.mutateAsync(data)
  }

  return (
    <Fragment>
      <Head>
        <title>Promogate - Importar via CSV</title>
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
            fontFamily={inter.style.fontFamily}
          >
            Importar ofertas via CSV
          </Heading>
        </Flex>
        <Box
          padding={{ xl: '2rem 0' }}
        >
          <Box
            as={'form'}
            backgroundColor={'white'}
            padding={{ xl: '1.5rem' }}
            borderRadius={{ xl: '1rem' }}
            onSubmit={handleSubmit(handleUpload)}
          >
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                type='file'
                {...register('file')}
                border={'none'}
              />
            </FormControl>
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
                fontFamily={inter.style.fontFamily}
              >
                Importar promoções
              </Button>
            </Flex>
          </Box>
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
