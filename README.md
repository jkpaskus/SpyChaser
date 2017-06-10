# Spy Chaser
Spy Chaser is made by Robert Bedard, Dennay Bedard, Jonas Paskus and Jonathan Medina for the first Motor City June Jam. The theme of the Jam is 80's Straight To Video Action. This game is also an homage to the original 1983 arcade game Spy Hunter.


## Setup

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/bobonthenet/SpyChaser.git`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.


## Changelog
