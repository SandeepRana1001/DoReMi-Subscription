const { exec } = require('child_process');
const { expect } = require('chai');

const updateFileContent = require('./test_method/updateFileContent')

const executionStatement = 'node geektrust.js test_input.txt'
const inputs = [
    'START_SUBSCRIPTION 20-02-2022\nADD_SUBSCRIPTION MUSIC PERSONAL\nADD_SUBSCRIPTION VIDEO PREMIUM\nADD_SUBSCRIPTION PODCAST FREE\nADD_TOPUP FOUR_DEVICE 3\nPRINT_RENEWAL_DETAILS'
]

const outputs = [
    'RENEWAL_REMINDER MUSIC 10-03-2022\nRENEWAL_REMINDER VIDEO 10-05-2022\nRENEWAL_REMINDER PODCAST 10-03-2022\nRENEWAL_AMOUNT 750'
]

describe('Running Test Cases For DoReMi Subscription', () => {

    for (let i = 0; i < inputs.length; i++) {

        it(`\n\nTest Case : ${i + 1} \n\tshould update the file content, run the app, and verify output`, (done) => {
            const filename = 'test_input.txt';
            const newContent = inputs[i];

            // Update the file content
            try {
                updateFileContent(filename, newContent);
            } catch (err) {
                console.log(err)
            }


            // Run the app
            exec(executionStatement, (error, stdout, stderr) => {
                if (error) {
                    done(error);
                } else {
                    // Verify if the output matches the expected output
                    const expectedOutput = outputs[i];
                    expect(stdout.trim()).to.equal(expectedOutput);
                    done();
                }
            });

        })
    }

})