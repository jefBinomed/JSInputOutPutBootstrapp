'use strict'
const _ = require('lodash'),
    R = require('ramda');

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
        this.booksArray;
    }
}

class Hash{
    constructor(){
        this.libArray;
        this.deadline;
        this.currentDay;
    }

}

/**
 * Transform a set of row to a javascript object
 * This method is only execute once
 *
 * @param {number} lineCount
 * @param {string} line
 * @param {Object} result
 */
function parse(lineCount, line, result){
    /**
     * Code Goes Here ▼
     */

    if (lineCount === 0){}
}


module.exports = parse;