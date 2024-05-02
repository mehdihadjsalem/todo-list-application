const task = require('./task.js')
const user = require('./user.js')
const resolvers ={
	Query:{
		...task.Query,
		...user.Query,


	},
	Mutation: {
		...task.Mutation,
		...user.Mutation
	}
}
module.exports={resolvers}