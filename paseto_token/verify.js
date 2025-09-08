const crypto = require('crypto')
const { V4 } = require('paseto')
const fs = require('fs')

const publicKey = fs.readFileSync('public_key.pem', 'utf8')
const key = crypto.createPublicKey(publicKey)
const token = 'v4.public.eyJ0ZXN0aW5nOmNsYWltIjoiaGVsbG8iLCJpYXQiOiIyMDI1LTA5LTA4VDA4OjU3OjU4Ljg2MVoiLCJleHAiOiIyMDI1LTA5LTA4VDEwOjU3OjU4Ljg2MVoiLCJhdWQiOiJ0ZXN0aW5nOmNsaWVudCIsImlzcyI6ImV4YW1wbGUuY29tIn2ZF3jmWot0DzXz0DeT9Onbv2Tccj2IIqZZ7DyPJeFgAPdC1QCG0Jn4UC_IOspHEdr9NZxgiJ1JkIYzv34DxQwN';

(async () => {
	try {
		const payload = await V4.verify(token, key)	
		console.log(payload)
	} catch (e) {
		console.log(e.code)
	}
})();
