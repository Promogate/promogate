import { AuthContext } from '@/application/contexts';
import { RegisterFormProps, RequestError } from '@/domain/models';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

const inter = Inter({ subsets: ['latin'] })

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email('Você deve inserir um email válido').required(),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 'Sua senha deve ao menos conter 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'As senhas não combinam')
})

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const { signUp } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const mutation = useMutation(async (values: RegisterFormProps) => await signUp(values), {
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Cadastrado com sucesso'
      })
      router.push('/criar-loja')
    }, onError: (err: AxiosError<RequestError>) => {
      toast({
        status: 'error',
        description: err.response?.data.message
      })
    }
  });

  const handleRegister: SubmitHandler<RegisterFormProps> = (values) => {
    mutation.mutateAsync(values)
  }

  return (
    <>
      <Head>
        <title>Promogate - Cadastro</title>
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
            onSubmit={handleSubmit(handleRegister)}
            width={{ xl: '400px' }}
            flexDirection={'column'}
            gap={{ xl: '1.175rem' }}
          >
            <FormControl isInvalid={!!errors.name}>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Nome
              </FormLabel>
              <Input
                type='text'
                fontFamily={inter.style.fontFamily}
                size={'md'}
                {...register('name')}
              />
              <FormErrorMessage wordBreak={'break-word'}>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Email
              </FormLabel>
              <Input
                type='text'
                {...register('email')}
                fontFamily={inter.style.fontFamily}
                size={'md'}
              />
              <FormErrorMessage wordBreak={'break-word'}>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Senha
              </FormLabel>
              <Input
                type='password'
                {...register('password')}
                size={'md'}
              />
              <FormErrorMessage wordBreak={'break-word'} position={'relative'}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.passwordConfirmation}>
              <FormLabel
                fontFamily={inter.style.fontFamily}
              >
                Confirme a senha
              </FormLabel>
              <Input
                type='password'
                {...register('passwordConfirmation')}
                size={'md'}
              />
              <FormErrorMessage wordBreak={'break-word'}>
                {errors.passwordConfirmation && errors.passwordConfirmation.message}
              </FormErrorMessage>
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