'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import {entrada} from './controllers/mailController'
const cors = require('cors');
const port = process.env.port || 3000

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/mail', entrada)





app.get('/', (req, res)=> {
    res.send("API is running OK")
})

app.listen(port, ()=> {
    console.log('App is running in port: ' + port)
})
