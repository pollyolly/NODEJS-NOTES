const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('./database')
require('dotenv').config();
//Authenticate Users From DB
//No need LDAP since Wiki can be integrate to LDAP
exports.accountAuth = async (req, res) => {
	try {
		const { username, password } = req.body; //User Username and Raw Password
		let storedHashedPassword = '$2b$10$yZVhGNs7TXdeHN0Eq8XmXerE18BQxKkUPBiAcj8iPas/3yYwRM78m'; //BCRYPT HASH CHAR(60)
		/*await db.query('INSERT INTO wiki_user (user_name, user_password) VALUES ($1, $2)', ['testuser',storedHashedPassword], (err, res)=>{
			if(err) throw err;
		});*/
		if(await bcrypt.compare(password, storedHashedPassword)){
			const accessToken = generateAccessToken({username: username});
			const refreshToken = generateRefreshToken({username: username});
			res.json({accessToken: accessToken, refreshToken: refreshToken});
		} else {
			res.status(401).send("Password Incorrect!")
		}
	} catch(err) {
		console.log(err);
	}
}
let refreshTokens = []
//Call Refresh Token when AccessToken Expired
exports.refreshToken = (req, res) => {
	try {
		const { username, refreshtoken } = req.body; //User Username and Current Refresh Token 

		if (!refreshTokens.includes(refreshtoken)){ //Check if refreshToken exists in refreshTokens Array
			res.status(400).send("Refresh Token Invalid");	
		}
		refreshTokens = refreshTokens.filter( (c) => c != refreshtoken) //Filter Out Current User Refresh Token from the Array of Refresh Token
									//Return the Array of other Refresh Tokens
		//Generate new sets of Access and Refresh Tokens
		const accessToken = generateAccessToken({username: username});
 	       const refreshToken = generateRefreshToken({username: username});
        	res.json({accessToken: accessToken, refreshToken: refreshToken});
	} catch(err) {
		console.log(err);
	}
}
exports.accountLogout = async (req, res) => {
	try {
		const refreshtoken = req.body.refreshtoken; //Current User Refresh Token
		refreshTokens = refreshTokens.filter((c)=> c != refreshtoken); //Filter Out Current User Refresh Token from the Array of Refresh Tokens 
										//Return the Array of other Refresh Tokens
		req.status(204).send('Logged out!');
	} catch(err) {
		console.log(err);
	}
}
function generateAccessToken(username){
	//Unique Info allowed for JWT 
	//http://www.iana.org/assignments/jwt/jwt.xhtml
	//"exp": 1669476910 - "iat": 1669475110 = 1800 seconds or 30 minutes
	return jwt.sign(username, process.env.ACCESS_TOKEN, {expiresIn: "30m"}) 
}
function generateRefreshToken(username){
	const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN, {expiresIn: "40m"});
	refreshTokens.push(refreshToken);
	return refreshToken;
}
//Create Users and Hash Password 
exports.createUser = async (req, res) => {
	try {
		const users = [];
		const { username, password } = req.body; //User Username and Raw Password
		const hashedPassword = await bcrypt.hash(password, 10);
		users.push({username: username, password: hashedPassword}) //Test only should be Stored in Database
		res.status(201).send(users)
		console.log(users)
	} catch(err) {
		console.log(err)
	}
}
