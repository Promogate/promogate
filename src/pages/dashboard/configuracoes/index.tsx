import { PromogateContext } from '@/application/contexts';
import { MeResponse } from '@/domain/models';
import { DashboardLayout } from '@/presentation/components';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { parseCookies } from 'nookies';
import { ChangeEvent, Fragment, useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useMutation } from 'react-query';

import { AWSUploadService } from '@/application/services';
import { api } from '@/config';
import Head from 'next/head';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

const s3Upload = new AWSUploadService();

type SettingsPageProps = {
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
      social_media?: {
        facebook?: string;
        whastapp?: string;
        instagram?: string;
        telegram?: string;
        twitter?: string;
      }
    }
  }
}

type UpdateProfileBody = {
  store_name?: string;
  store_image?: string;
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  telegram?: string;
  twitter?: string
}

/*eslint-disable @next/next/no-img-element*/
export default function SettingsPage({ user }: SettingsPageProps) {
  const toast = useToast();
  const [localImageUrl, setLocalImageUrl] = useState(user.user_profile.store_image);
  const [sampleUrl, setSampleUrl] = useState(user.user_profile.store_name);
  const { token } = useContext(PromogateContext);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
    }, []
  )

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<UpdateProfileBody>({
    defaultValues: {

    },
    values: {
      store_name: user.user_profile.store_name.replaceAll('-', ' '),
      facebook: user.user_profile.social_media?.facebook,
      instagram: user.user_profile.social_media?.instagram,
      whatsapp: user.user_profile.social_media?.whastapp,
      telegram: user.user_profile.social_media?.telegram,
      twitter: user.user_profile.social_media?.twitter,
    }
  });

  const updateMutation = useMutation(async (values: UpdateProfileBody) => {
    await api.put(`/users/profile/${user.user_profile.id}/update`, values, {
      headers: {
        Authorization: token
      }
    })
  }, {
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Atualizado com sucesso'
      })
    }
  });

  const getAWSImageUrl = async (user_id: string): Promise<string> => {
    const file = await fetch(localImageUrl).then(r => r.blob()).then(blobFile => new File([blobFile], `store_image.${user_id}`))
    const { url } = await s3Upload.uploadImage({ file, user: user_id })
    return url
  }

  const handleUpdateProfile: SubmitHandler<UpdateProfileBody> = async (values) => {
    if (localImageUrl !== user.user_profile.store_image) {
      const url = await getAWSImageUrl(user.id);
      await updateMutation.mutateAsync({
        ...values,
        store_name: values.store_name?.replace(' ', '-'),
        store_image: url
      })
    } else {
      await updateMutation.mutateAsync({
        ...values,
        store_name: values.store_name?.replace(' ', '-')
      })
    }
  }

  const handleSampleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSampleUrl(e.currentTarget.value.toLocaleLowerCase().replaceAll(' ', '-'));
  }

  return (
    <Fragment>
      <Head>
        <title>Promogate - Configurações da Loja</title>
      </Head>
      <DashboardLayout>
        <Heading
          as={'h2'}
          fontSize={{ xl: '2xl' }}
          color={'gray.600'}
        >
          Configurações
        </Heading>
        <Grid
          margin={{ xl: '1rem 0' }}
          gap={{ xl: '1rem' }}
          gridTemplateColumns={{ xl: '1fr 145px' }}
          position={'relative'}
        >
          <Grid
            as='form'
            onSubmit={handleSubmit(handleUpdateProfile)}
            autoComplete='off'
            backgroundColor={'white'}
            padding={{ xl: '2rem' }}
            borderRadius={{ xl: 'lg' }}
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
                Nome da loja
              </FormLabel>
              <Input
                type='text'
                {...register('store_name')}
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
                  {` https://promogate.app/${sampleUrl}`}
                </Text>
              </Box>
            </FormControl>
            <Grid
              margin={{ xl: '1rem 0' }}
              gap={{ xl: '0.5rem' }}
            >
              <Heading
                as={'h3'}
                fontSize={{ xl: 'lg' }}
                color={'gray.600'}
                marginBottom={{ xl: '1rem' }}
              >
                Redes sociais
              </Heading>
              <FormControl>
                <FormLabel
                  fontFamily={inter.style.fontFamily}
                >
                  Facebook
                </FormLabel>
                <Input
                  type='text'
                  {...register('facebook')}
                  width={{ xl: '50%' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={inter.style.fontFamily}
                >
                  Whastapp
                </FormLabel>
                <Input
                  type='text'
                  {...register('whatsapp')}
                  width={{ xl: '50%' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={inter.style.fontFamily}
                >
                  Instagram
                </FormLabel>
                <Input
                  type='text'
                  {...register('instagram')}
                  width={{ xl: '50%' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={inter.style.fontFamily}
                >
                  Telegram
                </FormLabel>
                <Input
                  type='text'
                  {...register('telegram')}
                  width={{ xl: '50%' }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={inter.style.fontFamily}
                >
                  Twitter
                </FormLabel>
                <Input
                  type='text'
                  {...register('twitter')}
                  width={{ xl: '50%' }}
                />
              </FormControl>
            </Grid>
            <Button
              type='submit'
              fontFamily={inter.style.fontFamily}
              backgroundColor={'black'}
              color={'white'}
              _hover={{
                backgroundColor: 'black'
              }}
              size={{ xl: 'lg' }}
              isLoading={isSubmitting}
              marginTop={{ xl: '1rem' }}
            >
              Atualizar
            </Button>
          </Grid>
          <Box
          >
            <Image
              src='/ads/ad-banner-145x600.webp'
              alt='ad-banner-145x600'
              width={145}
              height={600}
            />
          </Box>
        </Grid>
      </DashboardLayout>
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

  console.log(data);

  return {
    props: {
      user: data.user
    }
  }
}