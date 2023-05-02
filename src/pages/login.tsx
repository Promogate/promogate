import { AuthContext } from '@/application/contexts';
import { RequestError } from '@/domain/models';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsArrowRightShort } from 'react-icons/bs';
import { useMutation } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

type LoginPageProps = {
  isLogged: string | undefined
}

type LoginProps = {
  email: string;
  password: string;
}

export default function LoginPage({ isLogged }: LoginPageProps) {
  const toast = useToast();
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginProps>()

  const mutation = useMutation(async (values: LoginProps) => await signIn(values), {
    onError: (error: AxiosError<RequestError>) => {
      toast({
        status: 'error',
        description: error.response?.data.message
      })
    }
  })

  const handleLogin: SubmitHandler<LoginProps> = async (values) => {
    await mutation.mutateAsync(values)
  }

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
          {
            isLogged ? (
              <>
                <Heading
                  as='h2'
                  fontFamily={inter.style.fontFamily}
                  fontSize={{ xl: '1.5rem' }}
                  color={'gray.600'}
                >
                  Você já está logado!
                </Heading>
                <Flex
                  fontFamily={inter.style.fontFamily}
                  fontSize={{ xl: '0.825rem' }}
                  gap={'2px'}
                  alignItems={'center'}
                  margin={{ xl: '0.5rem 0 0 0' }}
                >
                  <Text>Vá direto para o</Text>
                  <Text
                    as={Link} href={'/dashboard'}
                    fontWeight={'semibold'}
                    color={'#571770'}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    Dashboard
                    <BsArrowRightShort />
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                <Flex
                  as='form'
                  minWidth={{ xl: '400px' }}
                  flexDirection={'column'}
                  gap={{ xl: '1.175rem' }}
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <FormControl>
                    <FormLabel
                      fontFamily={inter.style.fontFamily}
                    >
                      Email
                    </FormLabel>
                    <Input
                      type='text'
                      {...register('email')}
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
                      {...register('password')}
                      size={'lg'}
                    />
                  </FormControl>
                  <Button
                    type={'submit'}
                    width={'100%'}
                    size={'lg'}
                    backgroundColor={'#571770'}
                    color={'white'}
                    transition={'375ms ease-out'}
                    _hover={{
                      backgroundColor: '#7e2b9e'
                    }}
                    fontFamily={inter.style.fontFamily}
                    isLoading={isSubmitting}
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
                  <Text>Ainda não é cadastrado?</Text>
                  <Text
                    as={Link} href={'/cadastrar-se'}
                    fontWeight={'semibold'}
                    color={'#571770'}
                  >
                    Cadastre-se
                  </Text>
                </Flex>
              </>
            )
          }
        </Box>
        <Box
          backgroundColor={'#F5F4F7'}
          height={'100vh'}
          backgroundImage={'/login.jpg'}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          backgroundRepeat={'no-repeat'}
        >

        </Box>
      </Grid>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['promogate.token']) {
    return {
      props: {
        isLogged: cookies['promogate.token']
      }
    }
  }

  return {
    props: {
      isLogged: null
    }
  }

}