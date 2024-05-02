import { gql } from "@apollo/client";



export const GetTodoList = gql
	` query GetTodoList($userId:String!)
	{ GetTodoList 
   ( userId :$userId) {
   
	   id,
	   task,
	   status
   } }`
export const LoginUser = gql
	`query login ($email:String!, $password:String!){
	    login(email:$email, password:$password) {
			id,
	        email,
	        password
		
} }`