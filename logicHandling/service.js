const STORE = require('../global/globalVariables');
const DateUtility = require('../utils/DateUtility');
const dateUtils = new DateUtility();

/**
 * 
 * @param {Array} fileData - File data loaded from the input file
 * @param {String} startDate - A Valid Start Date
 * @returns {Object} result
 */

const service = (fileData, startDate) => {
    const TOPUP = 'ADD_TOPUP';
    const [dataType, type, plan] = fileData.split(' ');

    let result, renewDate;

    // if data typpe is not ADD_TOPUP
    if (dataType !== TOPUP) {
        result = STORE[plan][type];  // get Object from Store
        result.type = type;         // store type in the result
    } else {
        result = STORE[dataType][type]; // get Object from Store
        result.month = plan;    // store month in the result
        result.price = result.price * plan; // store price in the result
        result.type = TOPUP;    // store type in the result
    }

    // Calculate and store renew in the result
    renewDate = dateUtils.calculateRenewDate(startDate, result.month);
    result.renewDate = renewDate;

    // store the data in the result
    result.data = dataType;

    return result;
};

module.exports = service;
