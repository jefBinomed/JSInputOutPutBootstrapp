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
function parse(lineCount, line, result) {
    if (lineCount === 0){
        const [bookCount, libraryCount, deadline] = line.split(' ');
        result.hash = new Hash();
        result.hash.currentDay = 0;
        result.hash.deadline = deadline;
        return;
    }

    if (lineCount === 1) {
        const bookScores = line.split(' ');
        bookScores.forEach((score, index) => {
            const book = new Book();
            book.id = String(index);
            book.score = score;
            book.alreadyProcess = false;
            result.hash.booksArray.push(book);
            result.hash.booksMap[book.id] = book;
        });
        return;
    }

    if (lineCount % 2 === 0) {
        result.currentLibrary = new Library();
        const [ bookCount, signupProcessTime, bookShippingPerDay ] = line.split(' ');
        result.currentLibrary.id = String(( lineCount - 2 ) / 2);
        result.currentLibrary.signupTime = signupProcessTime;
        result.currentLibrary.parallelBooksNumber = bookShippingPerDay;
        result.currentLibrary.booksArray = [];
        return;
    }

    if (lineCount % 2 === 1) {
        const booksInLibrary = line.split(' ');
        booksInLibrary.forEach(bookId => {
            result.currentLibrary.booksArray.push(result.hash.booksArray[bookId]);
        });
        result.hash.libArray.push(result.currentLibrary);
        result.hash.libMap[result.currentLibrary.id] = result.currentLibrary;
        delete result.currentLibrary;
        return;
    }

    console.error('NOT MANAGED LINE', lineCount, line);

}


module.exports = parse;