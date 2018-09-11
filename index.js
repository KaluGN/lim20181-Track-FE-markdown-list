// const {promisify} = require('es6-promisify');
const fs = require('fs');
const path = require('path');
/* const fech = require('node-fetch'); */
//const linkCheck = require('link-check');
// const stat = promisify(fs.stat);

const recorrer = (ruta) => {
  if (!fs.statSync(ruta).isDirectory()) {
    const content = fs.readFileSync(ruta)
    // LISTO!
    //console.log(ruta)
  } else { // entonces es directorio
    const rutasDir = fs.readdirSync(ruta)
    rutasDir.forEach(rutaDir => {
      recorrer(path.join(ruta, rutaDir))
    })
  }
}

const fsReadDir = (path) => new Promise((resolve, reject) => {
  fs.readdir(path, (err, files) => {
    err ? reject(err) : resolve(files)
  });
});


//recorrer('./node_modules')

fs.readFile('README.md', 'utf-8', (err, data) => {

  if (err) throw err;
  if (data) {
    const expression = /\[(.*?)\]\((.*?)\)/g;
    const reExp = new RegExp(expression);
    //console.log(data);
    let a = []
    data.split('\n')
      .map(line => reExp.exec(line))
      .filter(matches => !!matches)
      .forEach((matches, idx) => {
        // console.log(idx, line)
        // const data2 = reExp.exec(line)
        a.push({
          file: 'Aquí irá la ruta',
          text: matches[1],
          href: matches[2]})
        console.log(a);
      })
  }
});



//el metodo substring permite sacar e contenido de el [] y ()
//con el leng -1 me sale el indice y el subindice
//indexof(desde el ()hasta la url)
//split: que se parta donde hay un[] y un()
/* let promesa = fetch('');
promesa.then((res)=>{
  return res.json();
}).then((json)=>{
  console.log(json);
}) */

const readFileMd = (arrfile) => {
  fs.readFile(arrfile, (err, content) => {

  })
  try {
    const content = fs.readFileSync(arrfile);
    resolve(content)
  } catch (err) {
    reject(err)
  }
}






const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    err ? reject(err) : resolve(data)
  });
});

/* 
const extractLink = contenido => Promise.resolve([]);
const validateLink = (Link, count) => (
  (count === 0)
    ? Promise.reject(new Error('HTTP fail: status 500'))
    : Promise.resolve(200)
)
  .catch(err => {
    //console.log(err)
    return 500;
  })
 */
/* const mdLinks = (path, options) => {
  const resultFinal = {};
  const objTotalLinks = [];
  return new Promise((resolve, reject) => {
    if (options.validate && options.stats) {
      optionsLinks.readLinks(path)
        .then((result) => {
          optionsLinks.validateLinks(result).then((objLinks) => {
            const brokenLinks = objLinks.filter(link => link.status === 'Fail');
            objLinks.forEach((links) => {
              objTotalLinks.push(links.href);
            });
            resultFinal.total = objTotalLinks.length; 
            resultFinal.unique = [...new Set(objTotalLinks)].length;
            resultFinal.broken = brokenLinks.length;
            resolve(resultFinal);
          });
        });
        
    } else if (options.validate) {
      optionsLinks.readLinks(path)
        .then((result) => {
          optionsLinks.validateLinks(result)
            .then(responses => resolve(responses));
        });
    } else if (options.stats) {
      optionsLinks.readLinks(path)
        .then((result) => {
          optionsLinks.validateLinks(result)
            .then((objLinks) => {
              objLinks.forEach((links) => {
                objTotalLinks.push(links.href);
              });
              resultFinal.total = objTotalLinks.length; 
              resultFinal.unique = [...new Set(objTotalLinks)].length;
              resolve(resultFinal);
            });
        });
    } else {
      reject(new Error('Hubo un error'));
    }
  });
};

exports.mdLinks = mdLinks;
 */
const mdLinks = (route, options) => {
  let broque = 0;
  return new Promise((resolve, reject) => {
    try {
      if (options.validate && options.stats) {
        dirOrFile(route)
          .then(response => readFileMd(response))
          .then(links => statusLink(links))
          .then((response) => {
            const linkUnique = response.map(item => item.url)
              .filter((value, index, self) => self.indexOf(value) === index);
            response.forEach((link) => {
              if (link.valido === 'fail') {
                broque = 1 + broque;
              }
            });
            resolve({ total: response.length, unique: linkUnique.length, broquen: broque });
          });
      } else if (options.validate) {
        dirOrFile(route)
          .then(response => readFileMd(response))
          .then(status => resolve(statusLink(status)));
      } else if (options.stats) {
        dirOrFile(route)
          .then(response => readFileMd(response))
          .then((response) => {
            const linkUnique = response.map(item => item.url)
              .filter((value, index, self) => self.indexOf(value) === index);
            resolve({ total: response.length, unique: linkUnique.length });
          });
      } else dirOrFile(route).then(response => resolve(readFileMd(response)));
    } catch (err) {
      reject(err.message);
    }
  });
};

module.exports = mdLinks;





// // const {promisify} = require('es6-promisify');
// const fs = require('fs');
// const path = require('path');
// // const fech = require('node-fetch');
// /* const linkCheck = require('link-check'); */
// // const stat = promisify(fs.stat);

// const recorrer = (ruta) => {
//   if (!fs.statSync(ruta).isDirectory()) {
//     const content = fs.readFileSync(ruta)
//     // LISTO!
//     console.log(ruta)
//   } else { // entonces es directorio
//     const rutasDir = fs.readdirSync(ruta)
//     rutasDir.forEach(rutaDir => {
//       recorrer(path.join(ruta, rutaDir))
//     })
//   }
// }

// const fsReadDir = (path) => new Promise((resolve, reject) => {
//   fs.readdir(path, (err, files) => {

//     err ? reject(err) : resolve(files)
//   });
// });

// //recorrer('./node_modules')
// // const readFile = (e)
// fs.readFile('README.md', 'utf-8', (err, data) => {
//   let arrLinks = [];
//   if (err) throw err;
//   if (data) {
//     //  console.log(data);
//     const expression = /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm;
//     const reExp = new RegExp(expression);
//     const data2 = data.match(reExp)
//     console.log(data2);
//     arrLinks = data2.filter((link) => {
//       if (link !== '#' && link !== '*') {
//         return link;
//         console.log(link);
//       }
//     })

//   }
// }); 

// //metodo substring
// // agarrar el string y aplicar otro substring 

// // let promesa = fetch('');
// // promesa.then((res)=>{
// //   return res.json();
// // }).then((json)=>{
// //   console.log(json);
// // })

// const readFileMd = (arrfile) => {
//   fs.readFile(arrfile, (err, content) => {

//   })
//   try {
//     const content = fs.readFileSync(arrfile);
//     resolve(content)
//   } catch (err) {
//     reject(err)
//   }

// }

// const readFile = path => new Promise((resolve, reject) => {
//   fs.readFile(path, (err, data) => {
//     err ? reject(err) : resolve(data)
//   });
// });

// /* 
// const extractLink = contenido => Promise.resolve([]);
// const validateLink = (Link, count) => (
//   (count === 0)
//     ? Promise.reject(new Error('HTTP fail: status 500'))
//     : Promise.resolve(200)
// )
//   .catch(err => {
//     //console.log(err)
//     return 500;
//   })
//  */

// /* const fs = require('fs');
// const path = require('path');


// const recorrer = (ruta) => {
//     if(!fs.statSync(ruta).isDirectory()){
//       const content = fs.readFileSync(ruta)
//       //Listo :D
//       console.log(ruta);      
//     } else {
//       const rutasDir = fs.readdirSync(ruta)
//       rutasDir.forEach(rutaDir => {
//         recorrer(path.join(ruta, rutaDir))
//       });
//     }
//   }

//   const fsReadDir = (path) => new Promise((resolve, reject) => {
//     fs.readdir(path, (err, files) => {
//       err ? reject (err) : resolve(files)
//     });
//   });

//   recorrer('README.md')

//   const readFileMd = (arrfile) => {
//     fs.readFile(arrfile, (err, content) => {      
//     })
//     try {
//       const content = fs.readFileSync(arrfile);
//       resolve(content)
//     }catch (err){
//       reject(err)
//     }
//   }

//   const readFile = path => new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//       err ? reject(err) : resolve(data)
//     });
//   });

//   const extractLink = contenido => {}
//  */

//  // // const { promisify } = require("es6-promisify");
// // const fs = required('fs');
// // const path = require('path');
// // // const stat = promisify(fs.stat);


// // const fsReadDir = (path) => new Promise((resolve, reject) => {
// //   try {
// //     const files = fs.readdirSync(path)
// //     resolve(files)
// //   } catch (err) {
// //     reject(err)
// //   }
// // });

// // fsReadDir(process.cwd())
// //   // .then(x => console.log(x))
// //   .then(console.log)
// //   .catch(console.error)

// // const readFileMD = (arrFile) => {
// //   fs.readFile(arrFile)
// // }

// // const readFile = path => Promise((resolve, reject) => {
// //   try {
// //     const data = fs.readfile(path)
// //     resolve(data)
// //   } catch (err) {
// //     reject(err)
// //   }
// // });

// // const extratLink = contenido => Promise.resolve([]);
// // const validateLink = (link, count) => (
// //   (count === 0)
// //     ? Promise.reject(new Error('HTTP fail : status 500'))
// //     : Promise.resolve(200)
// // )
// //   .catch(err => {
// //     return 500;
// //   })


// // // const readFile = (arrFile) => {
// // //   const arrayfile = [];
// // //   const fileMD = arrayFile.map(file => path.extension(file);
// // // if(fileMD != 0) {
// // //   file.md.forEach(element => {
// // // if (data != null) {

// // // }
// // //   });
// // // }
// // //   )

// // // }




// // /* 


// // /* const extractLinks = contents => Promise.resolve([{

// //   }]); */


// // //   const {promisify} = require('es6-promisify');
// // // const fs = require('fs');
// // // /* const path = require('path'); */
// // // const stat = promisify(fs.stat);

// // // const fsReadDir = (path) => new Promise((resolve, reject)=>{
// // //   fs.readdir(path, (err, files)=> {
// // //     err? reject(err): resolve(files)
// // //   });
// // // });

// // // fsReadDir(process.cwd())
// // //  /*  .then(x=> console.log(x)) */
// // //   .then(console.log)
// // //   .catch(console.error)
// // // /* const path = require('path');
// // // let result = [];
// // //   */

// // // /* 
// // // const readFile = path => Promise.resolve(''); */
// // // const readFileMd = (arrfile) => {
// // //   fs.readFile(arrfile)
// // // }
// // // /*   const arrayLink = [];
// // //   const fileMd = arrfile.map(file=> path.extension(file) === '.md');
// // //   if(fileMd!== 0) {
// // //     file.md.forEach(element => {
// // //       if(data ! == null) {

// // //       }
// // //     /*    *//* const read = fs.readFileSync(element, 'utf8');
// // //       const exp = /\[(.*?)\]\(.*?\)/gm;
// // //       const data = read.match(exp);
// // //        */
// // //    /*  }); */




// // // const readFile = path => new Promise((resolve, reject)=>{
// // //   fs.readFile(path, (err, data)=> {
// // //     err? reject(err): resolve(data)
// // //   });
// // // });


// // // const extratLink = contenido => Promise.resolve([]);
// // // const validateLink = (Link, count)=>(
// // //   (count === 0)
// // //   ? Promise.reject(new Error ('HTTP fail: status 500'))
// // //   :Promise.resolve(200)
// // // )
// // //   .catch(err => {
// // //     //console.log(err)
// // //     return 500;
// // //   })
// // // /* const validateLinks = links = Promise.all(links.map(validateLink))
// // // .then(results => results.map((status, count)=>({
// // //   ...links[count],
// // //   status,
// // // })));

// // //  */ 