## NODEJS

### Requirements

[NGINX Setup for PM2](https://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup)

[NodeJs](https://www.tutorialspoint.com/nodejs/index.htm)

[Postgresql](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04)

[PM2](https://pm2.keymetrics.io/docs/usage/specifics/)

[AuthBind](https://pm2.keymetrics.io/docs/usage/specifics/)
## Start a Project
```
$cd project_folder
$npm init
```
## Development Setup
### package.json
Editable json file
```json
{
  "name": "Wiki Api",
  "version": "1.0.0",
  "description": "Public access of Wiki Api",
  "main": "./server.js",
  "script": {
    "start": "node ./server.js"
  },
  "keywords": [],
  "author": "Pollyolly",
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
```javascript
"script": {
    "start": "node ./server.js"
  },
```
This line required for command: $nodemon start
```json
"main": "./server.js",
```
Nodemon (automatic restart nodejs server)
```vim
$npm install -g nodemon
$nodemon start
$nodemon ./server.js
```
Security
```vim
bcrypt
helmet
authbind
```
## Deployment
$npm install pm2@latest -g

$cd wiki_api/

```javascript
//wiki_api/ecosystem.config.js
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'wiki-api',
      script: './server.js',
      watch: true,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: 'production',
      },
    },
  ],
};
```
$pm2 start

```vim
Running PM2:
┌─────┬─────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ wiki-api    │ default     │ 1.0.0   │ fork    │ 181      │ 0s     │ 0    │ online    │ 0%       │ 9.9mb    │ root     │ enabled  │
└─────┴─────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
Other Command:
$pm2 start server.js --name wiki-api -- --port 9999 --watch --ignore-watch="node_modules" 

start server.js               -> server.js (nodejs server file)
--name wiki-api               -> Name of the program 
-- --port 9999                -> Run in port 9999
--watch                       -> Enable live update
--ignore-watch="node_modules" -> Do not read directory
--log /var/log/nginx/pm2.logs -> Save logs to
--interpreter none            -> Allow executable files like Single Executable Application (Node Js) or Go Executable file
```
```vim
$pm2 list       	# Show pm2 list of processes
$pm2 delete 0   	# Delete process from pm2 list by id
```
```vim
$pm2 stop 0             # Stop specific process id
$pm2 restart 0 		# Restart specific process id
```
### NginX
```vim
upstream wiki_api_upstream {
        server 127.0.0.1:9999; #NodeJs / PM2 local and Port
        #keepalive_timeout 70;
        keepalive 70;
}

server {
        listen 80;
        listen [::]:80;
        index index.html index.htm;

        server_name wikiapi.ph;
        #server_name _; issue conflict to 0.0.0.0:[::]80

        access_log /var/log/nginx/wiki_api.log;
        error_log /var/log/nginx/wiki_api.log;

        location / {
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";

                proxy_pass http://wiki_api_upstream/; #NodeJs / PM2 local and Port
                #proxy_pass http://127.0.0.1:9999;
                proxy_redirect off;
                proxy_read_timeout 240s;

                proxy_buffers 4 16k;
                proxy_buffer_size 16k;
        }
}
```
#### Do not Run NodeJs as Root (But only root can bind to port 80). This is the fix below.
[Source link](https://pm2.keymetrics.io/docs/usage/specifics/)
```vim
$sudo apt-get install authbind
$sudo touch /etc/authbind/byport/80
$sudo chown www-data /etc/authbind/byport/80		# Important: www-data will be running pm2
$sudo chmod 755 /etc/authbind/byport/80
```
Create an alias for pm2
```vim
$vi ~/.bashrc
Then add the line below:

alias pm2='authbind --deep pm2'

Run the commands below: 
$source ~/.bashrc
$pm2 update
```
#### Automatic Start UP / Reboot
[Source link](https://pm2.keymetrics.io/docs/usage/startup/)
```vim
$pm2 startup
$pm2 save		# Save after setup
$pm2 resurrect	# Manually bring back previous processes
```
## Performance
Start automatic clustering (This will act like Load Balancer and automatically share connection to spawned processes)

[Source Link](https://pm2.keymetrics.io/docs/usage/quick-start/)
```vim
$pm2 start app.js -i max

Other Commands:
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total
```
## Troubleshooting
Nginx log: Conflict 0.0.0.0:[::]80
```vim
Nginx Config should have a server name.

Fix: server_name sample.ph
```
## Tutorials
### Generate Random Strings
```vim
$node
Welcome to Node.js v16.15.0.
>require("crypto").randomBytes(64).toString("hex")

*Can be used for AccessToken, RefreshToken in .env
```
### Post Man Settings
Post Request
```vim
POST: http://localhost:9999/AccountAuth
Body: raw: JSON: 
             {
	              "username":"testuser",
	              "password":"testuserpass"
             }
```
Get Request
```vim
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

### NodeJs Full Tutorial
[Node.js Full Course for Beginners | Complete All-in-One Tutorial | 7 Hours](https://www.youtube.com/watch?v=f2EqECiTBL8)
