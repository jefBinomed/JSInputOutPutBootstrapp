'use strict'
const getDistance = require('./getDistance.js');

function canTakeRide(vehicule, ride) {
    let distanceToRide = getDistance(vehicule.position, ride.startPoint);
    let distanceOfRide = getDistance(ride.startPoint, ride.endPoint);

    let startStep = Math.max(vehicule.clock + distanceToRide, ride.startStep);
    return (startStep + distanceOfRide) <= ride.endStep;
}

module.exports = canTakeRide;