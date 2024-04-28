const express = require("express")
const {getTodos, createTodo, getSingleTodo, deleteTodo, updateTodo} = require("../Controlers/todoControler")
const router = express.Router()

router.get('/',getTodos)

router.post('/', createTodo)

router.get('/:id', getSingleTodo)

router.delete('/:id', deleteTodo)

router.put('/:id', updateTodo)

module.exports = router