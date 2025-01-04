import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
import products from './data/products.js';

const port = process.env.PORT || 5000;
connectDB(); // connect to database
const app = express();

app.get('/', (req, res) => {
    console.log("api is running")
    res.send('Hello World!')
})
app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:id', (req, res) => {
    try {
        const product = products.find(x => x._id === req.params.id)
        if(!product) throw new Error('Product not found')
        res.json(product)
    } catch (error) {
       res.status(404).send(error.message)
    }
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})