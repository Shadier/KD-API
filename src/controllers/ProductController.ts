import { Router } from 'express'
const Product  = require('../models/product')


export const productRouter = Router()
productRouter.get('/', (req, res) => {
	Product.find((err, products) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!products) return res.status(404).send({message: 'products not founded!'})
		return res.status(200).send({products})
	})
})

productRouter.get('/:id', (req, res) => {
	const productId = req.params.id;

	Product.findById(productId, (err, product) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!product) return res.status(404).send({message: 'product not founded!'})
		return res.status(200).send({product})
	})
})


productRouter.post('/', (req, res) => {
	const params = req.body;
	let product = new Product();

	if (params.codebar && params.name && params.cost && params.price) {
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
})


productRouter.patch('/:id', (req, res) => {
	const productId = req.params.id;
	const params = req.body;

	Product.update({_id  : productId}, {$set: params}, (err, productUpdated) => {
		if(err) return res.status(500).send({message: 'Internal Server error, product doesn´t updated'})
		if(productUpdated) res.status(200).send({message: 'product updated successfully!'})
		else res.status(404).send({message: 'product not updated!'})
	})
})


productRouter.delete('/:id', (req, res) => {
	const productId = req.params.id;
	const params = req.body;

	Product.findByIdAndRemove(productId, (err, productDeleted) => {
		if(err) return res.status(500).send({message: 'Internal Server error, product doesn´t Deleted'})
		if(productDeleted) res.status(200).send({messafe: 'product Deleted successfully!'})
		else res.status(404).send({message: 'product not Deleted!'})
	})
	
})


