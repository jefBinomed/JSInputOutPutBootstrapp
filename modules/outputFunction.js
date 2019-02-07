'use strict'
const _ = require('lodash'),
    R = require('ramda');


/**
 * Transform an output object to a list of string. Each string will be write into an output file
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
    objectToConvert.vehicules.forEach((vehicule) => {
		const join = vehicule.rides.map(ride => ride.idRide).join(' ');
		instructions.push(`${vehicule.rides.length} ${join}\n`); // again
	});

    return instructions;
}


module.exports = convert;