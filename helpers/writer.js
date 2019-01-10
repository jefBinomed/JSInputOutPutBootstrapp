'use strict'
const fs = require('fs');

/**
 *
 * @callback OutToInstructions
 * @param {Object} objectToConvert
 * @returns {Array<String>}
 *
 * @param {string} inputFileName
 * @param {Object} outputObject
 * @param {OutToInstructions} convertionMethod
 */
function writeOutput(inputFileName, outputObject, convertionMethod) {
    const outputFile = fs.createWriteStream('outputs/' + (inputFileName ? inputFileName : 'output.out'));
    const writeInstructions = convertionMethod(outputObject);
    writeInstructions.forEach(instruction => outputFile.write(`${instruction} \n`));
    outputFile.end();
}

module.exports = writeOutput;