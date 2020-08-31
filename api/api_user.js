const express = require('express')
const router = express.Router()
const moment = require('moment')

const connect = require('../DB')

// ADD DATA TO DATABASE

router.get('/add-user',(req,res)=>{
    let id_user = req.query.id_user
    let username = req.query.username
	let email = req.query.email
	let datetime = moment().format('DD MM YYYY hh:ss')

	if(id_user&&username&&email){
		let sql = 'INSERT INTO data_user (id_user, username, email, datetime_update) VALUES ?'
		let value = [[id_user,username,email,datetime]]
		let data_json = {id_user,username,email,datetime}

		connect.query(sql,[value],(err,result)=>{
			if(err) throw err;
			console.log("Berhasil Menambahkan User"+username)
			res.json(data_json)
        })
        console.log('Berhasil Menambahkan Id '+id_user)
    }
    
    else{
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Add"}
		res.json(response)
	}

})

router.get('/edit-user',(req,res)=>{
	let id_user = req.query.id_user
    let username = req.query.username
	let email = req.query.email
	let datetime_update = moment().format('DD MM YYYY hh:ss')

	if(id_book&&tittle&&writer){
		let sql = 'UPDATE data_user SET username = ?, email = ?, WHERE id = '+id_user
		let update_data = {
			username,
			email,
			datetime_update
		}
		connect.query(sql,[username,email,datetime_update],(err, result)=>{
		    if (err) throw err;
		    console.log("Berhasil Edit User dengan ID "+id_user);
		    res.json(update_data)
        });    
        console.log('Berhasil Mengedit Id '+id_user)
    }
    
    else{
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Update"}
		res.json(response)
	}
})

router.get('/delete-user',(req, res)=>{

	let id_user = req.query.id_user

	if (id_user&&id_user>0) {
		let sql = 'DELETE FROM data_user WHERE id_user = '+id_user

		connect.query(sql,(err, result)=>{
			if (err) throw err;
		    console.log("Successfully Delete");
		    let response = {response : "Success",
		    			id_user : id_user,
		    			action : "Delete"}
		    res.json(response)
		});console.log('Berhasil Menghapus Id '+id_user)
    }
    
    else {
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Delete"}
		res.json(response)
	}

})


// SELECT DATABASE

router.get('/user',(req,res)=>{

	let sql = 'SELECT * FROM data_user'

	connect.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})
})

router.get('/user/:id',(req,res)=>{

	let sql = 'SELECT * FROM data_user WHERE id_user = '+req.params.id

	connect.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})
})


module.exports = router;