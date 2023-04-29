import { api } from '@/config';
import { LoginData, RequestError } from '@/domain/models';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setLoginData({ ...loginData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    api.post<{ token: string }>('/users/signin', loginData).then((success) => {
      setCookie(null, 'couponwebsite.access_token', success.data.token);
      setLoginData({
        email: '',
        password: ''
      });
      router.push('/dashboard')
    }).catch((error: AxiosError<RequestError>) => {
      toast({
        status: 'error',
        position: 'top-right',
        description: error.response?.data.message
      })
    })
  };

  return (
    <>
      <Head>
        <title>Promogate - Login</title>
      </Head>
      <Grid
        as='main'
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
        gridTemplateColumns={{ xl: '1fr 1fr' }}
      >
        <Box
          margin={'0 auto'}
        >
          <Flex
            as='form'
            minWidth={{ xl: '400px' }}
            flexDirection={'column'}
            gap={{ xl: '1.175rem' }}
          >
            <FormControl>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Nome
              </FormLabel>
              <Input
                type='text'
                name='nome'
                value={loginData.email}
                onChange={handleChange}
                fontFamily={inter.style.fontFamily}
                size={'lg'}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Email
              </FormLabel>
              <Input
                type='text'
                name='email'
                value={loginData.email}
                onChange={handleChange}
                fontFamily={inter.style.fontFamily}
                size={'lg'}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Senha
              </FormLabel>
              <Input
                type='password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                size={'lg'}
              />
            </FormControl>
            <Button
              type={'submit'}
              width={'100%'}
              onClick={handleLogin}
              size={'lg'}
              backgroundColor={'#571770'}
              color={'white'}
              transition={'375ms ease-out'}
              _hover={{
                backgroundColor: '#7e2b9e'
              }}
              fontFamily={inter.style.fontFamily}
            >
              Entrar
            </Button>
          </Flex>
          <Flex
            margin={{ xl: '1rem 0 0 0' }}
            fontFamily={inter.style.fontFamily}
            fontSize={{ xl: '0.825rem' }}
            gap={'2px'}
            alignItems={'center'}
          >
            <Text>Já é cadastrado?</Text>
            <Text
              as={Link} href={'/login'}
              fontWeight={'semibold'}
              color={'#571770'}
            >
              Faça o login.
            </Text>
          </Flex>
        </Box>
        <Box
          backgroundColor={'#F5F4F7'}
          height={'100vh'}
          backgroundImage={'/register.jpg'}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          backgroundRepeat={'no-repeat'}
        >

        </Box>
      </Grid>
    </>
  )
}