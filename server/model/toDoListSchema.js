const mongoose = require('mongoose')


const todoListShema = new mongoose.Schema({
	task: { 
		type : String,
		required : true,
	},
	status: {
		type : Boolean,
		required : true
	},
	userId:{
		type : String,
		required : true
	}
},
)



const TodoList = mongoose.model('TodoList', todoListShema)
module.exports = TodoList;