const service = require("./service");

console.clear();

const ERROR = [];
const INITIAL_VALUE = 0;
const ONE = 1;
const RESULT = [];
const RENEWAL_REMINDER = 'RENEWAL_REMINDER';
const ADD_TOPUP_FAILED = 'ADD_TOPUP_FAILED';
const TOPUP = 'ADD_TOPUP';
const RENEWAL_AMOUNT = 'RENEWAL_AMOUNT';
const DUPLICATE_CATEGORY = 'ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY';
const DUPLICATE_TOPUP = ADD_TOPUP_FAILED + ' DUPLICATE_TOPUP';
const SUBSCRIPTIONS_NOT_FOUND = 'SUBSCRIPTIONS_NOT_FOUND';

let COUNTER = {
    MUSIC: INITIAL_VALUE,
    VIDEO: INITIAL_VALUE,
    PODCAST: INITIAL_VALUE,
    ADD_TOPUP: INITIAL_VALUE,
};

const generateResultString = (type, renewDate) => {
    if (type !== TOPUP) {
        const newStr = `${RENEWAL_REMINDER} ${type} ${renewDate}`;
        RESULT.push(newStr);
    }
};

const hasCounterValidationFailed = (type) => {
    const DUPLICATE_MESSAGE = {
        MUSIC: DUPLICATE_CATEGORY,
        VIDEO: DUPLICATE_CATEGORY,
        PODCAST: DUPLICATE_CATEGORY,
        ADD_TOPUP: DUPLICATE_TOPUP,
    };

    if (COUNTER[type] > 1) {
        const msg = DUPLICATE_MESSAGE[type];
        ERROR.push(msg);
    }

    return ERROR.length > 0;
};

const hasNoSubscription = () => {
    if (COUNTER.MUSIC === 0 && COUNTER.VIDEO === 0 && COUNTER.PODCAST === 0) {
        ERROR.push(SUBSCRIPTIONS_NOT_FOUND);

        if (COUNTER.ADD_TOPUP > 0) {
            const msg = `${ADD_TOPUP_FAILED} ${SUBSCRIPTIONS_NOT_FOUND}`;
            ERROR.unshift(msg);
        }
    }
    return ERROR;
};

const controller = (fileData, startDate) => {
    let TOTAL = 0,
        res;

    for (let i = INITIAL_VALUE; i < fileData.length - ONE; i++) {
        res = service(fileData[i], startDate);
        TOTAL += res.price;
        COUNTER[res.type] += ONE;

        if (hasCounterValidationFailed(res.type)) {
            throw ERROR;
        }

        generateResultString(res.type, res.renewDate);
    }

    const hasErrors = hasNoSubscription();
    if (hasErrors.length > 0) {
        throw hasErrors;
    }

    TOTAL = `${RENEWAL_AMOUNT} ${TOTAL}`;
    RESULT.push(TOTAL);

    return RESULT;
};

module.exports = controller;
