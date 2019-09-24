'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import { userRouter } from './controllers/UserController'
import { tagteamRouter } from './controllers/TagTeamController'
import { codeRouter } from './controllers/CodeController'
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/KitchenDuty', { useNewUrlParser: true })
		.then(() => {
			console.log('conected to database successfully!')
		})
		.catch(err => console.error(err))

const port = process.env.port || 1337

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use('/tagteams', tagteamRouter)
app.use('/code', codeRouter)



app.get('/', (req, res)=> {
    res.send("API is running OK")
})

app.listen(port, ()=> {
    console.log('App is running in port: ' + port)
})
