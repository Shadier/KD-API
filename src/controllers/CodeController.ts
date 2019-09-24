import { Router } from 'express'
const Code  = require('../models/code')

export const codeRouter = Router()
codeRouter.get('/', (req, res) => {
	Code.find((err, code) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!code) return res.status(404).send({message: 'code not founded!'})
		return res.status(200).send({currentcode: code[0].codeWeek})
	})
})

codeRouter.post('/', (req, res) => {
	const params = req.body;
	let code = new Code();

	if (params.codeWeek) {
        code.codeWeek = params.codeWeek
        Code.deleteMany({}, (err, success) => {
            if(err) return res.status(500).send({message: 'Internal Server error, can not delete old code.'})
            if(success) {
                code.save((err, codeStored) => {
                    if(err) return res.status(500).send({message: 'Internal Server error, code doesn´t updated'})
                    if(codeStored) res.status(200).send({code: codeStored})
                    else res.status(404).send({message: 'code not updated!'})
                })
            }
            else res.status(404).send({message: 'pcode not updated! ERROR deleting old code.'})
        })
        
	} else {
		res.status(400).send({message: 'Send all data please'})
	}
})