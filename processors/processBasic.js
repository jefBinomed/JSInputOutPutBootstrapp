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
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Result} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    const outputObject = {};


    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;