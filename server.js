const express = require('express') 
const colors = require('colors');
const { connectDB } = require('./Config/db-config');
const dotenv = require('dotenv').config()
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// DB CONNECTION
connectDB()

// CORS
app.use(
    cors({
      origin: `${process.env.FRONTEND_URL}`,
      methods: "GET,PUT,POST,DELETE",
      credentials: true,
    })
  );

// Handle preflight requests
app.options(`${process.env.FRONTEND_URL}`, cors());

// BODY PARCER
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// USER ROUTE
app.use('/api/user', require('./Routes/authrouters'))

// TODO ROUTE
app.use('/api/todo', require('./Routes/todoRoutes'))

// Root
app.get('/', (req,res)=>{
    res.json({
        msg : "Wellcome to the FireAI"
    })
})

// Server
app.listen(PORT, () => {
    console.log(`Server is running at: ${PORT}`.green)
} )