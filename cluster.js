const cluster = require('node:cluster');
const os = require('os');

const totalCpu = os.cpus().length;

console.log(totalCpu);