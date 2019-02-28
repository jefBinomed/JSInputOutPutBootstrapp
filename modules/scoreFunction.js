'use strict'
const _ = require('lodash');

/**
 *
 * According to an Input javascript object and an Output javascript object,
 * it calculate the score of the output object
 *
 * @param {Object} input
 * @param {Object} output
 * 
 * @typedef InputObject
 * @property {Array<Photo}> photos
 * @property {Object} photoMap
 * @property {Object} tagMap
 * 
 * @returns {number}
 */
function computeScore(input, output){
    let score = 0;

    /**
     * Code Goes Here ▼
     */
    const [nbLine, ...slides] = output.liste;

    slides.forEach((slide, i) => {
        if (i === slides.length - 1) return;

        score += getScoreForTwoSlides(slide, slides[i+1],input)

    })

    return score;
}

function getScoreForTwoSlides(s1, s2, input) {
    const t1 = getTags(s1, input)
    const t2 = getTags(s2, input)
    const intersectionTags = _.intersection(t1, t2);
    const t1Dif = _.difference(t1, intersectionTags);
    const t2Dif = _.difference(t2, intersectionTags);

    return _.min([intersectionTags.length, t1Dif.length, t2.length]);
}

function getTags(s, input) {
    if (!s || s.length ===0) return [];
    const [i1, i2] = s.split(' ');
    const tags = {}


    if (i1) input.photoMap[i1].tags.forEach((tag) => {
        tags[tag] = true
    })
    if (i2) input.photoMap[i2].tags.forEach((tag) => {
        tags[tag] = true
    })

    return Object.keys(tags)
}

module.exports = computeScore;