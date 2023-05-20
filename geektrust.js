const fs = require("fs")
const DateUtility = require('./utils/DateUtility')
const dateUtils = new DateUtility();
const printBill = require('./printBill/bill');
const controller = require("./logicHandling/controller");

console.clear()

const filename = process.argv[2]
const START_DATE_INDEX = 0

let fileData = [], START_DATE = []

/**
 * Get File Data from the input file
 */

try {
    fileData = fs.readFileSync(filename, "utf8").replaceAll('\r', '').split("\n");
} catch (err) {
    console.log(err)
}

/**
 * Perform logic handling here
*/

try {

    START_DATE = fileData.splice(START_DATE_INDEX, 1)

    // first check if date is valid
    dateUtils._isValidDate(START_DATE)

    const result = controller(fileData, START_DATE)
    printBill(result)

} catch (err) {
    console.log(err)
    printBill(err)
}


