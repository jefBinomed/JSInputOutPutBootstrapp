'use strict'

const {parentPort, workerData} = require('worker_threads');

const compute = require(workerData.path);


parentPort.postMessage(compute(workerData.input));