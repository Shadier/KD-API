'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import { clientRouter } from './controllers/ClientController'
import { productRouter } from './controllers/ProductController'
import { listRouter } from './controllers/ListController'
import { purchaseRouter } from './controllers/PurchaseController'
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tienda', { useNewUrlParser: true })
		.then(() => {
			console.log('conected to database successfully!')
		})
		.catch(err => console.error(err))

const port = process.env.port || 1337

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/clients', clientRouter)
app.use('/products', productRouter)
app.use('/lists', listRouter)
app.use('/purchases', purchaseRouter)



app.get('/', (req, res)=> {
    res.send("API is running OK")
})

app.listen(port, ()=> {
    console.log('App is running in port: ' + port)
})
