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
    /** @type Output */
    const outputObject = {};
    console.log(inputObject.hash);

    outputObject.signupLibNumber = inputObject.hash.libArray.length;
    outputObject.outputLibArray = []
    inputObject.hash.libArray.forEach((library) => {
        /** @type OutputLibrary */
        const outputLib = {}
        outputLib.id = library.id;
        outputLib.idBooksArray = library.booksArray.map((book)=>book.id); 
        outputObject.outputLibArray.push(outputLib);
    })

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;