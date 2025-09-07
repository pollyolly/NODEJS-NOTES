const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const customKey =  'thisissecretekey';

const licenseKey = "TCOJ1L5+JqQIXVOo+39wYY/glbrjBXSUCR+WfAVd5cPUmoKwkBfkTZX9anlmb/2CAn7dw5jPf3Fe3T/mjUDTsdC8qym0HE91zvliOXb4UR96KUT21grhb7b3cnuaidYsBVUVn0OG97jSdfk/5tvkCFhV2X0P+X9ntOkPkoMc/KFG51Z5HRKZnzFntr7TNSu2AA6/6W7ucHC8UJHsPDXnEr5QW/JvaTPfSm12/VSvP8+tNUBXJG2+nDhSWA5/nSASDGKL0NymQtReXWc0RsjQGVNvJsX+FzJl4pD5Kf3sokyrjz1TFyiUU6aOA9YOCskM0R7Oxxp2uiUd/ThMOD15WQ"

const data = Buffer.from(customKey);
const signature = Buffer.from(licenseKey, 'base64');

const isVerified = crypto.verify('sha256', data, {
	key: publicKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
}, signature);

console.log("License Key Verified:", isVerified);
