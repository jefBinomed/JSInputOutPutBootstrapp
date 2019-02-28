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

    const verticals = inputObject.photos.filter(tof => tof.orientation === 'V');
    const horizontals = inputObject.photos.filter(tof => tof.orientation === 'H');

    for(let i = 0; i < verticals.length - 1; i = i + 2) {
        outputObject.liste.push(verticals[i].id + ' ' + verticals[i+1].id);
    }

    if(verticals.length %2 !== 0) {
        outputObject.liste.push('' + verticals[verticals.length - 1].id);
    }

    outputObject.liste = outputObject.liste.concat(horizontals.map(hor => '' + hor.id));

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;