'use strict'
const _ = require('lodash'),
    R = require('ramda');


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
 * @typedef OutputLibrary
 * @property {string} id
 * @property {number} booksTobeScanNumber
 * @property {string[]} idBooksArray
 * 
 * @typedef Output 
 * @property {number} signupLibNumber
 * @property {OutputLibrary[]} outputLibArray
 * 
 * 
 * Transform an output object to a list of string. Each string will be write into an output file
 * This method is only execute Once
 * 
 * @param {Output} objectToConvert
 * @returns {Array<String>}
 */
function convert(objectToConvert){
    /**@type {Array<String>} */
    const instructions = [];

    /**
     * Code Goes Here ▼
     */

    return instructions;
}


module.exports = convert;