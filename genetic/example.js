 const { Genetic, Select } = require('./genetic.js'),
computeScore = require('../modules/scoreFunction.js');

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';

function randomString(length) {
    let text = '';
    for (let i = 0; i < length; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
}

function replaceAt(str, index, character) {
    return str.substr(0, index) + character + str.substr(index + character.length);
}

function getRandomFunction(input) {
    // create random strings that are equal in length to solution
    return () => randomString(input.solution.length);
}

function mutationFunction(entity) {
    // chromosomal drift
    const i = Math.floor(Math.random() * entity.length);
    const charIndex = Math.floor(Math.random() * charset.length);

    return replaceAt(entity, i, charset[charIndex]);
}

function crossoverFunction(mother, father) {
    // two-point crossover
    const len = mother.length;
    let ca = Math.floor(Math.random() * len);
    let cb = Math.floor(Math.random() * len);
    if (ca > cb) {
        [cb, ca] = [ca, cb];
    }

    const son = father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
    const daughter = mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

    return [son, daughter];
}

function getFitnessFunction(input) {
    return async a => computeScore(input.solution, a);
}

async function solve(input) {
    const GENERATIONS = 1000;
    const POPULATION_SIZE = 500;
    const randomFunction = getRandomFunction(input);
    const fitnessFunction = getFitnessFunction(input);

    const genetic = new Genetic({
        mutationFunction,
        crossoverFunction,
        fitnessFunction,
        randomFunction,
        populationSize: POPULATION_SIZE,
        fittestNSurvives: 1,
        select1: Select.FittestLinear,
        select2: Select.Tournament3,
    });


    genetic.seed();

    let res = {};
    for (let i = 0; i <= GENERATIONS; i++) {
        console.count('gen');
        await genetic.estimate();
        genetic.breed();

        res.solution = genetic.best()[0];
        console.log(res.solution);

        if (res.solution === input.solution) {
            break;
        }
    }
    //console.log(input.solution);
    return res;
}

module.exports = solve;
