 
// ECMAScript/ES6 modules (.mjs) (import and export)
 
/* import { createServer } from 'node:http';
	
const server = createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World! \n');
}) 
*/
// CommonJs (.js and .cjs)  (require and module.exports) 
 
const http = require('http')
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World! \n');
})
const port = 4000;
const host = '0.0.0.0';
server.listen(port, host, () => {
	console.log(`Listening on ${host}:${port}`);
})
