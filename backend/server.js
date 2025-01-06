import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000;
connectDB(); // connect to database
const app = express();

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.get('/', (req, res) => {
    console.log("api is running")
    res.send('Hello World!')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})