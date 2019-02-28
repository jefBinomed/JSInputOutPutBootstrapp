'use strict'
const _ = require('lodash'),
    R = require('ramda');


/**
 * Transform an output object to a list of string. Each string will be write into an output file
 * This method is only execute Once
 * 
 * @param {Object} objectToConvert
 * @returns {Array<String>}
 */
function convert(objectToConvert){
    /**@type {Array<String>} */
    const instructions = [];

    /**
     * Code Goes Here ▼
     */
    instructions[0] = objectToConvert.liste.length;
    

    return instructions.concat(objectToConvert.liste);
}


module.exports = convert;