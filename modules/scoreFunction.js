'use strict'
const getRideInfo = require('../libs/getRideInfo.js');


/**
 *
 * According to an Input javascript object and an Output javascript object,
 * it calculate the score of the output object
 *
 * @param {Object} input
 * @param {Object} output
 * @returns {number}
 */
function computeScore(input, output){
    let score = 0;

    /**
     * Code Goes Here ▼
     */
    if (!output || !output.vehicules){
        return score;
    }
    output.vehicules.forEach(vehicule => {
        if(!vehicule.rides){
            return;
        }
        vehicule.rides.forEach(ride => {
            const infos = getRideInfo(vehicule, ride, ride.vehiculeClock);
            const pointsEarn = infos.distanceOfRide + (infos.vehiculeWait >= 0 ? input.fileDesc.bonus : 0);
            score += pointsEarn;
        });
    });

    return score;
}

module.exports = computeScore;