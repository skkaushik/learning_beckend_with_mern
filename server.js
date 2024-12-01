const express = require('express');
const user = require('./routes/users');
const connectDB = require('./config/db');

const app = express();

const PORT = 8080;

// body parser middleware
app.use(express.json());

//routes
app.use('/api/v1/user', user)

//mongodb connection
connectDB();

app.use("/", (req, res)=>{
  res.send("Hlw, Welcome To User Management System")
})

//server start
app.listen(PORT, () => {
  console.log("Server is running")
})
