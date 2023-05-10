import { AuthContextProvider, PromogateContextProvider } from '@/application/contexts';
import { queryClient } from '@/config';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';

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
