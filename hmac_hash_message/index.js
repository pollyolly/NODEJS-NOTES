const crypto = require('crypto')
const HMAC_SECRET = process.env.HMAC_SECRET;

//Format the post body
//Normal Request
/*
 * POST /payments
 * Host: api.example.com
 * Content-Type: application/json
 * {"amount":100, "currency": "USD"}
 * */
//Canonical Request
/*
 * POST
 * /payments
 * host:api.example.com
 * content-type:application/json
 * {"amount":100, "currency:"USD""}
 * */
function canonicalizeRequest(method, path, headers, body) {
	const normalizedHeaders = Object.keys(headers)
	.sort()
	.map(k => `${k.toLowerCase()}:${headers[k].trim()}`)
	.join('\n');

	return [
		method.toUpperCase(),
		path,
		normalizedHeaders,
		body ? JSON.stringify(body) : ''
	].join('\n')
}

//Sign data with secret key
//Create Signature
function sign(secret, data) {
	return crypto
		.createHmac('sha256', secret)
		.update(data, 'utf8')
		.digest('hex'); //or 'base64'
}

//Protect from replay attack
function isRequestFresh(timestamp, toleranceInSecond = 300) {
	const now = Math.floor(Date.now() / 1000);
	return Math.abs(now - timestamp) <= toleranceInSecond;
}

//Protect from timing attacks
//Compare or Verify signature
function safeCompare(receivedSig, localSig) {
	const bufA = Buffer.from(receivedSig, 'utf8');
	const bufB = Buffer.from(localSig, 'utf8');
	if (bufA.length !== bufB.length) return false;
	return crypto.timingSafeEqual(bufA, bufB); //timeSafeEqual for signature validation
}

let localSig = sign('secret key','received data');
let receivedSig = "508d8478cd5a4db1182ad950fdcabb04b897e6189b921e0daea6023b6f68af12";
console.log(localSig);
if(!safeCompare(receivedSig, localSig)){
	console.log('Error signature not valid!');
} else {
	console.log('Signature is valid!');
}
/* 
let receivedSig = 'test';
let localSig = 'tests';
if(!safeCompare(receivedSig, localSig)){
	//console.log('Testing');
	console.warn(`[HMAC] Signature mismatch for request ID ${req.headers['x-request-id']}`);
	res.status(401).send('Invalid signature');
	return;
}
*/
/* 
let canon = canonicalizeRequest('POST', '/payment', {"Content-Type": "application/json"}, '{"amount":100, "currency": "USD"}');
console.log(canon)
*/
