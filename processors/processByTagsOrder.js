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
    console.log('Start processing process By Tags', inputObject.tagArray.length);

    const sortByTags = _.sortBy(inputObject.tagArray, [function(tag) {return -tag.idList.length}]);
    const tagMap2 = {};
    sortByTags.forEach(tag => {
        tagMap2[tag.tagKey] = tag;
    })

    console.log('Start processing process By Tags')
    const finalList = [];
    sortByTags.forEach(tagEntry => {
        console.log('process TagEntry ', tagEntry.tagKey, tagEntry.idList.length);
        tagEntry.idList.forEach(idSlide => {
            finalList.push(idSlide);
            const tagList = inputObject.photoMap[idSlide].tags;
            tagList.forEach(tag => {
                if (tag !== tagEntry.tagKey){

                    _.remove(tagMap2[tag].idList, (idTemp) => idTemp === idSlide)
                }
            })
        })
    });

    console.log('finish processing tags');
    
    const outputObject = { liste: finalList};


    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

function getOtherPhoto(photoV, photos) {
    if (photos.length === 0) return [null, []]
    let photoIntersect = photos.find((p) => _.intersection(p.tags, photoV.tags).length<= 1);
    if (!photoIntersect){
        photoIntersect = photos[0];
    }
    _.remove(photos, (p)=> p.id === photoIntersect.id);
    return [photoIntersect, photos]
}
function getOtherPhotoCommon(photoV, photos) {
    if (photos.length === 0) return [null, []]
    let photoIntersect = photos.find((p) => _.intersection(p.tags, photoV.tags).length>= 1);
    if (!photoIntersect){
        photoIntersect = photos[0];
    }
    _.remove(photos, (p)=> p.id === photoIntersect.id);
    return [photoIntersect, photos]
}

module.exports = processInput;