class DateUtility {

    constructor() {

        this.NEEDLE = '-'
        this.ADD_OPERATION = 'ADD';
        this.REMINDER_BEFORE_DAYS = 10;
        this.TOTAL_DIGITS = 2;
        this.INCREMENT_ONE = 1;
        this.INDEX = 1;
        this.INVALID_DATE_ERROR = ['INVALID_DATE', 'ADD_SUBSCRIPTION_FAILED INVALID_DATE']

    }

    _isLeapYear = (year) => {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                return year % 400 === 0;
            } else {
                return true;
            }
        }
        return false;
    }


    /**
     * Validate Date
     * @param {String} date  - Date to be validated
     * @returns {Boolean} true if date is valid
     * @throws {Array} INVALID_DATE_ERROR if not valid
     */

    _isValidDate = (date) => {
        const extracted = date.toString().split(' ')[this.INDEX];
        const [day, month, year] = extracted.split(this.NEEDLE);
        // return month

        const isLeapYear = this._isLeapYear(year);
        let msg = ''
        let str = 'Invalid Date'


        if (date >= 29 && month === 2) {
            if (!isLeapYear) {
                msg += str
            }
        } else if (day <= 0 || day > 31) {
            msg += str
        } else if (month <= 0 || month > 12) {
            msg += str
        }

        if (msg.trim().length === 0) {
            return true
        } else {
            throw this.INVALID_DATE_ERROR
        }

    }



    /**
     * This is a private method 
     * @param {Array} date - Contains string with a single value.Ex:  [ START_SUBSCRIPTION Date-Month-Year ]
     * @returns {String} - String with Extracted Date
     */


    _extractDate = (date) => {
        const extracted = date.toString().split(' ')[this.INDEX];
        return extracted
    }

    /**
     * 
     * @param {String} date - Date to be formatted
     * @param {String} needle  - The Separator symbol or character
     * @returns {Date} formattedDate 
     */

    _formatNeedleSeparatedDate = (date, needle) => {
        const [day, month, year] = date.split(needle);
        const formattedDate = new Date(year, month - 1, day)

        return formattedDate;
    }

    /**
     * 
     * @param {Date} date 
     * @returns {String}
     */
    _formatNumericDate = (date) => {
        const ADD_ZERO = '0';

        const day = String(date.getDate()).padStart(this.TOTAL_DIGITS, ADD_ZERO);
        const month = String(date.getMonth() + this.INCREMENT_ONE).padStart(this.TOTAL_DIGITS, ADD_ZERO);
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    }

    /**
     * 
     * @param {String} date 
     * @param {Integer} expirationMonth 
     * @returns {Date} reminderDate
     */

    _updateDate = (date, expirationMonth) => {
        const reminderDate = new Date(date);

        reminderDate.setMonth(reminderDate.getMonth() + expirationMonth);
        reminderDate.setDate(reminderDate.getDate() - this.REMINDER_BEFORE_DAYS);

        return reminderDate;
    }

    /**
     * 
     * @param {Array} startDate - Contains string with a single value.Ex:  [START_SUBSCRIPTION Date-Month-Year]
     * @param {Integer} expirationMonth - Plan expiration month
     * @returns {Date}
     */

    calculateRenewDate = (startDate, expirationMonth) => {
        startDate = this._extractDate(startDate)

        const SEPARATOR = '-';

        let formattedDate = this._formatNeedleSeparatedDate(startDate, SEPARATOR);
        const renewedDate = this._updateDate(formattedDate, expirationMonth);
        const result = this._formatNumericDate(renewedDate);

        return result;
    }
}

module.exports = DateUtility;