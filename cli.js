#!/usr/bin/env node
const mdLinks = require('./index.js');
const [, , ...args]= process.argv;
console.log(args[0]);

const ruta = args[0];
const options = {
  validate: false,
  stats: false,
} 
if (!ruta) {
  console.log('ingrese la ruta')
}else{
  mdLinks (ruta, options)
  .then(response =>{
    if (options.validate == false && options.stats == false){
      console.log(`total: ${response.total} \nunique: ${response.unique} \nbroken: ${response.broken}`);
    }else if (options.stats){
      console.log(`total: ${response.total} \nunique: ${response.unique}`);
    }else if (options.validate){
      response.forEach(element => {
        console.log(`${element.file}\n ${element.href}\n ${element.status}\n ${element.text}`)
      });
    }else if (Array.isArray (response)){
      response.forEach(element =>{
        console.log(`${element.file}\n ${element.href}\n ${element.text}`);
      });
    }else {
      console.log(response);
    } 
  })
}
