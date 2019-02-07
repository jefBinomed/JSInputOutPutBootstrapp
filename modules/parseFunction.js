'use strict'
const _ = require('lodash'),
    R = require('ramda');


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

    if (lineCount === 0){
        const [rows, columns, numberVehicules, numberRides, bonus, numberOfSteps] = line.split(' ').map(i => +i);
        result.fileDesc = {
            rows,
            columns,
            numberVehicules,
            numberRides,
            bonus,
            numberOfSteps
        };
        result.rides = [];
    }else if (lineCount >= 1){
        // General case
        const [startPointRow, startPointCol, endPointRow, endPointCol, startStep, endStep] = line.split(' ').map(i => +i);
        result.rides.push({
            idRide: lineCount - 1,
            startPoint : {
                row : startPointRow,
                col : startPointCol,
            },
            endPoint : {
                row : endPointRow,
                col : endPointCol,
            },
            startStep,
            endStep
        });
    }
}


module.exports = parse;