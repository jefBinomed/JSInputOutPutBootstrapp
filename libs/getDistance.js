'use strict'


function getDistance(A, B) {
    return Math.abs(A.row - B.row) + Math.abs(A.col - B.col);
}

module.exports = getDistance;