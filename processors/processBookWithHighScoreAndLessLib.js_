'use strict'
const _ = require('lodash'),
    R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js');


/**
 * @typedef Book
 * @property {string} id
 * @property {number} score
 * @property {boolean} alreadyProcessed
 * @property {Object<string, Library>} libReferenceMap
 * @property {Library[]} libReferenceArray
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
    //console.log(inputObject.hash);
    outputObject.outputLibArray = []

    const libReferenceMap = {};

    const booksOrderByHighScore = inputObject.hash.booksArray.sort((bookA, bookB) =>{
        return bookA.score - bookB.score
    });

    const booksOrderByHighScoreInLibrary = booksOrderByHighScore.filter((book)=> book.libReferenceArray.length>0);


    booksOrderByHighScoreInLibrary.forEach(book=>{
        let libToAdd = book.libReferenceArray.sort((libA, libB) => libB.signupTime - libA.signupTime)[0];
        const libFromReferenceMap = libReferenceMap[libToAdd.id];
        if (libFromReferenceMap != null){
            libToAdd = libReferenceMap[libToAdd.id];
        }else{
            const outputTempLibrary ={id: libToAdd.id, idBooksArray : []};
            libReferenceMap[libToAdd.id] = outputTempLibrary
            outputObject.outputLibArray.push(outputTempLibrary);
            libToAdd = outputTempLibrary
        }

        libToAdd.idBooksArray.push(book.id);
        libToAdd.booksTobeScanNumber = libToAdd.idBooksArray.length;

    })

    
    
    outputObject.signupLibNumber = outputObject.outputLibArray.length;
   
    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;