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
 *
 * @param {Object} inputObject
 */
function compute(inputObject) {
    return new Promise((resolve, reject) => {
        /** @type Array<ReturnProcess> */
        const promiseArray = [];
        const processMehods = listProcessMethods();
        for (let method of processMehods) {
            promiseArray.push(new Promise((resolveMethod, rejectMethod) => {
                resolveMethod(method(inputObject));
            }));
        }
        Promise.all(promiseArray)
            .then(results => {
                resolve(_.maxBy(results, (o) => o.score).outputObject);
            });
    });
}

module.exports = compute;