import { Router } from 'express'
const User  = require('../models/user')

export const userRouter = Router()
userRouter.get('/', (req, res) => {
	User.find((err, users) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!users) return res.status(404).send({message: 'users not founded!'})
		return res.status(200).send({users})
	})
})
