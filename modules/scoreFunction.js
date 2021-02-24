'use strict'

/**
 *
 * According to an Input javascript object and an Output javascript object,
 * it calculate the score of the output object
 *
 * @param {Object} inp
 * @param {Object} out
 * @returns {number}
 */
function computeScore(input, output) {

    let score = 0;
    for (let i = 0; i < Math.min(input.length, output.length); ++i) {
        // increase score for each character that matches
        if (input[i] === output[i]) {
            score ++;
        }
    }

    return score;
}

module.exports = computeScore;