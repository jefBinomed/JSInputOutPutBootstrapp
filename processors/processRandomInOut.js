"use strict";
const _ = require("lodash"),
  R = require("ramda"),
  computeScore = require("../modules/scoreFunction.js");

/**
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Object} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject) {
  const outputObject = {
    numberIntersectionsWithLight: inputObject.intersectionsNumber,
    intersections: []
  };

  inputObject.intersections.forEach((intersection) => {
    const streets = intersection.in.map((inStreetId) => {
      const inStreet = inputObject.streetsMap.get(inStreetId);
      return {
        streetId: inStreet.id,
        streetName: inStreet.name,
        timeGreenLight: Math.floor(Math.random() * (intersection.in.length+intersection.out.length))+1,
      };
    });
    outputObject.intersections.push({
      idIntersection: intersection.id,
      intersectionNumber: intersection.intersectionNumber,
      numberOfStreets: intersection.in.length,
      streets
    });
  });

  return {
    score: computeScore(inputObject, outputObject),
    outputObject
  };
}

module.exports = processInput;
