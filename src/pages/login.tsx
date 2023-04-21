import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  VStack
} from '@chakra-ui/react';
import Head from 'next/head';

export default function LoginPage() {
  
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
          gap={{ lg: '2' }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password' />
          </FormControl>
          <Button
            type={'submit'}
            width={'100%'}
          >
            Entrar
          </Button>
        </VStack>
      </Grid>
    </>
  )
}