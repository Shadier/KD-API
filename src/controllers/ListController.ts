import { Router } from 'express'
const List  = require('../models/list')
const Product  = require('../models/product')


export const listRouter = Router()
listRouter.get('/', (req, res) => {
	List.find((err, lists) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!lists) return res.status(404).send({message: 'lists not founded!'})
		return res.status(200).send({lists})
	})
})

listRouter.get('/:id', (req, res) => {
	const listId = req.params.id;

	List.findById(listId, (err, list) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!list) return res.status(404).send({message: 'List not founded!'})
		return res.status(200).send({list})
	})
})

listRouter.patch('/:id', (req, res) => {
	const listId = req.params.id;
	const params = req.body;

	if(params.productId){
		Product.findById(params.productId, (err, product) => {
			if(err) return res.status(500).send({message: 'Internal Server error, List doesn´t saved'})
			if(!product) return res.status(400).send({message: "that product doesnt exists"})
			else{
				params.product = product;
				List.findByIdAndUpdate(listId, params, (err, listUpdated) => {
					if(err) return res.status(500).send({message: 'Internal Server error, List doesn´t updated'})
					if(listUpdated) res.status(200).send({messafe: 'List updated successfully!'})
					else res.status(404).send({message: 'List not updated!'})
				})
			}
		})
	}else{
		List.findByIdAndUpdate(listId, params, (err, listUpdated) => {
			if(err) return res.status(500).send({message: 'Internal Server error, List doesn´t updated'})
			if(listUpdated) res.status(200).send({messafe: 'List updated successfully!'})
			else res.status(404).send({message: 'List not updated!'})
		})
	}
	
	
})


listRouter.delete('/:id', (req, res) => {
	const listId = req.params.id;
	const params = req.body;

	List.findByIdAndRemove(listId, (err, listDeleted) => {
		if(err) return res.status(500).send({message: 'Internal Server error, Client doesn´t Deleted'})
		if(listDeleted) res.status(200).send({messafe: 'List Deleted successfully!'})
		else res.status(404).send({message: 'List not Deleted!'})
	})
	
})


listRouter.post('/', (req, res) => {
	const params = req.body;
	let list = new List();

	if (params.quantity && params.subtotal && params.purchaseId && params.productId) {
		list.quantity = params.quantity
		list.subtotal = params.subtotal
		list.purchaseId = params.purchaseId
		list.productId = params.productId

		Product.findById(list.productId, (err, product) => {
			if(err) return res.status(500).send({message: 'Internal Server error, List doesn´t saved'})
			if(!product) return res.status(400).send({message: "that product doesnt exists"})
			else{
				list.product = product
				list.save((err, clientStored) => {
					if(err) return res.status(500).send({message: 'Internal Server error, Client doesn´t saved'})
					if(clientStored) res.status(200).send({client: clientStored})
					else res.status(404).send({message: 'Client not saved!'})
				})
			}
		})
	} else {
		res.status(400).send({message: 'Send all data please'})
	}
})