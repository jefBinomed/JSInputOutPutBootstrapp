'use strict'

/**
 *
 * @typedef Book
 * @property {string} id
 * @property {number} score
 * @property {boolean} alreadyProcessed
 * 
 * 
 * @typedef Library
 * @property {string} id
 * @property {number} signupTime
 * @property {number} parallelBooksNumber
 * @property {Book[]} booksArray
 * @property {Object<string, Book>} booksMap
 * 
 * 
 * @typedef Hash
 * @property {number} deadline
 * @property {Library[]} libArray
 * @property {Object<string, Library>} libMap
 * @property {Book[]} booksArray
 * @property {Object<string, Book>} booksMap
 * 
 * @typedef Result
 * @property {Hash} hash
 * 
 * According to an Input javascript object and an Output javascript object,
 * it calculate the score of the output object
 *
 * @param {Result} input
 * @param {Object} output
 * @returns {number}
 */
function computeScore(input, output){
    let score = 0;

    /**
     * Code Goes Here ▼
     */

    return score;
}

module.exports = computeScore;