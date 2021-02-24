'use strict'
const _ = require('lodash'),
    R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js'),
    solve = require('../genetic/example.js');

/**
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Object} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    console.log(inputObject);
    const outputObject = solve(inputObject);
    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;