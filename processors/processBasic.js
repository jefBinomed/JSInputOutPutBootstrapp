'use strict'


/**
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Object} inputObject
 * @return {Promise<ReturnProcess>}
 */
function processInput(inputObject){
    return new Promise((resolve, reject)=>{
        resolve({
            score:0,
            outputObject: {}
        });
    });
}

module.exports = processInput;