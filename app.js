const express = require('express');
const chalk = require('chalk');
const app = express();
const BodyParser = require('body-parser');

// CONNECT API
const api_user = require('./api/api_user');
const api_book = require('./api/api_book');

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended: false}))

app.use(api_user);
app.use(api_book);

app.get('/', (req, res)=>{
    res.send('Data Perpustakaan');
    console.log(chalk.green('Connect Data Perpustakaan'));
})

app.listen(8000)