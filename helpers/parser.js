'use strict'

/**
 *
 * @callback LineCallBack a callback method that is used while parsing
 * @param {number} lineCount : the current lineCount
 * @param {string} line : the string corresponding to the line
 * @param {Object} result : the ouputObject (it's an input / output param)
 * @throws exceptions when there is a problem
 * 
 * @callback FinalParseOperationCallBack a callback method called when the parsing is finish
 * @param {Object} parseResult : the basic parsing result
 * @returns {Obejct} a modifyed object
 * @throws exceptions when there is a problem
 *
 * @param {string} filePath
 * @param {LineCallBack} callback
 * @param {FinalParseOperationCallBack} finalParseCallback
 * @returns {Promise<Object>} return in promis the result of the parsing
 */
function parse(filePath, callback, finalParseCallback) {
    return new Promise((resolve, reject) => {
        let lineCount = 0,
            parseError = false,
            parseErrorMessage = '';
        const result = {};

        const lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filePath)
        });

        lineReader.on('line', (line) => {
            try {
                callback(lineCount, line, result);
            } catch (error) {
                parseError = true;
                parseErrorMessage = error;
                return;
            }
            lineCount++;
        });

        lineReader.on('close', () => {
            if (parseError) {
                reject(parseErrorMessage);
            } else {
                resolve(finalParseCallback(result));
            }
        });
    })
}

module.exports = parse;