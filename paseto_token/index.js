const crypto = require('crypto')
const { V4 } = require('paseto')
const fs = require('fs')
/*
 * We can generate the public and private key from the paseto token secret key
 *
const privateKey = 'k4.secret.kkF0fsfziNPVw5-YQdUjfDTzqCv99pBlajn59Eo0GEJnKJEL9-wLhpUrRDXGMuncEHL3OJ8OzSlR6Jv9Br9ATQ';
console.log(privateKey.slice(10))
const privateKeyBuf = V4.bytesToKeyObject(Buffer.from(privateKey.slice(10), 'base64url'))
const key = crypto.createPrivateKey(privateKeyBuf.export({type:'pkcs8', format: 'pem'}))
*/
const key = fs.readFileSync('private_key.pem', 'utf8')
const privateKey = crypto.createPrivateKey(key)
const payload = {
	'testing:claim': 'hello'
};

(async () => {
	const token = await V4.sign(payload, key, {
		audience: 'testing:client',
		issuer: 'example.com',
		expiresIn: '2 hours'
	})
	console.log(token)
})();


