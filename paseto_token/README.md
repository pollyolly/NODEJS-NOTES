### NPM Install
```
$npm install paseto
```
### Sign Key
```
$node index.js
```
### Generate Key
openssl 
```
$openssl genpkey -algorithm ed25519 -out private_key.pem -outform PEM
$openssl pkey -in private_key.pem -pubout -out public_key.pem
```
paseto generate key
```
$node generate_key.js
```
### Verify Key
```
$node verify.js
```
### Resources

[paseto](https://github.com/panva/paseto)

[V4 (PASETO Protocol Version v4)](https://github.com/panva/paseto/blob/main/docs/README.md#v4-paseto-protocol-version-v4)

### Troubleshoot
```
node:internal/crypto/keys:725
    handle.init(kKeyTypePrivate, data, format, type, passphrase);
           ^
Error: error:1E08010C:DECODER routines::unsupported
```
Fix
```
Generate appropriate algorithm using the openssl or generate key of paseto
```
