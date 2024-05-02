const task= `
    AddTodo(userId: String! , task: String!, status: Boolean! ): Task
	UpdateTodo ( userId: String!, id : ID!, task: String! ,  status: Boolean! ) : Task
	DeletTodo (userId: String!, id: ID!) : Boolean
	UpdateStatus ( userId: String!, id : ID! , status : Boolean!) : Boolean
`
module.exports = { task }
