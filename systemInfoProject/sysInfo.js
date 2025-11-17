
const os=require('os');
function getSystemInfo(){
    console.log("System information");
    console.log("---------------------")
     console.log("Architecture:", os.arch());

  const cpus = os.cpus();
  console.log("CPU Cores:", cpus.length);
  console.log("CPU Model:", cpus[0].model);
  console.log("CPU Speed:", (cpus[0].speed / 1000).toFixed(2), "GHz"); 

  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2); 
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);
  console.log("Total Memory:", totalMem, "GB");
  console.log("Free Memory:", freeMem, "GB");

  const heapUsed = (process.memoryUsage().heapUsed / (1024 ** 2)).toFixed(2); 
  const heapTotal = (process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2);
  console.log("Heap Memory Used:", heapUsed, "MB");
  console.log("Heap Memory Total:", heapTotal, "MB");


  console.log("Hostname:", os.hostname());
  console.log("OS Type:", os.type());
}

module.exports = { getSystemInfo };
    
