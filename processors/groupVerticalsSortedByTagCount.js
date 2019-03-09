'use strict';

const R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js');


/**
 * @typedef Photo
 * @property {string} id
 * @property {string} orientation
 * @property {Array<string>} tags
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
    const outputObject = { liste: [] };

    const verticals = inputObject.photos.filter(photo => photo.orientation === 'V');
    const horizontals = inputObject.photos.filter(photo => photo.orientation === 'H');

    /**
     * @typedef Slide
     * @property {Array<Photo>} photos
     *
     * @type Array<Slide>
     */

    const slides = R.concat(getSlidesFromVerticals(verticals), getSlidesFromHorizontals(horizontals));

    const processedSlides = processSlides(slides);

    outputObject.liste = processedSlides.map(slide => slide.photos.map(photo => photo.id).join(' '));

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

function getSlidesFromVerticals(verticals) {
    // group by tag count
    let slides = [];

    for(let i = 0; i < verticals.length - 1; i = i + 2) {
        slides.push([verticals[i], verticals[i+1]]);
    }

    const getSlideTagsCount = R.compose(R.length, (tags) => R.union(...tags), R.pluck('tags'));

    slides = R.sort(R.descend(getSlideTagsCount), slides);

    return slides;
}

function getSlidesFromHorizontals(horizontals) {
    return horizontals.map(photo => [photo]);
}

function processSlides(slides) {
    return slides.map(slide => ({photos: [...slide]}));
}

module.exports = processInput;
