import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from 'react'
import { SessionProvider } from "next-auth/react"

const client = new ApolloClient({
  uri: 'http://localhost:8888/graphql',
  cache: new InMemoryCache()
})
export default function App({
   Component, 
   pageProps :{session, ...pageProps} 
  }
  : AppProps
  ) {
  return <ApolloProvider client={client} >
    <SessionProvider session={session} >
    <ChakraProvider>
      <ColorModeScript initialColorMode='light' />
      <Component {...pageProps} />
    </ChakraProvider>
    </SessionProvider>
  </ApolloProvider>;
}
