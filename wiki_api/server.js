const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config(); //.env

const app = express();

const port = process.env.PORT

//const port = 9999

app.use(express.json()); //To Accept Post body request //Added before Routing

require('./routes')(app) //Routing

app.listen(port, ()=>{
	console.log(`Listening to ${port}`);
})

//Error Handlers
// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//Performance
app.use(compression()) //Gzip Compression
app.keepAliveTimeout = 3000 //Close unused connection after 3s

//Security
app.use(helmet()) //Protect from 
app.disable('x-powered-by') //Remove powered by signature


