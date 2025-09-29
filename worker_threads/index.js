const { Worker, isMainThread, parentPort } = require('node:worker_threads');

function runWorker(){
	if (isMainThread) {
		//Main Thread
		return new Promise((resolve, reject)=>{
			//const worker = new Worker(__filename);
			const worker = new Worker('./worker.js',{ //File included here runs in Worker Thread
			workerData: { number: 10 } }); //Pass data to worker

			worker.on('message', (data)=>{ //Received Data from parentPort.postMessage() 
				console.log(`Main thread worker received ${data}`);
				resolve(data); //Worker result
			});
			worker.on('error', (reject)=>{
				console.log(`Main thread worker error ${reject}`);
				//worker.terminate();
			});
			worker.on('exit', (code) => {
			if(code !== 0)
				reject (new Error(`Worker stopped with exit code ${code}`));
			});
		});
	} else {
		//Worker Thread
	}
}
runWorker().then(result => {
	console.log('Worker result: ', result);
})
