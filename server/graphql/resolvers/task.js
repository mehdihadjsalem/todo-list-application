const { GraphQLError } = require('graphql');
const User = require('../../model/User.js');
const TodoList = require('../../model/toDoListSchema.js');


module.exports = {
	Query: {
		GetTodoList: async (_,{ userId }) => {
			
			const user = await User.findById(userId)
			const tasksId = user.tasksIds
			return tasksId.map(async (id)=>{
				// chercher  la tache correspondant a l'id dans la base de données
				const task = await TodoList.findById(id)
				return task
			})
		},
	}, 

	Mutation: {
		AddTodo: async (_, { userId, task, status }) => {

			if (!task) {
				throw new GraphQLError("Please enter title")
			}
			if(!userId){
				return new GraphQLError("Add task not working!")
			}
			try {
				const newTask = new TodoList({ task, status, userId })
				 const result = await newTask.save()
				 await User.updateOne({ _id: userId }, { $push : {tasksIds: result.id }  });

				return result;
			}
			catch (error) {
				console.log(error)
				throw new GraphQLError('Error creating the task: ' + error)
			}			
		},

		UpdateTodo: async (_, { userId, id, task, status }) => {

			if (!id) {
				throw new GraphQLError("Please enter id")
			}
			if (!task) {
				throw new GraphQLError("Please enter title")
			}
			if(!userId){
				return new GraphQLError("Add task not working!")
			}

			try {
				const updateTask = await TodoList.updateOne( { _id: id, userId : userId }, { $set: { task, status } })
				// verifier si  lTask fait le mise a jour dans la base de données
				if (updateTask.modifiedCount > 0) {
					return { id, task, status };

				} else {
					throw new GraphQLError('Error Updating the task')
				}
			}
			catch (error) {
				console.log(error)
				throw new GraphQLError('Error Updating the task: ' + error)
			}
		},


		UpdateStatus: async (_, { userId, id, status }) => {
			if (!id) {
				throw new GraphQLError("Please enter id")
			}
			if(!userId){
				throw new GraphQLError("Add task not working!")
			}
			try {
				await TodoList.updateOne({ _id: id , userId : userId }, { $set: { status } })

			}

			catch (error) {
				console.log(error)
				throw new GraphQLError('Error Updating the task: ' + error)
			}
		},

		DeletTodo: async (_, { id, userId }) => {
			if (!id) {
				throw new GraphQLError("please provide an ID")
			}
			if(!userId){
				return new GraphQLError("Add task not working!")
			}
			const present = await TodoList.findById(id);
			if (!present) {
				throw new GraphQLError(`No Task with the id ${id}`)
			}

			try {
				await TodoList.deleteOne({ _id: id , userId : userId  })
				await User.updateOne({ _id: userId  }, {$pull:{
					tasksIds: id
				}})
				return true

			} catch (error) {
				console.log(error)
				throw new GraphQLError("Could  not delete Task" + error)
			}
		}
	}
}