const crypto = require('crypto');
const fs = require('fs');

const privateKey = fs.readFileSync('private_key.pem', 'utf8');
const customKey = 'thisissecretekey';
		
const data = Buffer.from(customKey);
const signature = crypto.sign('sha256', data, {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
});

const licenseKey = signature.toString('base64');

//Note: The last "==" of the licenseKey are default padding from base64
//licenseKey still works even if we tamper the last line after "==" (i.e. ==TAMPERED)  and remove "==". 
//It will not work if we remove the letters so we remove the "==" in the last line.
console.log(licenseKey.slice(0,-2)); //Remove base64 padding "==" to prevent tampering
