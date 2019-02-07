'use strict'
const fs = require('fs');

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
  * @returns {Array<string>}
  */
 function listProcessPaths(){
    const processObjects = [];
    fs.readdirSync(`${__dirname}/../processors`).forEach(fileProcessor => {
        if (fileProcessor.endsWith('.js')){
            processObjects.push(`../processors/${fileProcessor}`);
        }
    });
    return processObjects;
 }

/**
 * @returns {Array<ProcessMethod>}
 */
function listProcessMethods(){
    const processObjects = [];
    return listProcessPaths().map(path => {return {name : path, method : require(path)}});
}

module.exports = {
    listProcessPaths,
    listProcessMethods
};