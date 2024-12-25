const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');
const user = require('./routes/users');
const connectDB = require('./config/db');

const app = express();

const PORT = 8080;

// body parser middleware
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use('/api/v1/user', user)

//mongodb connection
connectDB();

app.use("/", (req, res)=>{
  res.send("Hlw, Welcome To User Management System")
})

//server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
})
