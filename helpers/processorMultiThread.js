'use strict'
const _ = require('lodash'),
    fs = require('fs'),
    {listProcessPaths} = require('./listProcess.js'),
    {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
/**
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @callback ProcessMethod
 * @param {Object} inputObject
 * @return {ReturnProcess}
 */


/**
 * Compute the result with a copy of input object each times
 *
 * @param {Object} inputObject
 * * @param {boolean} log : true if we need to logs informations
 */
function compute(inputObject, log) {
    return new Promise((resolve, reject) => {
        /** @type Array<Promise<ReturnProcess>> */
        const promiseArray = [];
        const processMehods = listProcessPaths();
        for (let method of processMehods) {
            promiseArray.push(new Promise((resolveMethod, rejectMethod)=>{
                const processWorker = new Worker(`${__dirname}/workerExecute.js`,{
                    workerData: {
                        path: method,
                        input: {...inputObject}
                    }
                });
                processWorker.on('message',(output) => {
                    if (log && output){
                        console.log(`Method : ${method} have score : ${output.score}`);
                    }
                    resolveMethod(output);
                });
                processWorker.on('error', (err) => {rejectMethod(err)});
                processWorker.on('exit', (code) => {
                    if (code != 0){
                        rejectMethod(`Worker stopped with exit code ${code}`);
                    }
                })
            }));
        }
        Promise.all(promiseArray)
            .then(results => {
                resolve(_.maxBy(results, (o) => o.score).outputObject);
            });
    });
}

module.exports = compute;