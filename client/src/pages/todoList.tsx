"use client"

import { VStack, IconButton, Heading, useColorMode, HStack } from '@chakra-ui/react';
import Router from 'next/router';
import { FaMoon, FaSun } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import NEWTODO from '../components/NEWTODO';
import { AuthRequired } from '../components/AuthRequired';



function TodoList() {
  const { colorMode, toggleColorMode } = useColorMode();
  let User: any = undefined
  if (typeof window !== 'undefined') User = sessionStorage?.getItem("user")

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (isClient) return (
    <AuthRequired>
      <VStack className="App" p={4} >
        <HStack alignSelf='flex-end'>
          <IconButton
            icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
            aria-label={''}
            size='lg'

            onClick={toggleColorMode}
          />
          <IconButton
            icon={<IoMdLogOut />}
            //    isRound='true' 
            size='lg'
            alignSelf='flex-end'
            onClick={() => {
              sessionStorage.removeItem('user');
              Router.push('/');
            }} aria-label={''} />
        </HStack>

        <Heading
          mb={8}
          fontWeight='extrabold'
          size='2xl'
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)' bgClip='text' >
          Todo Application
        </Heading>

        <NEWTODO />



      </VStack>
    </AuthRequired>
  );
  return <>Loading...</>
}

export default TodoList;
