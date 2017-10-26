## Installation

Make sure you have the latest Node.js installed. [Download from here](https://nodejs.org)

In the project directory
### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Brief explanation

I use node.js with express.js to build a simple web backend server(in folder '/server').<br>
CSV loading/saving/parsing are all done in backend. <br>
React.js and Redux are there to build my frontend requesting CSVs from backend and render them.<br>
I create a cimple setting file recording the column relations between CSVs(/server/csv.setting). <br>
This makes it easier if we have other CSVs which also include columns relating to other CSV in the future.<br>
I pretty much follow the `clean code` principle so there are not many comments in the code.
There are still a lot I can do making this better including non-specificly pulling all CSVs, migrating more table attributes into table setting file and such.<br>
Pity that I was promising you to deliver in 2 days. If there's anything you would like to see please let me know. 