import { gql } from "@apollo/client";


export const Add_Todo = gql`
    mutation AddTodo ( $userId : String!, $task : String!, $status : Boolean! ){
        AddTodo ( userId :$userId , task : $task , status : $status ) {
            id 
            task 
            status
        }
    }`


export const Update_Todo = gql`
    mutation UpdateTodo ( $userId : String! ,$id: ID! ,$task : String!, $status : Boolean!){ 
        UpdateTodo ( userId :$userId , id : $id ,task : $task , status : $status )
            {
            id 
            task
            status
             }
    }`


export const Delete_Todo =  gql `
	mutation DeletTask ($userId : String!, $id : ID! ) {
		DeletTodo( userId :$userId , id : $id ) 
	}`

export const Update_Status = gql ` 
mutation UpdateStatus ($userId : String! ,$id: ID! , $status : Boolean!){
	UpdateStatus (userId :$userId , id : $id, status: $status )
	

}
`
export const Add_user =  gql`
mutation AddUser ( 
    $firstName: String!, 
    $lastName: String!,
	$email: String!,
	$password: String!  ){
    AddUser ( 
        firstName : $firstName , 
        lastName : $lastName ,
        email: $email,
        password: $password    
    ) {
      id
	  firstName
	  lastName
	  email
	  password
}
    }
`
