import { Router } from 'express'
const Code  = require('../models/code')

export const codeRouter = Router()
codeRouter.get('/', (req, res) => {
	Code.find((err, code) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!code) return res.status(404).send({message: 'code not founded!'})
		return res.status(200).send({code})
	})
})
