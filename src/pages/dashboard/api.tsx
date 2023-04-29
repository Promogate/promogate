import { api } from '@/config';
import { queryClient } from '@/pages/_app';
import { DashboardLayout } from '@/presentation/components';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  useClipboard
} from '@chakra-ui/react';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { Fragment } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';

type Key = {
  id: string,
  key: string,
  expiration_date: string
  userId: string
}

export default function APIsPage() {
  const { onCopy, setValue } = useClipboard('');
  const cookies = parseCookies();

  const { data } = useQuery('api-keys', async () => {
    const { data } = await api.get<Key[]>('/api-keys/all', {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    });

    return data
  });

  const deleteApiKey = useMutation(async (id: string) => {
    await api.delete(`/api-keys/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies['promogate.token']}`
      }
    })
  },{
    onSuccess: () => {
      queryClient.invalidateQueries('api-keys');
    }
  })

  const handleDeleteToken = (id: string) => {
    deleteApiKey.mutateAsync(id)
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
          <Heading
            as={'h2'}
            fontSize={{ xl: '2xl' }}
            color={'gray.600'}
          >
            Chaves API
          </Heading>
        </Flex>
        <Grid
          padding={{ xl: '1.5rem 0' }}
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)' }}
          gap={{ xl: '1rem' }}
        >
          {
            data?.map((key) => {
              return (
                <Box
                  as={'form'}
                  key={key.id}
                  backgroundColor={'white'}
                  borderRadius={{ xl: 'lg' }}
                  padding={{ xl: '1rem' }}
                >
                  <Input
                    name='apiKey'
                    value={key.key}
                    disabled
                  />
                  <Divider orientation='horizontal' />
                  <Flex
                    marginTop={{ xl: '1rem' }}
                    width={'100%'}
                    gap={{ xl: '1rem' }}
                    justifyContent={'flex-end'}
                  >
                    <Button
                      variant={'outline'}
                      color={'red.300'}
                      size={'sm'}
                      onClick={() => handleDeleteToken(key.id)}
                      isLoading={deleteApiKey.isLoading}
                    >
                      Excluir chave
                    </Button>
                    <Button
                      backgroundColor={'black'}
                      color={'white'}
                      rightIcon={<RiFileCopyLine />}
                      size={'sm'}
                      _hover={{
                        backgroundColor: 'black'
                      }}
                      onClick={() => setValue(key.key)}
                      onBlur={onCopy}
                    >
                      Copiar chave
                    </Button>
                  </Flex>
                </Box>
              )
            })
          }
        </Grid>
      </DashboardLayout>
    </Fragment>
  )
}