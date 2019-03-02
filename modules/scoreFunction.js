'use strict';
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
 * @property {Array<Photo>}> photos
 * @property {Object} photoMap
 * @property {Object} tagMap
 * 
 * @returns {number}
 */
function computeScore(input, output){
    /**
     * Code Goes Here ▼
     */
    const slidePairs = output.liste.slice(0, -1).map((slide, i) => [slide, output.liste[i+1]]);
    const score = _.sum(
        slidePairs.map(([slide, nextSlide]) => getScoreForTwoSlides(slide, nextSlide, input))
    );

    return score;
}

function getScoreForTwoSlides(s1, s2, input) {
    const t1 = getTags(s1, input);
    const t2 = getTags(s2, input);
    const intersectionTags = _.intersection(t1, t2);
    const t1Dif = _.difference(t1, intersectionTags);
    const t2Dif = _.difference(t2, intersectionTags);

    return _.min([intersectionTags.length, t1Dif.length, t2Dif.length]);
}

function getTags(s, input) {
    if (!s || s.length === 0) return [];

    const [i1, i2] = s.split(' ');
    const tags1 = i1 ? input.photoMap[i1].tags : [];
    const tags2 = i2 ? input.photoMap[i2].tags : [];
    const tags = _.union(tags1, tags2);

    return _.uniq(tags);
}

module.exports = computeScore;
