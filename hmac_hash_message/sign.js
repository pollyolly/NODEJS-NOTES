 const crypto = require('crypto')

//Sign data with secret key
//Create Signature
function sign(secret, data) {
    return crypto
        .createHmac('sha256', secret)
        .update(data, 'utf8')
        .digest('hex'); //or 'base64'
}


let signature = sign('secret key','received data');
console.log(signature);
