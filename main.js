'use strict'

const parse = require('./helpers/parser.js'),
    writeOutput = require('./helpers/writer.js'),
    parseMethod = require('./modules/parseFunction.js'),
    finalParseMethod = require('./modules/finalParseFunction.js'),
    convertMethod = require('./modules/outputFunction.js'),
    program = require('commander'),
    fs = require('fs');

program
    .version('0.0.1')
    .option('-f, --file <file>', 'Input File')
    .option('-d, --dir <directory>', 'target all files in input Dir')
    .option('-multi, --multi', 'is set We use Multithread nodeJS else, we use Promise.All')
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
            let computeMethod = require('./helpers/processor.js');
            if (program.multi){
                computeMethod = require('./helpers/processorMultiThread.js');
            }
            const result = await parse(program.file, parseMethod, finalParseMethod);
            const output = await computeMethod(result);
            writeOutput(program.file.split("/")[1] + "_output", output, convertMethod);

        } catch (error) {
            console.error('Parse Error ! %s', error);
        };

    } catch (e) {
        console.error(e);
        console.error('File %s does not exists ! ', program.file);
        return;
    }
}

main(program);