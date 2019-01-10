'use strict'
const _ = require('lodash');

/**
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @callback ProcessMethod
 * @param {Object} inputObject
 * @return {Promise<ReturnProcess>}
 *
 * @param {Object} inputObject
 * @param {Array<ProcessMethod>} processMehods
 */
function process(inputObject, processMehods) {
    return new Promise((resolve, reject) => {
        /** @type Array<Promise<ReturnProcess>> */
        const promiseArray = [];
        for (let method of processMehods) {
            promiseArray.push(method(inputObject));
        }
        Promise.all(promiseArray)
            .then(results => {
                resolve(_.maxBy(results, (o) => o.score).outputObject);
            });
    });
}

module.exports = process;