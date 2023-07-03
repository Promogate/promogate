import { PromogateContext } from '@/application/contexts';
import { AWSUploadService } from '@/application/services';
import { makeUniqueStoreName } from '@/application/utils/makeUniqueStoreName';
import { api } from '@/config';
import { MeResponse } from '@/domain/models';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, {
  ChangeEvent,
  Fragment,
  useCallback,
  useContext,
  useState
} from 'react';
import {
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';

const inter = Inter({ subsets: ['latin'] })

type RegisterStoreProps = {
  store_name: string,
  store_name_display: string,
  store_image: string
}

const s3Upload = new AWSUploadService();

type CreateStorePageProps = MeResponse

/*eslint-disable @next/next/no-img-element*/
export default function CreateStore({ status, user }: CreateStorePageProps) {
  const [localImageUrl, setLocalImageUrl] = useState('');
  const [sampleUrl, setSampleUrl] = useState('');

  const { createUserProfile } = useContext(PromogateContext);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
    }, []
  )

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<RegisterStoreProps>();

  const mutation = useMutation(async (values: RegisterStoreProps) => await createUserProfile({
    store_name: sampleUrl,
    store_name_display: values.store_name_display,
    store_image: values.store_image,
    user_id: user.id
  }));

  const handleRegisterStore: SubmitHandler<RegisterStoreProps> = async (values) => {
    const file = await fetch(localImageUrl).then(r => r.blob()).then(blobFile => new File([blobFile], `store_image.${user.id}`))
    const { url } = await s3Upload.uploadImage({ file, user: user.id })
    await mutation.mutateAsync({...values , store_image: url })
  }

  const handleSampleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parsed = makeUniqueStoreName(e.currentTarget.value) as string;
    setSampleUrl(parsed);
  }

  return (
    <Fragment>
      <Head>
        <title>Promogate - Criar perfil da loja</title>
      </Head>
      <Grid
        placeItems={'center'}
        height={'100vh'}
        backgroundColor={'gray.50'}
      >
        <Grid
          as='form'
          width={['500px']}
          padding={{ xl: '4rem 2rem' }}
          border={['1px']}
          borderColor={'gray.200'}
          borderRadius={['lg']}
          gap={{ xl: '2rem' }}
          onSubmit={handleSubmit(handleRegisterStore)}
          autoComplete='off'
          backgroundColor={'white'}
        >
          <FormControl margin={'0 auto'}>
            {
              localImageUrl ? (
                <>
                  <FormLabel
                    border={'1px'}
                    borderColor={'gray.300'}
                    borderRadius={'full'}
                    borderStyle={'dashed'}
                    width={'120px'}
                    height={'120px'}
                    cursor={'pointer'}
                    margin={'0 auto'}
                    display={'grid'}
                    placeItems={'center'}
                    gap={'1px'}
                    overflow={'hidden'}
                    position={'relative'}
                  >

                    <img
                      src={localImageUrl}
                      alt='Store image'
                    />
                    <Input
                      type='file'
                      onChange={handleImageUpload}
                      display={'none'}
                    />
                  </FormLabel>
                  <IconButton
                    aria-label='deleteImage'
                    icon={<TiDelete />}
                    position={'absolute'}
                    right={'40%'}
                    top={0}
                    zIndex={10}
                    colorScheme={'red'}
                    rounded={'full'}
                    size={'xs'}
                    onClick={() => setLocalImageUrl('')}
                  />
                </>
              ) : (
                <FormLabel
                  border={'1px'}
                  borderColor={'gray.300'}
                  borderRadius={'full'}
                  borderStyle={'dashed'}
                  width={'120px'}
                  height={'120px'}
                  cursor={'pointer'}
                  margin={'0 auto'}
                  display={'grid'}
                  placeItems={'center'}
                  gap={'1px'}
                >
                  <Flex
                    width={'100%'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    color={'gray.400'}
                  >
                    <Icon as={BsUpload} />
                    <Text
                      fontFamily={inter.style.fontFamily}
                      fontSize={{ xl: '0.8rem' }}
                      fontWeight={{ xl: 'normal' }}
                    >
                      Envie sua logo
                    </Text>
                  </Flex>
                  <Input
                    type='file'
                    onChange={handleImageUpload}
                    display={'none'}
                  />
                </FormLabel>
              )
            }
          </FormControl>
          <FormControl>
            <FormLabel
              fontFamily={inter.style.fontFamily}
            >
              Usuário único
            </FormLabel>
            <Input
              type='text'
              value={sampleUrl}
              onChange={handleSampleUrl}
            />
            <Box
              minWidth={{ xl: '100px' }}
              padding={{ xl: '0.5rem 0' }}
              minHeight={{ xl: '1.5rem' }}
            >
              <Text
                fontSize={{ xl: '0.725rem' }}
                color={'gray.400'}
              >
                Como será a sua url:
                {`https://promogate.app/${sampleUrl}`}
              </Text>
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel
              fontFamily={inter.style.fontFamily}
            >
              Nome da loja
            </FormLabel>
            <Input
              type='text'
              {...register('store_name_display')}
            />
          </FormControl>
          <Button
            type='submit'
            fontFamily={inter.style.fontFamily}
            backgroundColor={'#5528ff'}
            color={'white'}
            _hover={{
              backgroundColor: '#5528ff'
            }}
            size={{ xl: 'lg' }}
            isLoading={isSubmitting}
          >
            Finalizar cadastro
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
}