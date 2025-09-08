const {V4} = require('paseto');
const crypto = require('crypto');
const fs = require('fs');

(async () => {
    const {publicKey: publicKey_paserk,secretKey: privateKey_paserk} = await V4.generateKey('public', {format: "paserk"})
    console.log(privateKey_paserk)    
    console.log(publicKey_paserk)

	const privateKeyObject = V4.bytesToKeyObject(Buffer.from(privateKey_paserk.slice(10),'base64url'))
    const publicKeyObject = V4.bytesToKeyObject(Buffer.from(publicKey_paserk.slice(10),'base64url'))

	console.log(privateKeyObject.export({type:'pkcs8', format:'pem'}))
	console.log(publicKeyObject.export({type:'spki', format:'pem'}))
})();
