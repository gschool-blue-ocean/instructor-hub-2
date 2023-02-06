# Instructor Hub

This project uses JWT and requires an auth token.

Instructor Hub is a web application used by instructors to grade students and aggregate student data.

## Prerequisites

The following dependencies are required to run the application:

- "@testing-library/jest-dom": "^5.16.5",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "aws-sdk": "^2.1307.0",
- "axios": "^1.3.1",
- "bootstrap": "^5.2.3",
- "chart.js": "^4.1.1",
- "formdata": "^0.10.4",
- "react": "^18.2.0",
- "react-bootstrap": "^2.7.0",
- "react-chartjs-2": "^5.1.0",
- "react-datepicker": "^4.8.0",
- "react-dom": "^18.2.0",
- "react-icons": "^4.7.1",
- "react-icons-kit": "^2.0.0",
- "react-query": "^3.39.2",
- "react-router-dom": "^6.4.5",
- "react-scripts": "^5.0.1",
- "sweetalert": "^2.1.2",
- "web-vitals": "^2.1.4"

## Installation:

To start Instructor Hub in a development environment first run `npm install` in both the root and `/api` directory of the project.

Next create your postgres database, copy `database.sql` and `seed.sql` from the /api directory to your docker container using the `docker cp database.sql [container]:database.sql`

Create an .env file in the following format:

```
PG_CONNECT="postgresql://postgres:docker@127.0.0.1:5432/blueocean"
COOKIES_SECRET_KEY=""
TOKEN_SECRET="hello"
AWS_BUCKET_NAME='upload-img-s3'
AWS_BUCKET_REGION='us-east-1'
AWS_ACCESS_KEY='AKIA3RYQAR76TOC7MWH3'
AWS_SECRET_KEY='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'

To start in a development environment use `npm start` in the root and `npm run dev` in the `/api` directory.


## Unit Testing/Integration Testing w/ JEST

*Installation:*
To use Jest, you first need to install it as a dev dependency in your project by running npm install --save-dev jest.

*Configuration:*
Create a jest.config.js file in the root of your project and add the following basic configuration:
    module.exports = {
        testEnvironment: 'node'
    };

*Writing Tests:*
Jest uses the describe and test functions to write tests.
Write your tests as individual functions inside describe blocks.
For example:

        describe('example test', () => {
        test('addition', () => {
            expect(1 + 2).toBe(3);
        });
        });

*Running Tests:*
Run the tests by using the command npm run test in your terminal.
Jest will automatically detect and run all the tests in your project.

*Testing Async Code:*
To test asynchronous code, you can use the async and await keywords.
Wrap your asynchronous code inside an async function and then call the function inside a test.
For example:

        describe('async test', () => {
        test('async example', async () => {
            const result = await asyncFunction();
            expect(result).toBe(expectedResult);
        });
        });

## Load Testing w/ K6

*Installation:*
Install K6 by running npm install -g k6 in your terminal.

*Writing Scripts:*
K6 scripts are written in JavaScript.
Create a new file with a .js extension and add the following code to import the K6 library:

    import http from 'k6/http';

Next, write the actions you want to perform in your test inside the default export function.
For example:

    export default function() {
        http.get('https://test.com');
    }

*Load Testing:*
Load testing is used to test the performance of a system under normal or expected load conditions. Example can be found in root directory.

*Spike Testing:*
Spike testing is used to test the system's performance during sudden and unexpected increases in load. Example can be found in root directory.

*Soak Testing:*
Soak testing is used to test the system's performance over an extended period of time.
Example can be found in the root directory.
```
