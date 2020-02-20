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
 * @typedef Hash
 * @property {number} deadline
 * @property {Library[]} libArray
 * @property {Object<string, Library>} libMap
 * @property {Book[]} booksArray
 * @property {Object<string, Book>} booksMap
 */
class Book{
    constructor(){
        this.id;
        this.score;
        this.alreadyProcess;
    }
}
class Library{
    constructor(){
        this.id;
        this.signupTime;
        this.parallelBooksNumber;
        this.booksArray = [];
        this.booksMap = {}
    }
}

class Hash{
    constructor(){
        this.deadline;
        this.currentDay;
        this.libArray = [];
        this.libMap = {};
        this.booksArray = [];
        this.booksMap = {}
    }

}

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
 * Transform a set of row to a javascript object
 * This method is only execute once
 *
 * @param {number} lineCount
 * @param {string} line
 * @param {Result} result
 */
function parse(lineCount, line, result){
    /**
     * Code Goes Here ▼
     */

    if (lineCount === 0){}
}


module.exports = parse;