
"use client"
// import { Inter } from "next/font/google";
import { Center, IconButton, VStack, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import SignInUser from '../components/signInUser';
import { AuthNotRequired } from '../components/AuthNotRequired';
import AuthCom from '../components/AuthCom';

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  if(isClient) 
  return (
    <AuthNotRequired>
      <Center h='100vh' >
        <VStack w='full'>
          <IconButton
            icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
            // isRound='true'
            size='lg'
            alignSelf='flex-end'
            onClick={toggleColorMode} aria-label={''} />
          <SignInUser />
          {/* <Component {...pageProps} /> */}
          <AuthCom/>
          
        </VStack>
      </Center>
    </AuthNotRequired>
  );
  return <>Loading...</>
}
