const fs = require('fs');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');
const path = require('path');

const uniques = (link) => {
  return [... new Set(link)];
}

const validateEach = (link) => {
  return new Promise((resolve, reject) => {
    linkCheck(link, (err, result) => {
      resolve({ href: result.link, status: result.status, statusText: result.statusCode })
    })
  })
}
const validate = (arrLinks) => Promise.all(arrLinks.map(link => validateEach(link))).then(console.log)

// const allMarkdown = (rutaAbsoluta) => {
//   if (fs.statSync(rutaAbsoluta).isFile()) {
//     if(path.extname(rutaAbsoluta) === '.md') {
//       return rutaAbsoluta;
//     }
//   } else {
//     console.log(rutaAbsoluta)
//   }
// }


const allFiles = (rutaAbsoluta, arrLinks) => new Promise((resolve, reject) => {
  if (fs.statSync(rutaAbsoluta).isFile()) {
    resolve(rutaAbsoluta);
  } else {
    fs.readdir(rutaAbsoluta, 'utf-8', (err, files) => {
      Promise.all(files.map(file => allFiles(path.join(rutaAbsoluta, file))))
        .then(r => [].concat(...r))
        .then(r => resolve(r))
    })
  }
})

const mdlinks = (ruta, options) => new Promise((resolve, reject) => {
  const newRoute = path.resolve(ruta);
  allFiles(newRoute).then(console.log)
  if (fs.statSync(ruta).isFile()) {
    if (path.extname(ruta) === '.md') {
      let markdown = fs.readFileSync(ruta, 'utf-8');
      let arrLinks = []
      let arrResp = []
      var links = markdownLinkExtractor(markdown);
      links.map((link) => {
        console.log(link)
        //arrLinks.push(link.href)
      })

      if (options.validate && !options.stats) {
        // arrLinks.forEach((el) => {
        const answer = validate(arrLinks, arrResp)
        // })
        resolve(answer)



      }
      else {
        links.forEach((link) => {
          arrResp.push({ "href": link.href, "text": link.text, "file": ruta })

        }); resolve(arrResp)
      }

      // else if (!options.validate && options.stats) {
      //   console.log('return total unicos')
      // } else if (!options.validate && !options.stats) {
      //   console.log('return los link(href,text)')
      // } else if (options.validate && options.stats) {
      //   console.log('return total unicos rotos')
      // }
    }
    //   else {
    //     resolve('no soy md')
    //   }
    // } else {
    //   resolve('soy otraa cosa')
  }

})
module.exports = mdlinks;
