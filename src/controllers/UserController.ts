import { Router } from 'express'
const theUser  =    require('../models/user')

export const userRouter = Router()

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 

userRouter.get('/', (req, res) => {
	theUser.find({status:true,userIA:false},(err1, users) =>{
		if(err1) return res.status(500).send({message: 'Internal Server error'})
		if(!users) return res.status(404).send({message: 'users not founded!'})
		if(users) return res.status(200).send({users})
	})
})

userRouter.get('/total', (req, res) => {
	theUser.find((err1, users) =>{
		if(err1) return res.status(500).send({message: 'Internal Server error'})
		if(!users) return res.status(404).send({message: 'users not founded!'})
		if(users) return res.status(200).send({users})

		
		
	})
})

userRouter.get('/:id', (req, res) => {
	const userId = req.params.id;
	if(req.params.id!=null){
		theUser.findById(userId, (err, user) =>{
			const temp=user.last_partner 
			if(temp!=null){
				theUser.findById(temp, (err, partner) =>{
					if(err) return res.status(500).send({message: 'Internal Server error'})
					if(!partner) return res.status(404).send({message: 'user not founded!'})
					return res.status(200).send({user,partner})
				})

			}
			else{
				if(err) return res.status(500).send({message: 'Internal Server error'})
				if(!user) return res.status(404).send({message: 'user not founded!'})
				return res.status(200).send({user})
	}

		})
	}


})


userRouter.post('/create',(req,res)=>{
	const params= req.body;


	theUser.findOne({email:params.email},(err,user)=>{
	if(err)
	return res.status(500).send({message:'Internal Error'})
	if(user)
	return res.status(404).send({message:"Email already in use"})
	else{
		let usuario = new theUser();
		usuario.last_partner=null;
		usuario.name= params.name;
		usuario.status= true;
		usuario.lastname=params.lastname;
		usuario.email=params.email;
		usuario.password= encrypt("12345");
		usuario.role=params.role;
		usuario.userIA= params.userIA;
		usuario.monday=params.monday;
		usuario.tuesday=params.tuesday;
		usuario.wednesday=params.wednesday;
		usuario.thursday=params.thursday;
		usuario.friday=params.friday;
		usuario.remoteDays=params.remoteDays;
		usuario.last_day=params.last_day;
		usuario.report=params.report;
		usuario.save((err,usrsave)=>{
			if(err) return res.status(500).send({message: 'Internal Server error, User doesn´t saved'})
			if(usrsave) res.status(200).send({client: usrsave})
			else res.status(404).send({message: 'Usuario not saved!'})
		})

	}
	
	})

})

userRouter.delete('/:id', (req, res) => {
	const userId = req.params.id;
	if(req.params.id!=null){
		theUser.update({_id:userId},{$set: {status:false}},(err,upday)       =>{
				if(err) return res.status(500).send({message: 'Internal Server error'})
				if(!upday) return res.status(404).send({message: 'user not founded!'})
				return res.status(200).send({upday})
	

		})
	}


})

userRouter.post('/reset',(req,res)=>{
	const params=req.body
	if(params.id!=null&& params.password!=null){
		const userId = params.id;
		const passw = encrypt(params.password);
		theUser.update({_id:userId},{$set: {password:passw}},(err,upday)       =>{
			if(err) return res.status(500).send({message: 'Internal Server error'})
			if(!upday) return res.status(404).send({message: 'user not founded!'})
			return res.status(200).send({message: 'Updated!'})
	})
	}



}  )


userRouter.patch('/update',(req,result)=>{
	const params= req.body;
	const leId=params.id;
	theUser.update({_id:leId},{$set: params},(err,res)=>{
		if(err) return result.status(500).send({message: 'Internal Server error, User doesn´t saved'})
		if(res) result.status(200).send({client: res})
		else result.status(404).send({message: 'Usuario not saved!'})
	})
})


userRouter.post('/access',(req,res)=>{
const params =req.body;
if(params.email!=null&& params.password!=null){
	const couriel=params.email;
	console.log(couriel,params.password);
	const motpasse=encrypt(""+params.password+"");
	theUser.findOne({email:couriel,password:motpasse},(err,user)=>{
	if(err)
	return res.status(500).send({message:'Internal Error'})
	if(!user)
	return res.status(404).send({succes:false})
	else
	return res.status(200).send({succes:true, id:user._id})
	})
	
}
else
	return res.status(404).send({succes:false})






})



