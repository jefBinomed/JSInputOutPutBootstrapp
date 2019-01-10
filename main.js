'use strict'

const parse = require('./helpers/parser.js'),
    process = require('./helpers/processor.js'),
    writeOutput = require('./helpers/writer.js'),
    parseMethod = require('./modules/parseFunction.js'),
    convertMethod = require('./modules/outputFunction.js'),
    program = require('commander'),
    fs = require('fs');


program
    .version('0.0.1')
    .option('-f, --file <file>', 'Input File')
    .parse(process.argv);


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
        await result = parse(program.file, parseMethod);
        await output = process(result, []);
        writeOutput(program.file.split("/")[1] + "_output", output, convertMethod);

    } catch (error) {
        console.error('Parse Error ! %s', msg);
    };

} catch (e) {
    console.error('File %s does not exists ! ', program.file);
    return;
}