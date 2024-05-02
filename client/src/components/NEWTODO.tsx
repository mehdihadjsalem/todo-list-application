import React, { useEffect, useState } from 'react'
import { VStack, Text, HStack, Input, Button, IconButton, StackDivider, Badge, useToast } from '@chakra-ui/react';
import { MdOutlineDeleteForever, MdOutlineModeEdit, MdOutlineDoneAll, MdRemoveDone } from "react-icons/md";
import { useQuery, useMutation } from '@apollo/client';
import { GetTodoList } from '../graphQl/Queries';
import { Add_Todo, Update_Todo, Delete_Todo, Update_Status } from '../graphQl/Mutations';





const NEWTODO = () => {
	// Initialise toast pour afficher les messages
	const toast = useToast()
	// Initialise l'état pour stocker la liste de tâches, les nouvelles tâches et l'objet de mise à jour
	const [Todo, setTodo] = useState<any>([]);
	const [newTASKS, setNewTASKS] = useState<any>("");
	const [Update, setUpdate] = useState<any>("");
	const [userId, setUserId] = useState<any>("")

	// Get user id from session storage
	let User:any = undefined
	if (typeof window !== 'undefined') User = sessionStorage?.getItem("user") 	
		// Définir l'ID utilisateur lorsque les données utilisateur sont disponibles
	useEffect(() => {
		if (User) {
			setUserId(JSON.parse(User).id)
		}
	}, [User])
	/* //////////Get data///// */
	// Récupère les données de la liste de tâches à l'aide du hook useQuery
	const { data } = useQuery(GetTodoList, { variables: { userId: userId }, skip: !userId });

	// runder the page to get this complet data 

	useEffect(() => {
		setTodo(data?.GetTodoList)
	}, [data])

	/* //////////Add Task///// */
	// Initialise l'ajout d'une nouvelle mutation de tâche
	const [addNewTask] = useMutation(Add_Todo);
	// Fonction pour ajouter une nouvelle tâche
	const AddTodo = () => {
		// Check if new tasks and user id are available

		if (!newTASKS || !userId) {
			toast({
				title: ' NO content .',
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
			return
		}

		// send data to back end and oncomplete  return full data task with id 
		addNewTask({
			variables: { userId: userId, task: newTASKS, status: false }, onCompleted(dataNewTask) {

				setTodo([...Todo, dataNewTask?.AddTodo])

				setNewTASKS("")
			}
		});


	}

	/* //////////Update Task///// */
	// Initialize UpdateTaskTodo mutation

	const [UpdateTaskTodo] = useMutation(Update_Todo);
	// Function for updating a task

	const UpdateTodo = (id:any) => {
		// Crée une copie de la liste de tâches et met à jour la tâche avec l'identifiant donné

		let NextUpdate = [...Todo]

		let UpdatTask = NextUpdate.map((task, userId) => {
			// Met à jour la tâche si l'identifiant correspond
			if (userId || task?.id === Update.id) {
				return ({ ...task, task: Update.task })
			}
			return task
		})
		// Mettre à jour la tâche à l'aide de la mutation et mettre à jour la liste de tâches
		UpdateTaskTodo({ variables: { userId: userId, id: Update.id, task: Update.task, status: false } });

		setTodo(UpdatTask)
		setUpdate('')
	}
	// Fonction d'annulation de la mise à jour de la tâche
	const cancelUpdate = () => {
		setUpdate('');
	}
	// Fonction de gestion du changement d'entrée de mise à jour de la tâche
	let changeTask = (e:any) => {
		let newTask = {
			id: Update.id,
			task: e.target.value,
			status: Update.status ? true : false
		}
		setUpdate(newTask)
	}
	/* //////////Delet Task///// */

	// Initialisation de la mutation DeletTaskTodo
	const [DeletTaskTodo] = useMutation(Delete_Todo);

	const DeletTodo = (id:any, userId?:any) => {


		var deletTask = Todo.filter((task:any) => task?.id !== id)

		DeletTaskTodo({ variables: { userId: userId, id } });
		setTodo(deletTask)

	}

	/* //////////Done Task///// */

	

	const [UpdateStatusTask] = useMutation(Update_Status);

	const DoneTodo = (oldtask:any) => {
		let DoneTAsk = Todo.map((task:any) => {
			if (userId || task?.id === oldtask.id) {
				return ({ ...task, status: !task.status })
			}
			return task
		})

		UpdateStatusTask({ variables: { userId: userId, id: oldtask.id, status: !oldtask.status } });

		setTodo(DoneTAsk)

		// DoneTask.status = !DoneTAsk.status
		// setTodo(DoneTask)
		// const DoneTAsk = [...Todo]
		// let dom = DoneTAsk[id].status = !DoneTAsk[id].status
		// setTodo(dom)

	}





	return (
		<VStack>

			{Update ? (
				<HStack>
					<Input value={Update.task}
						onChange={(e) => changeTask(e)} />
					<Button
						colorScheme='yellow'
						px='8'
						onClick={UpdateTodo}> Update</Button>
					<Button
						colorScheme='yellow'
						px='8'
						onClick={cancelUpdate}> Cancel</Button>

				</HStack>

			) : (
				<HStack>

					<Input
						variant='filled'
						placeholder='ADD New TAsk ......'

						value={newTASKS}
						onChange={(e) => setNewTASKS(e.target.value)} />
					<Button
						colorScheme='green'
						px='8'
						onClick={AddTodo}> ADD TODO</Button>

				</HStack>

			)
			}
			{Todo?.length > 0 ? (<VStack
				// bg='gray.50'
				borderColor='gray.100'
				borderWidth='2px'
				p='4'
				borderRadius='lg'
				w='100%'
				maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
				// alignItems='stretch'
				mt={7}
				divider={<StackDivider />}

			>


				{Todo?.map((task:any, index:any) => {

					return (<HStack key={index}>
						<HStack>
							<Text
								// bgColor='white'
								borderColor='gray.300'
								borderRadius='lg'
								w='25px'
								borderWidth='2px'
								size='lg' >
								{index + 1}</Text>
							<Text>{task?.task} </Text>
						</HStack>
						<HStack>
							{/* //////////Delet Task///// */}
							<IconButton
								colorScheme='red'
								// isRound='true'
								onClick={() => DeletTodo(task?.id)}
								icon={<MdOutlineDeleteForever size='25px' />}
								 aria-label={''} />



							{/* //////////Update Task///// */}
							<IconButton
								colorScheme='yellow'
								// isRound='true'
								onClick={() => setUpdate({
									id: task?.id,
									task: task?.task,
									status: task?.status ? true : false
								})} icon={<MdOutlineModeEdit size='20px' />} aria-label={''} />


							{/* //////////Done Task///// */}
							{task?.status ?
								<IconButton
									colorScheme='green'
									// isRound='true'
									onClick={() => DoneTodo(task)}
									icon={<MdOutlineDoneAll size='20px' />} aria-label={''} />
								:
								<IconButton
									colorScheme='yellow'
									// isRound='true'
									onClick={() => DoneTodo(task)}
									icon={<MdRemoveDone size='20px' />} aria-label={''} />}
						</HStack>


					</HStack>)




				}
				)}
			</VStack>) : (
				<Badge
					colorScheme='green'
					p={4}
					m={4}
					borderRadius='lg' >
					no Todo you need to add ...
				</Badge>
			)}










		</VStack>

	)
}

export default NEWTODO