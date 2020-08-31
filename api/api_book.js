const express = require('express')
const router = express.Router()
const moment = require('moment')

const connect = require('../DB')

// ADD DATA TO DATABASE

router.get('/add-book',(req,res)=>{
	let id_book = req.query.id_book
	let tittle = req.query.tittle
	let writer = req.query.writer
	let datetime = moment().format('DD MM YYYY hh:ss')

	if(id_book&&tittle&&writer){
		let sql = "INSERT INTO data_book (id_book, tittle, writer, datetime_update) VALUE ? ";
        let value = [[id_book,tittle,writer,datetime]]
        
		connect.query(sql,[value],(err,result)=>{
			if(err) throw err;
			console.log("Berhasil Menambahkan Buku dengan ID "+id_book)
			res.json(result)
        })
    }
    
    else{
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Add"}
		res.json(response)
	}
})

router.get('/edit-book',(req,res)=>{
	let id_book = req.query.id_book
    let tittle = req.query.tittle
	let writer = req.query.writer
	let datetime_update = moment().format('DD MM YYYY hh:ss')

	if(id_book&&tittle&&writer){
		let sql = 'UPDATE data_book SET tittle = ?, writer = ? WHERE id_book = '+id_book
		let update_data = {
			tittle,
			writer,
			datetime_update
		}
		connect.query(sql,[tittle,writer,datetime_update],(err, result)=>{
		    if (err) throw err;
		    console.log("Berhasil Edit Buku dengan ID "+id_book);
		    res.json(update_data)
        });    
        console.log('Berhasil Mengedit Id '+id_book)
    }
    
    else{
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Update"}
		res.json(response)
	}
})

router.get('/delete-book',(req, res)=>{

	let id_book = req.query.id_book

	if (id_book&&id_book>0) {
		let sql = 'DELETE FROM data_book WHERE id_book = '+id_book

		connect.query(sql,(err, result)=>{
			if (err) throw err;
		    console.log("Successfully Delete");
		    let response = {response : "Success",
		    			id_book : id_book,
		    			action : "Delete"}
		    res.json(response)
        });
        console.log('Berhasil Menghapus Buku Ber-ID '+id_book)
    }
    
    else {
		let response = {response : "Failed",
		    			Error : "Invalid Input",
		    			action : "Delete"}
		res.json(response)
	}

})


// SELECT DATABASE

router.get('/book',(req,res)=>{

	let sql = 'SELECT * FROM data_book'

	connect.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})
})

router.get('/book/:id',(req,res)=>{

	let sql = 'SELECT * FROM data_book WHERE id_book = '+req.params.id

	connect.query(sql,(err,result,fields)=>{
		if(err) throw err;
		res.json(result)
	})
})

module.exports = router;