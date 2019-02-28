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
    finalObject.tagArray = [];
    console.log('start finalParse');
    Object.keys(finalObject.tagMap).forEach(tagKey=>{
        console.log('process tag key', tagKey);
        const tagEntry = finalObject.tagMap[tagKey];
        finalObject.tagArray.push({tagKey, idList: Object.keys(tagEntry)});
    })

    return finalObject;
}
module.exports = finalParseOperation;