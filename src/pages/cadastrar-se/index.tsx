import { AuthContext } from '@/application/contexts';
import { RegisterFormProps, RequestError } from '@/domain/models';
import {
  Box,
  Button,
  Checkbox,
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
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const inter = Inter({ subsets: ['latin'] })

const schema = yup.object({
  name: yup.string().required(
    'O nome é obrigatório'
  ),
  email: yup.string().email('Você deve inserir um email válido').required(
    'Email é obrigatório.'
  ),
  agree_with_policies: yup.boolean().required('Aceitar as nossas políticas é obrigatório para efetuar o cadastro.').oneOf([true], "Você deve aceitar as políticas para efetuar o cadastro"),
  password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 'Sua senha deve ao menos conter 6 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'As senhas não combinam')
})

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const { signUp } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  console.log(watch('agree_with_policies'))

  const mutation = useMutation(async (values: RegisterFormProps) => await signUp(values), {
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Cadastrado com sucesso'
      })
      router.push('/cadastrar-se/criar-loja')
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
        minHeight={['100vh']}
        alignItems={'center'}
        justifyContent={'center'}
        gridTemplateColumns={['1fr']}
        backgroundColor={'gray.50'}
      >
        <Box
          as={Link}
          href='/'
          position={'relative'}
          height={'30px'}
          width={'160px'}
          margin={['0 auto']}
        >
          <Image
            src={'/promogate-logo.svg'}
            alt={'Promogate logo'}
            fill priority
          />
        </Box>
        <Box
          margin={['0 auto']}
          backgroundColor={'white'}
          padding={['1rem']}
          border={['1px']}
          borderColor={'gray.200'}
          borderRadius={['lg']}
        >
          <Flex
            as='form'
            onSubmit={handleSubmit(handleRegister)}
            width={['max-content', '400px']}
            flexDirection={'column'}
            gap={['1.175rem']}
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
            <FormControl isInvalid={!!errors.agree_with_policies}>
              <Checkbox
                {...register('agree_with_policies')}
                size={'md'}
              >
                Condordo com as <Link href='/politica-de-privacidade' target='_blank' className='underline'>
                  Políticas de privacidade</Link>, <Link href='/termos-de-uso' target='_blank' className='underline'>
                  Termos de Uso</Link> e <Link href='/politica-de-cookies' target='_blank' className='underline'>
                  Políticas de Cookies</Link>.
              </Checkbox>
              <FormErrorMessage wordBreak={'break-word'}>
                {errors.agree_with_policies && errors.agree_with_policies.message}
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
              Cadastrar-se
            </Button>
          </Flex>
          <Flex
            margin={['1rem 0 0']}
            fontFamily={inter.style.fontFamily}
            fontSize={['0.825rem']}
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
      </Grid>
    </>
  )
}