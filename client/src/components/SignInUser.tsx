import React from 'react'
import { VStack, Heading, Text, Button, HStack, Icon, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { MdAlternateEmail, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLazyQuery } from '@apollo/client';
import { LoginUser } from '../graphQl/Queries';
import Link from 'next/link';
import Router from 'next/router';





const SignInUser = () => {
	const [CompteUser] = useLazyQuery(LoginUser)
	const toast = useToast()
	const handleSubmit = (values: any) => {
		if (!values.email || !values.password) {
			toast({
				title: 'Error!',
				description: "Please fill the form.",
				position: `top`,
				status: 'error',
				duration: 10000, // 2s
				isClosable: true,
			})
			return
		}
		CompteUser({
			variables: {
				email: values.email,
				password: values.password
			}, onCompleted: (data) => {
				sessionStorage.setItem("user", JSON.stringify(data?.login))
				Router.push(`/todoList`)

				toast({
					title: 'Connected successfully!',
					position: `top-right`,
					status: 'success',
					isClosable: true,
				})
			}, onError: (error) => {
				toast({
					title: 'Error!',
					position: `top`,
					description: error?.message,
					status: 'error',
					duration: 10000, //10s
					isClosable: true,
				})
			}
		})
	}
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)
	return (
		<VStack w='40%' bgColor='#E6FFFA' p='4' borderRadius='lg' alignContent='center'>

			<Heading>Sign In</Heading>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				validate={values => {
					const errors: any = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address';
					}
					if (!values.password) {
						errors.password = 'Required';
					}
					return errors;
				}}
				onSubmit={handleSubmit}
			>
				{(formik) => {
					return (
						<Form>
							<VStack>
								<Text> Email: </Text>
								<VStack w="full">
									<HStack w="full">
										<Icon as={MdAlternateEmail} />
										<Input
											name="email"
											type="email"
											placeholder='Enter email'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.email} />
									</HStack>
									{formik.touched.email && formik.errors.email && <Text color="red">{formik.errors.email}</Text>}

								</VStack>
								<Text> Password: </Text>
								<VStack w='full'>
									<HStack w='full'>
										<Icon as={RiLockPasswordLine} />
										{/* <Input
										name="password"
										type="password"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.password} /> */}
										<InputGroup size='md'>
											<Input
												pr='4.5rem'
												type={show ? 'text' : 'password'}
												placeholder='Enter password'
												name="password"
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.password}
											/>
											<InputRightElement width='3rem'>
												<Button h='1.75rem' size='sm' onClick={handleClick}>
													{show ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
												</Button>
											</InputRightElement>
										</InputGroup>
									</HStack>
									{formik.touched.password && formik.errors.password && <Text color="red">{formik.errors.password}</Text>}
								</VStack>
								<VStack p='4'>
									<Button type="submit" colorScheme='teal'> submit</Button>
									<Button >
										<Link href="/signup" >Sign Up</Link>
									</Button>
								</VStack>
							</VStack>
						</Form>
					)
				}}
			</Formik>
		</VStack>
	)
}

export default SignInUser