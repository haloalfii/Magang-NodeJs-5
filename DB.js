const mysql = require('mysql');
const chalk = require('chalk');

const connect = mysql.createConnection({
    host:'localhost',
	user:'root',
	password:'',
	database:'db_perpustakaan'
})

connect.connect((error)=>{
	if (error) throw error;
    console.log(chalk.green('Connet To Database Now!'));
})

module.exports = connect;