"use strict";
const _ = require("lodash"),
  R = require("ramda");

/**
 * Transform an output object to a list of string. Each string will be write into an output file
 * This method is only execute Once
 *
 * @param {Object} objectToConvert
 * @returns {Array<String>}
 */
function convert(objectToConvert) {
  /** 
    {
        numberIntersectionsWithLight : <number>
        intersections : [
            idIntersection : <string>
            intersectionNumber: <number>
            numberOfStreets: <number>
            streets : [
                streetId: <string>
                streetName: <string>
                timeGreenLight : <number>
            ]
        ]
    }
     */

  /**@type {Array<String>} */
  const instructions = [];
  // Number of intersection with light schedule
  instructions.push(`${objectToConvert.numberIntersectionsWithLight}`);
  // Set of repeting lines
  // Line 1 : intersection number
  // Line 2 : number of Incoming streets
  // Line 3 : first street name '_' time of light
  // Line X : xx street name '_' time of light
  for (let intersection of objectToConvert.intersections) {
    instructions.push(`${intersection.intersectionNumber}`);
    instructions.push(`${intersection.numberOfStreets}`);
    for (let street of intersection.streets) {
      instructions.push(`${street.streetName} ${street.timeGreenLight}`);
    }
  }

  /**
   * Code Goes Here ▼
   */

  return instructions;
}

module.exports = convert;
