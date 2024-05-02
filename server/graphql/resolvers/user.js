const { GraphQLError } = require('graphql')
const User = require('../../model/User.js')
module.exports = {
	Query: {
		login: async (_, { email, password }) => {
			if (!email || !password) {
				return new GraphQLError("Email and Password are required")
			}
			const checkUser = await User.findOne({ email: email, password: password })
			if (!checkUser) { return new GraphQLError("There was a problem with your login.") }
			return checkUser;
		}
	},

	Mutation: {
		//Add a user to the database
		AddUser: async (_, { firstName, lastName, email, password }) => {

			if (!firstName) {
				return new GraphQLError("Please enter firstName")
			}
			if (!lastName) {
				return new GraphQLError("Please enter lastName")
			}
			if (!email) {
				return new GraphQLError("Please enter email")
			}
			if (!password) {
				return new GraphQLError("Please enter password")
			}
			try {
				const newUser = new User({ firstName, lastName, email, password })
				await newUser.save()
				return newUser;
			}
			catch (err) {
				console.log(err);
				return new GraphQLError('Error creating the userCompte: ' + err)
			}
		},


		// Update an existing User by ID
		UpdateUser: async (_, { id, firstName, lastName, email, password }) => {

			if (!id) {
				return new GraphQLError("Please enter id ")
			}
			if (!firstName) {
				return new GraphQLError("Please enter firstName")
			}
			if (!lastName) {
				return new GraphQLError("Please enter lastName")
			}
			if (!email) {
				return new GraphQLError("Please enter email")
			}
			if (!password) {
				return new GraphQLError("Please enter password")
			}
			try {
				await User.updateOne({ _id: id }, { $set: { firstName, lastName, email, password } });
			}
			catch (error) {
				console.log(error)
				return new GraphQLError('Error Updating the user: ' + error)
			}
		},

		// Deleting a single user by its "id"
		DeleteUser: async (_, { id }) => {

			if (!id) {
				return new GraphQLError("please provide an ID")
			}
			const isExist = await User.findById(id);
			if (!isExist) {
				return new GraphQLError(`No User Found with the id : ${id}`)
			}
			try {
				await User.deleteOne({ _id: id })
				return true
			} catch (error) {
				console.log(error)
				return new GraphQLError("Could  not delete User" + error)
			}
		}
	}
}