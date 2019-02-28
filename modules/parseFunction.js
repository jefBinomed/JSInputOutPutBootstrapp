'use strict'
const _ = require('lodash'),
    R = require('ramda');


/**
 * Transform a set of row to a javascript object
 * This method is only execute once
 *
 * @param {number} lineCount
 * @param {string} line
 * @param {Object} result
 */
function parse(lineCount, line, result){
    /**
     * Code Goes Here ▼
     */

    if (lineCount === 0){
        result.photos = [];
        result.photoMap = {};
        result.tagMap = {};
    }else {
        const [orientation, nb, ...tags] = line.split(' ');
        const photo = {
            id: lineCount -1,
            orientation,
            tags
        };
        result.photos.push(photo);
        result.photoMap[photo.id] = photo;
        photo.tags.forEach(tag => {
            if(!result.tagMap[tag]){
                result.tagMap[tag] = {}
            };
            result.tagMap[tag][photo.id] = photo
        });
    }
}


module.exports = parse;