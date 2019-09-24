import { Router } from 'express'
const TagTeam  = require('../models/tagteam')

export const tagteamRouter = Router()
tagteamRouter.get('/', (req, res) => {
	TagTeam.find((err, tagteams) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!tagteams) return res.status(404).send({message: 'tagteams not founded!'})
		return res.status(200).send({tagteams})
	})
})

tagteamRouter.get('/:id', (req, res) => {
    const tagteamId = req.params.id;
    
	TagTeam.findById(tagteamId, (err, tagteam) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!tagteam) return res.status(404).send({message: 'tagteam not founded!'})
		return res.status(200).send({tagteam})
	})
})
