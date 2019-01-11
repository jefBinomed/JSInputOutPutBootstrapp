'use strict'
const _ = require('lodash'),
    fs = require('fs');
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
 * @returns {Array<ProcessMethod>}
 */
function listProcessMethods(){
    const processObjects = [];
    fs.readdirSync(`${__dirname}/../processors`).forEach(fileProcessor => {
        processObjects.push(require(`../processors/${fileProcessor}`));
    });
    return processObjects;
}


/**
 *
 * @param {Object} inputObject
 */
function computeAll(inputObject) {
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

/**
 *
 * @param {Object} inputObject
 */
function computeThread(inputObject) {
    return new Promise((resolve, reject) => {
        /** @type Array<Promise<ReturnProcess>> */
        const promiseArray = [];
        const processMehods = listProcessMethods();
        for (let method of processMehods) {
            promiseArray.push(method(inputObject));
        }
        Promise.all(promiseArray)
            .then(results => {
                resolve(_.maxBy(results, (o) => o.score).outputObject);
            });
    });
}

module.exports = {
    computeAll,
    computeThread
};