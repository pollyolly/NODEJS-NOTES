### Run worker thread project
```
$npm run dev
```
### Run without worker
```
$node without_worker.js
```
### Notes
```
isMainThread              - boolean that determine if code runnining in node js main thread or worker
                          - data available in main thread can be access to worker threads
parentPort                - communication for sending messages between worker and parent
worker.postMessage()      - method for sending data to a worker
worker.on('message')      - event handler for receiving messages from a worker
new Worker('./worker.js') - File included are running in Worker thread
```

