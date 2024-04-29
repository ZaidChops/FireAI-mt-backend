const Todo = require("../Models/todo-Model")


// GET-ALL
const getTodos = async (req,res) =>{
    const allTodos = await Todo.find()
    res.json(allTodos)
}

// CREATE
const createTodo = async (req,res) =>{
   const {title, description, isCompleted} = req.body
    // console.log("req", req.body)
   if(!title || !description){
    res.status(400)
    throw new Error("Please fill all details".red)
   }

   const newTodo = await Todo.create({
    userId: req.params.userId ,
    title,
    description,
    isCompleted
   })
//    console.log("object", newTodo);
   if(newTodo){
    res.status(200).json(newTodo)
   }
   else{
    throw new Error("Something went wrong".red)
   }
}

// GET-SINGLE
const getSingleTodo = async (req,res)=>{
    const singleTodo = await Todo.findById(req.params.id)

    if(!singleTodo){
        res.status(404)
        throw new Error("Todo not found")
    }
    res.status(200).json(singleTodo)
}

// DELETE
const deleteTodo = async (req,res) =>{
    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({
        msg: "Todo Deleted"
    })
}

// UPDATE
const updateTodo = async (req,res) =>{
   const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {new:true})

   if(!updated){
    res.status(404)
    throw new Error("Something went wrong")
   }
   res.status(200).json(updated)

}

module.exports = {getTodos, createTodo, getSingleTodo, deleteTodo, updateTodo}