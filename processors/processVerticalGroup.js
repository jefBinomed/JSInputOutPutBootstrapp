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

    const [photoArrayVertical, photoArrayHorizontal]  = _.partition(inputObject.photos,(obj) => obj.orientation === 'V');

    const slideVerticalArray = [];
    for (let i= 0; i < photoArrayVertical.length - 1; i+=2){
        slideVerticalArray.push(`${photoArrayVertical[i].id} ${photoArrayVertical[i+1].id}`);
    }
    slideVerticalArray.concat(photoArrayHorizontal.map(photo=>photo.id));

    const outputObject = { liste: slideVerticalArray};


    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;