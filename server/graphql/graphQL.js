const { buildSchema } = require('graphql');
// const TodoList = require('../model/toDoListSchema.js');
// const newUsers = require('../model/User.js');
const { mutations } = require('./mutation/index.js');
const {resolvers} = require( './resolvers/index.js'); 
const { query } = require('./Query/index.js');





const schema = buildSchema(
	`
type Task{
	id: String 
	task: String 
	status: Boolean
	userId: String
}

type User{
    id:ID!
	firstName: String!
	lastName: String!
	email: String!
	password: String!
	tasksIds: [Task!]
}

type  Query {
	
	${query.join('\n')}
}

type Mutation {
	${mutations.join( '\n' )}
}
`,

)




module.exports = { schema, resolvers }
