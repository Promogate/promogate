import {
  AuthContextProvider,
  PromogateContextProvider
} from '@/application/contexts';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import '../styles/slider.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <PromogateContextProvider>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
        </PromogateContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
