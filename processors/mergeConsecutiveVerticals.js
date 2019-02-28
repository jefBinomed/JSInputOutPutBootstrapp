'use strict'
const _ = require('lodash'),
    computeScore = require('../modules/scoreFunction.js');

/**
 * @typedef Photo
 * @property {string} id
 * @property {string} orientation
 * @property {Array<string>} tags
 * 
 * 
 * @typedef InputObject
 * @property {Array<Photo}> photos
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
    const outputObject = { liste: [] };

    const {photos} = inputObject;

    for(let i = 0; i < photos.length - 1; i++) {
        if(i >= photos.length) break;

        const currentPhoto = photos[i];
        const nextPhoto = photos[i + 1];

        if (currentPhoto.orientation === 'V' && nextPhoto.orientation === 'V') {
            outputObject.liste.push(`${currentPhoto.id} ${nextPhoto.id}`);
            if(i < photos.length - 3) {
                i++;
            }
        }
        else {
            outputObject.liste.push(`${currentPhoto.id}`);
        }
    }

    // console.log(outputObject.liste);

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;
