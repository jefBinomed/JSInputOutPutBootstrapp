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
    .option('-l, --log', 'if set, will log some informations like result of each functions')
    .option('-f, --file <file>', 'Input File')
    .option('-d, --dir <directory>', 'target all files in input Dir')
    .option('-multi, --multi', 'is set We use Multithread nodeJS else, we use Promise.All')
    .parse(process.argv);

async function main(program) {


    // We check the parameters
    if (!program.file && !program.dir) {
        console.error("Argument file missing ! ");
        return;
    }

    try {

        const inputFiles = [];
        if (program.file){
            inputFiles.push(program.file);
        }else if (program.dir){
            fs.readdirSync(program.dir).forEach(fileProcessor => {
                inputFiles.push(`${program.dir}/${fileProcessor}`);
            });
        }

        inputFiles.forEach(async file => {

            // We check if the file exists
            fs.accessSync(file, fs.F_OK);
    
            // We parse then we do the conversion
            try {
                let computeMethod = require('./helpers/processor.js');
                if (program.multi){
                    computeMethod = require('./helpers/processorMultiThread.js');
                }
                const result = await parse(file, parseMethod, finalParseMethod);
                if (program.log) {
                    console.log(`-------------------------------
FILE : ${file} parsed`)
                }
                const output = await computeMethod(result, program.log);
                if (program.log) {
                    console.log(`FILE : ${file} computed
-------------------------------`)
                }
                writeOutput(file.split("/")[2] + "_output", output, convertMethod);
    
            } catch (error) {
                console.error('Parse Error ! %s', error);
            };
        })

    } catch (e) {
        console.error(e);
        console.error('File %s does not exists ! ', program.file);
        return;
    }
}

main(program);