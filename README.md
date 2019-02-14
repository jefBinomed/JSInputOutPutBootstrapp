# Node Version

You should use Node 10.5 or upper ! to run this project! There is an `.nrvmrc` file.

# Install

Simply run `npm install`

# Run

Each times, all the computation of `/processors` directory will be executes. The only constraints is that a javascript in `/processors` directory should expose only **ONE** method that respect this signature

```javascript
/**
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Object} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    const outputObject = {};


    return {
        score: 0, // the score of this calculations
        outputObject // the output object to use to write
    };
}
```

4 ways to run :

* `npm start $PATH_TO_INPUT_FILE` : will run all computation for `$PATH_TO_INPUT_FILE`
* `npm run all $PATH_TO_INPUT_DIRECTORY` : will run all computation for all files placed in `$PATH_TO_INPUT_DIRECTORY` directory
* `npm run multi $PATH_TO_INPUT_FILE` : will run all computation (One thread for each computation) for `$PATH_TO_INPUT_FILE` with the flag `--experimental-worker`
* `npm run mutli-all  $PATH_TO_INPUT_DIRECTORY` : will run all computation (One thread for each computation) for all files placed in `/inputs` directory with the flag `--experimental-worker`
* If you add `-l` to the command line, it will display somes logs (score by apply method, file name, ...)