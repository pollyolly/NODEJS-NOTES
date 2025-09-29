const { workerData, parentPort } = require('node:worker_threads');

const number = workerData.number; //Get Data from Worker
console.log('worker number: ',workerData.number);
console.time("timer")
let sum = 0;
for (let i = 0; i< number * 100000000; i++) {
	sum += i;
}

parentPort.postMessage(sum); //Pass data to Main Worker Thread
console.timeEnd("timer");
console.log("Calculation Complete!");
//Output:
/*
 Main thread worker received 499999999067109000
 timer: 940.081ms
 Calculation Complete!
*/
