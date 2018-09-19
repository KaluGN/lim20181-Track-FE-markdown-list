#!/usr/bin/env node
const [, , ...args] = process.argv

const program = require('commander');
const mdLinks = require('./index');
const path = require('path');
const route = path.resolve(args[0]);

const mdlinks7 = (route,options) => {
  mdLinks(route,options)
  .then(res=>console.log(res))
}


program
  .version('0.1.0')
  .arguments('<path>')
  .option('-v, --validate')
  .option('-s, --stats')
  .action(mdlinks7)
program.parse(process.argv)

// mdLinks(args[0],options)
// .then(res=>{})