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

    const numberDays = inputObject.hash.deadline / 3;

    function calcScoreLibForNumberDays(/** @type Library */lib, numberDay){
        const booksSortByScore = lib.booksArray.filter(book => book.score > 0).sort((bookA, bookB)=> bookA.score - bookB.score);
        let currentDay = 0;
        let score = 0;
        let incrementPerBook = 1 / lib.parallelBooksNumber;
        let bookArray = []
        for(let book of booksSortByScore){
            score += book.score;
            bookArray.push(book)
            currentDay += incrementPerBook;
            if (currentDay>(numberDay - lib.signupTime)){
                break;
            }
        }
        return {score, booksSortByScore};
    }

    const copyOfLibArray = inputObject.hash.libArray.slice();

    function getBestLib(libArray, numberDays){
        if (libArray.length === 0){
            return null;
        }
        let scoreMap = {}

        const libOrderByScoreForNumberDays = libArray.sort((libA, libB)=>{
            let scoreLibA = scoreMap[libA.id];
            let scoreLibB = scoreMap[libB.id];
            if (!scoreLibA){
                scoreLibA = calcScoreLibForNumberDays(libA, numberDays);
                scoreMap[libA.id] = scoreLibA;
                libA.booksSortByScore = scoreLibA.booksSortByScore;
            }
            if (!scoreLibB){
                scoreLibB = calcScoreLibForNumberDays(libB, numberDays);
                scoreMap[libB.id] = scoreLibB;
                libB.booksSortByScore = scoreLibB.booksSortByScore;
            }
            return scoreLibA.score - scoreLibB.score
        })

        return {firstLib: libOrderByScoreForNumberDays[0], reduceArray: libOrderByScoreForNumberDays.slice(1)}
    }

    
    let bestLib = undefined;
    let tempArray = copyOfLibArray;
    do{
        let resultBestLib = getBestLib(tempArray, numberDays);
        if (resultBestLib){
            tempArray = resultBestLib.reduceArray;
            bestLib = resultBestLib.firstLib
    
            /** @type OutputLibrary */
            const outputLib = {
                id: bestLib.id,
                idBooksArray: bestLib.booksSortByScore.map(book => {
                    book.score = 0;
                    return book.id
                })
            };
            outputLib.booksTobeScanNumber = outputLib.idBooksArray.length;        
            outputObject.outputLibArray.push(outputLib)
        }else{
            bestLib = null;
        }

    }while(bestLib)


    
    outputObject.signupLibNumber = outputObject.outputLibArray.length;
   
    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}

module.exports = processInput;