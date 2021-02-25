"use strict";
const { map, lastIndexOf } = require("lodash");
const _ = require("lodash"),
  R = require("ramda");

/**
 * Transform a set of row to a javascript object
 * This method is only execute once
 *
 * @param {number} lineCount
 * @param {string} line
 * @param {Object} result
 */
function parse(lineCount, line, result) {
  /**
   * Code Goes Here ▼
   */

  if (lineCount === 0) {
    const [
      simulationDuration,
      intersectionsNumber,
      streetsNumber,
      carsNumber,
      scoreToReachDestionation
    ] = line.split(" ");
    result.streets = [];
    result.streetsMap = new Map();
    result.cars = [];
    result.carsMap = new Map();
    result.intersections = new Map();
    result.simulationDuration = simulationDuration;
    result.intersectionsNumber = intersectionsNumber;
    result.streetsNumber = streetsNumber;
    result.carsNumber = carsNumber;
    result.scoreToReachDestionation = scoreToReachDestionation;
  } else if (lineCount <= result.streetsNumber) {
    const [start, end, name, length] = line.split(" ");
    const streetId = `street-${lineCount}`;
    const street = { id: streetId, start, end, name, length };
    result.streets.push(street);
    result.streetsMap.set(streetId, street);
    const intersectionOutId = `intersec-${end}`;
    let intersectionOut = result.intersections.get(intersectionOutId);
    if (!intersectionOut) {
      intersectionOut = {
        id: intersectionOutId,
        intersectionNumber: end,
        in: [],
        out: []
      };
      result.intersections.set(intersectionOutId, intersectionOut);
    }
    const intersectionInId = `intersec-${start}`;
    let intersectionIn = result.intersections.get(`intersec-${start}`);
    if (!intersectionIn) {
      intersectionIn = {
        id: intersectionInId,
        intersectionNumber: start,
        in: [],
        out: []
      };
      result.intersections.set(`intersec-${start}`, intersectionIn);
    }
    intersectionIn.out.push(streetId);
    intersectionOut.in.push(streetId);
  } else {
    const [streetsNumber, ...streets] = line.split(" ");
    const carId = `car-${lineCount}`;
    const carPath = { id: carId, streetsNumber, streets };
    result.cars.push(carPath);
    result.carsMap.set(carId, carPath);
  }
}

module.exports = parse;
