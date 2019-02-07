'use strict'
const getDistance = require('./getDistance.js');

function getRideInfo(vehicule, ride, clock) {
    let distanceToRide = getDistance(vehicule.position, ride.startPoint);
    let distanceOfRide = getDistance(ride.startPoint, ride.endPoint);

    let startStep = Math.max(clock + distanceToRide, ride.startStep);
    return {
        ride,
        canTake: (startStep + distanceOfRide) <= ride.endStep,
        totalTime: (startStep + distanceOfRide),
        earlyFinish: ride.endStep - (startStep + distanceOfRide),
        vehiculeWait: ride.startStep - (distanceToRide + clock),
        distanceOfRide
    };
}

module.exports = getRideInfo;