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



const mdlinks = (ruta, options) => new Promise((resolve, reject) => {
  const newRoute = path.resolve(ruta);
  if (fs.statSync(ruta).isFile()) {
    if (path.extname(ruta) === '.md') {
      let markdown = fs.readFileSync(ruta, 'utf-8');
      let arrLinks = []
      let arrResp = []
      var links = markdownLinkExtractor(markdown);
      links.forEach((link) => {

        arrLinks.push(link.href)
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
