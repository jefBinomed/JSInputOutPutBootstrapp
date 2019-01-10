'use strict'

const parse = require('./helpers/parser.js'),
    compute = require('./helpers/processor.js'),
    writeOutput = require('./helpers/writer.js'),
    parseMethod = require('./modules/parseFunction.js'),
    convertMethod = require('./modules/outputFunction.js'),
    program = require('commander'),
    fs = require('fs');

program
    .version('0.0.1')
    .option('-f, --file <file>', 'Input File')
    .option('-d, --dir <directory>', 'target all files in input Dir')
    .parse(process.argv);

async function main(program) {


    // We check the parameters
    if (!program.file) {
        console.error("Argument file missing ! ");
        return;
    }

    try {
        // We check if the file exists
        fs.accessSync(program.file, fs.F_OK);

        // We parse then we do the conversion
        try {
            const result = await parse(program.file, parseMethod);
            const output = await compute(result);
            writeOutput(program.file.split("/")[1] + "_output", output, convertMethod);

        } catch (error) {
            console.error('Parse Error ! %s', msg);
        };

    } catch (e) {
        console.error('File %s does not exists ! ', program.file);
        return;
    }
}

main(program);