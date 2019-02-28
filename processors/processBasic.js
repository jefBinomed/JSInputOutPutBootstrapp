'use strict'
const _ = require('lodash'),
    R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js');


/**
 * @typedef Photo
 * @property {string} id
 * @property {string} orientation
 * @property {Array<string>} tags
 * 
 * 
 * @typedef InputObject
 * @property Array<Photo> photos
 * @property {Object} photoMap
 * @property {Object} tagMap
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {InputObject} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    const outputObject = { liste: []};

    outputObject.liste.push(inputObject.photos[0].id)
    outputObject.liste.push(inputObject.photos[1].id + ' ' + inputObject.photos[2].id)
    outputObject.liste.push(inputObject.photos[3].id)

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;