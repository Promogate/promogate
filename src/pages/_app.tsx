import { PromogateContextProvider } from '@/application/contexts';
import { queryClient } from '@/config';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PromogateContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </PromogateContextProvider>
    </QueryClientProvider>
  )
}
