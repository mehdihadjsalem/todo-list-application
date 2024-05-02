"use client"

import { Center } from '@chakra-ui/react';
import SignUpUser from '../components/signUpUser';
import React, { useEffect, useState } from 'react'
import { AuthNotRequired } from '../components/AuthNotRequired';




function Signup() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (isClient)
		return (<AuthNotRequired>
			<Center h='100vh'>
				<SignUpUser />
			</Center>
		</AuthNotRequired>)

	return <>Loading...</>
}

export default Signup;
