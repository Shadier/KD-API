import { Router } from 'express'
const Calendar  = require('../models/calendar')

export const calendarRouter = Router()
calendarRouter.get('/', (req, res) => {
	Calendar.find((err, calendars) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!calendars) return res.status(404).send({message: 'calendars not founded!'})
		return res.status(200).send({calendars})
	})
})

calendarRouter.get('/:id', (req, res) => {
    const calendarId = req.params.id;
    
	Calendar.findById(calendarId, (err, calendar) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!calendar) return res.status(404).send({message: 'calendar not founded!'})
		return res.status(200).send({calendar})
	})
})

/*

calendarRouter.post('/', (req, res) => {
	const params = req.body;
	let calendar = new Calendar();

	if (params.month && params.year && params.price) {
		product.codebar = params.codebar
		product.name = params.name
		product.size = params.size
		product.description = params.description
		product.cost = params.cost
		product.price = params.price
		Product.find({codebar: product.codebar.toLowerCase()}).exec((err, products) => {
			if(err) return res.status(500).send({message: 'Internal Server error, product doesn´t saved'})
			if(products && products.length >= 1) return res.status(200).send({message: "codebar registered before"})
			else{
				product.save((err, productStored) => {
					if(err) return res.status(500).send({message: 'Internal Server error, product doesn´t saved'})
					if(productStored) res.status(200).send({product: productStored})
					else res.status(404).send({message: 'product not saved!'})
				})
			}
		})
	} else {
		res.status(400).send({message: 'Send all data please'})
	}
})*/