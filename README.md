## NODEJS
### Package setup
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

### Security
[Security](https://expressjs.com/en/advanced/best-practice-security.html)

### Performance

[Performance](https://expressjs.com/en/advanced/best-practice-performance.html)

### Database Health Check
[Health Check](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html)

[Health Check Sample](https://github.com/godaddy/terminus/blob/main/example/mysql/index.js)

### References
[Clean Architecture](https://www.youtube.com/watch?v=VmY22KuRDbk)
