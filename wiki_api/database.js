
const { Pool }= require('pg')
require('dotenv').config(); //.env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

pool.connect((err, client, release)=>{
	if(err) { return console.log('Error acquiring client', err.stack); }
		client.query('SELECT NOW()', (err, result) => {
   		release()
    		if (err) {
      			return console.error('Error executing query', err.stack)
    		}
    		console.log(result.rows)
  	})	
})

module.exports = {
	query: (text, params) => pool.query(text, params)
}
