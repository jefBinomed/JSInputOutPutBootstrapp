'use strict'
const _ = require('lodash'),
    R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js');


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
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Output} outputObject
 *
 * @param {Result} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    const outputObject = {};
    console.log(inputObject.hash);


    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;