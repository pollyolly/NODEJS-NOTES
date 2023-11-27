//MIDDLEWARE
const jwt = require("jsonwebtoken");
require('dotenv').config(); //.env
//Middleware to validate JWT Token in Route
//i.e: app.get("/GetCategory", validateJWT, (req, res)=>{ console.log(req.decodedToken.username) });
exports.validateJWT = (req, res, next) =>{ 
	try {
		const header = req.headers.authorization; //Authorization: Bearer <access-token>
		const accesstoken = header.split(' ')[1]; //Remove Bearer and get only <access-token>
							  //Split string by spacing and get string in Array index[1]
		if(accesstoken == null) res.status(400).send("Token not present");
		jwt.verify(accesstoken, process.env.ACCESS_TOKEN, (err, decoded) => {
			if(err){
				res.status(403).send("Token invalid")
				//console.log(err);
			} else {
				//console.log('JWT Auth: '+header);
				//console.log('Access Token: '+accesstoken);
				req.decodedToken = decoded; //Pass value to next req function 
				//console.log(decoded);
				next(); //Proceed to next Code
			}
		});
	} catch(err) {
		console.log(err);
	}
}
