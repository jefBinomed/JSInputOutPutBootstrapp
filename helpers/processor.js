'use strict'
const _ = require('lodash'),
    {listProcessMethods} = require('./listProcess.js');
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
 * Compute the results with a copy of the input each time
 * 
 * @param {Object} inputObject
 * @param {boolean} log : true if we need to logs informations
 */
function compute(inputObject, log) {
    return new Promise((resolve, reject) => {
        /** @type Array<ReturnProcess> */
        const promiseArray = [];
        const processMehods = listProcessMethods();
        for (let method of processMehods) {
            promiseArray.push(new Promise((resolveMethod, rejectMethod) => {
                const resultMethod = method.method({...inputObject});
                if (log && resultMethod){
                    console.log(`Method : ${method.name} have score : ${resultMethod.score}`);
                }
                resolveMethod(resultMethod);
            }));
        }
        Promise.all(promiseArray)
            .then(results => {
                resolve(_.maxBy(results, (o) => o.score).outputObject);
            });
    });
}

module.exports = compute;