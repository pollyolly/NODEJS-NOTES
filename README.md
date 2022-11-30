## NODEJS

### Requirements

[NGINX Setup for PM2](https://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup)

[NodeJs](https://www.tutorialspoint.com/nodejs/index.htm)

[Postgresql](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04)

[PM2](https://pm2.keymetrics.io/docs/usage/specifics/)

[AuthBind](https://pm2.keymetrics.io/docs/usage/specifics/)
## Development Setup
### package.json
Editable json file
```
{
  "name": "Iskomunidad Api",
  "version": "1.0.0",
  "description": "Public access of Iskomunidad Api",
  "main": "./server.js",
  "script": {
    "start": "node ./server.js"
  },
  "keywords": [],
  "author": "John Mark Roco",
  "dependencies": {
    "bcrypt": "^5.1.0",
    "compression": "^1.7.4",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^6.0.0",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.20",
    "wikiapi": "^1.19.4"
  }
}
```
This line used for command: $npm start
```
"script": {
    "start": "node ./server.js"
  },
```
This line required for command: $nodemon start
```
"main": "./server.js",
```
Nodemon (automatic restart nodejs server)
```
$npm install -g nodemon
$nodemon start
$nodemon ./server.js
```
Security
```
bcrypt
helmet
authbind
```
## Deployment
PM2
```
Running PM2:
┌─────┬─────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ wiki-api    │ default     │ 1.0.0   │ fork    │ 181      │ 0s     │ 0    │ online    │ 0%       │ 9.9mb    │ root     │ enabled  │
└─────┴─────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
Command:
$pm2 start server.js --name wiki-api -- --port 9999 --watch --ignore-watch="node_modules" 

start server.js               -> server.js (nodejs server file)
--name wiki-api               -> Name of the program 
-- --port 9999                -> Run in port 9999
--watch                       -> Enable live update
--ignore-watch="node_modules" -> Do not read directory
--log /var/log/nginx/pm2.logs -> Save logs to
```
```
$pm2 list       	# Show pm2 list of processes
$pm2 delete 0   	# Delete process from pm2 list by id
```
```
$pm2 stop 0             # Stop specific process id
$pm2 restart 0 		# Restart specific process id
```
## Performance
Start automatic clustering (This will act like Load Balancer and automatically share connection to spawned processes)
```
$pm2 start app.js -i max
```
## Troubleshooting
Nginx log: Conflict 0.0.0.0:[::]80
```
Nginx Config should have a server name.

Fix: server_name sample.ph
```
## Tutorials
### Generate Random Strings
```
$node
Welcome to Node.js v16.15.0.
>require("crypto").randomBytes(64).toString("hex")

*Can be used for AccessToken, RefreshToken in .env
```
### Post Man Settings
Post Request
```
POST: http://localhost:9999/AccountAuth
Body: raw: JSON: 
             {
	              "username":"testuser",
	              "password":"testuserpass"
             }
```
Get Request
```
GET: http://localhost:9999/AccountAuth
Params: Query Params: 
             key: 'test' value: 'test'
             key: 'test' value: 'test'

URL GET: http://localhost:9999/PageEdit/text/:pagetext
To GET: http://localhost:9999/PageEdit/text/sampletextvalue
```
Authorizaton header
```
GET: http://localhost:9999/PageEdit/text/sdfsadfsadf
Auth: Type: Bearer Token -> Token: <access-token>
```
### ExpressJs Responses
[ExpressJs Responses](https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client)
### Values allowed in JWT
[Values allowed in JWT](http://www.iana.org/assignments/jwt/jwt.xhtml)

### Deployment 

[NodeJs Deployment](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

### Security
[Security](https://expressjs.com/en/advanced/best-practice-security.html)

[JWT Login](https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3)
### Performance

[Performance](https://expressjs.com/en/advanced/best-practice-performance.html)

[NginX Caching](https://serversforhackers.com/c/nginx-caching)

### Database Health Check
[Health Check](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)

[Database Health Check Sample](https://github.com/godaddy/terminus/blob/main/example/mysql/index.js)

### Database CRUD
[CRUD REST API](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)

### References
[Express Js Samples](https://github.com/expressjs/express/tree/master/examples/route-separation)

[NodeJs Clean Architecture](https://www.youtube.com/watch?v=VmY22KuRDbk)

[Wiki Api](https://kanasimi.github.io/wikiapi/Wikiapi.html)

### JAVASCRIPT VISUALIZATION

[JavaScript Visualized Series' Articles](https://dev.to/lydiahallie/series/3341)
