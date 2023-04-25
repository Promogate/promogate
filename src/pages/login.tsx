import { api } from '@/config';
import { LoginData, RequestError } from '@/domain/models';
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    VStack,
    useToast
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import React, { useState } from 'react';

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setLoginData({...loginData, [e.currentTarget.name]: e.currentTarget.value});
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
        <title>Coupon Website</title>
      </Head>
      <Grid
        as='main'
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <VStack
          as='form'
          gap={{ xl: '2' }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input 
              type='text'
              name='email'
              value={loginData.email}  
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input 
              type='password'
              name='password'
              value={loginData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type={'submit'}
            width={'100%'}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </VStack>
      </Grid>
    </>
  )
}