'use strict'


/**
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
 * 
 * Compute some additionnal commons calculation do add to the final object
 * The original object is not touch 
 * This method is only execute once !
 * 
 * @param {Result} parseResult 
 * @returns {Object} the transform object
 */
function finalParseOperation(parseResult) {
    // We copy the object
    const finalObject = {...parseResult};

    /**
     * Code Goes Here ▼
     */

    return finalObject;
}
module.exports = finalParseOperation;