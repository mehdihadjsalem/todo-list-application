import { VStack, Heading, Text, Button, HStack, Icon, Input, InputRightElement, InputGroup, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useMutation } from '@apollo/client';
import { Add_user } from '../graphQl/Mutations';
import Link from 'next/link';
import Router from 'next/router';





const SignUpUser = () => {
	const [addNewUser] = useMutation(Add_user)
	const toast = useToast()
	// const User = sessionStorage.getItem("user") 

	// if(User){
	// 	console.log(JSON.stringify(User),"getUser")

	// }
	const handleSubmit = (values: any) => {
		if (!values?.firstName || !values?.lastName || !values?.email || !values?.password) {
			toast({
				title: 'Error!',
				description: "Please fill the form.",
				status: 'error',
				duration: 9000,
				isClosable: true,
			})
			return
		}
		addNewUser({
			variables: {
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				password: values.password
			}, onCompleted: (data) => {
				sessionStorage.setItem("user", JSON.stringify(data?.AddUser))
				Router.push("/")
				toast({
					title: 'Account created.',
					description: "We've created your account for you.",
					status: 'success',
					isClosable: true,
				})
			}
		})

	}
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)
	return (
		<VStack w='40%' bgColor='#E6FFFA' p='4' borderRadius='lg'  >
			<Heading>Sign Up</Heading>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
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
					if (!values.firstName) {
						errors.firstName = 'Required';
					}
					if (!values.lastName) {
						errors.lastName = 'Required';
					}
					return errors;
				}}
				onSubmit={handleSubmit}
			>
				{(formik) => (
					<Form>
						<VStack>
							<Text> First Name: </Text>
							<VStack>
								<HStack>
									<Icon as={FaRegUser} />

									<Input
										name="firstName"
										placeholder='Put your Name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.firstName} />
								</HStack>
								{formik.touched.firstName && formik.errors.firstName && <Text color="red" >{formik.errors.firstName}</Text>}

							</VStack>

							<Text> Last Name: </Text>
							<VStack>
								<HStack>
									<Icon as={FaRegUser} />

									<Input
										id="lastName"
										name="lastName"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.lastName}
									/>
								</HStack>
								{formik.touched.lastName && formik.errors.lastName && <Text color="red" >{formik.errors.lastName}</Text>}

							</VStack>

							<Text> Email: </Text>
							<VStack>
								<HStack>
									<Icon as={MdAlternateEmail} />

									<Input
										name="email"
										type="email"
										placeholder='Enter email'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.email} />
								</HStack>
								{formik.touched.email && formik.errors.email && <Text color="red" >{formik.errors.email}</Text>}

							</VStack>

							<Text> Password: </Text>
							<VStack>
								<HStack>
									<Icon as={RiLockPasswordLine} />

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
								<Button type="submit" colorScheme='teal' _hover={{ _disabled: { cursor: `not-allowed` } }} isDisabled={!formik.isValid} > Save</Button>

								<Button >
									<Link href={`/`} >Sign In</Link>
								</Button>


							</VStack>
						</VStack>
					</Form>
				)}
			</Formik>
		</VStack>
	)
}

export default SignUpUser