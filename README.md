## NODEJS

### Requirements
```
NginX
NodeJs
Posgres
PM2
```
### package.json
```
{
  "name": "Iskomunidad Api",
  "version": "1.0.0",
  "description": "Public access of Iskomunidad Api",
  "main": "/server.js",
  "script": {
    "start": "node server.js"
  },
  "keywords": [],
  "author": "John Mark Roco",
  "dependencies": {
    "express": "^4.18.2",
    "wikiapi": "^1.19.4"
  }
}
/* This line used for command: $npm start */
"script": {
    "start": "node server.js"
  },
```
### Deployment 

[NodeJs Deployment](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

### Security
[Security](https://expressjs.com/en/advanced/best-practice-security.html)

### Performance

[Performance](https://expressjs.com/en/advanced/best-practice-performance.html)

[NginX Caching](https://serversforhackers.com/c/nginx-caching)

### Database Health Check
[Health Check](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)

[Database Health Check Sample](https://github.com/godaddy/terminus/blob/main/example/mysql/index.js)

### References
[Express Js Samples](https://github.com/expressjs/express/tree/master/examples/route-separation)

[NodeJs Clean Architecture](https://www.youtube.com/watch?v=VmY22KuRDbk)

[Wiki Api](https://kanasimi.github.io/wikiapi/Wikiapi.html)
