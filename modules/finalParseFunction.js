'use strict'


/**
 * Compute some additionnal commons calculation do add to the final object
 * The original object is not touch 
 * This method is only execute once !
 * 
 * @param {Object} parseResult 
 * @returns {Object} the transform object
 */
function finalParseOperation(parseResult) {
    // We copy the object
    const finalObject = {...parseResult};

    /**
     * Code Goes Here ▼
     */

    finalObject.vehicules = createVehicules(finalObject);

    return finalObject;
}

function createVehicules(data) {
    return Array(data.fileDesc.numberVehicules).fill(null).map((_, index) => ({
        id: index,
        nbRides: 0,
        rides: [],
        position: { col: 0, row: 0 },
        currentRide: null,
        clock: 0
    }));
}

module.exports = finalParseOperation;