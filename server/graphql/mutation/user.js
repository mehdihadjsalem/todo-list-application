const user = `
    AddUser( firstName:String!,  lastName:String! , email:String!, password:String!): User
	UpdateUser(id: ID!, firstName:String!,  lastName:String! , email:String!, password:String!) : User
	DeleteUser(id: ID!): Boolean 
`
module.exports = { user }
