const fs = require('fs');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');
const path = require('path');

const uniques = (arrLinks) => {
  return new Set(arrLinks.map((linkObj) => linkObj.href))
}

const stats = (arrLinks) => {
  return [{
    unique: uniques(arrLinks).size,
    total: arrLinks.length,
  }]
}

const validateEach = (link) => {
  return new Promise((resolve, reject) => {
    linkCheck(link, (err, result) => {
      resolve({ href: result.link, status: result.statusCode, statusText: result.status })
    })
  })
}

const validate = (arrLinks) => Promise.all(arrLinks.map(link => validateEach(link.href)))

const statsValidate = (arrLinks) => {
  const statsResult = stats(arrLinks);
  return validate(arrLinks).then(r => {
    statsResult[0].broken = r.filter(link => link.statusText === 'dead').length;
    return statsResult;
  });
}

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

const extractLinks = (ruta) => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, result) => {
    resolve(markdownLinkExtractor(result).map((link) => {
      return ({
        href: link.href,
        title: link.text,
        file: ruta
      })
    }))
  })
})

const mdlinks = (ruta, options) => allFiles(path.resolve(ruta)).then(files => {
  if (typeof files === 'string' && path.extname(ruta) === '.md') {
    return extractLinks(files)
  } else {
    return Promise.all(files.map(file => extractLinks(file)))
      .then(arr => [].concat(...arr))
  }
}).then(links => {
  if (options.validate && options.stats) {
    return statsValidate(links);
  } else if (options.validate) {
    return validate(links);
  } else if (options.stats) {
    return stats(links);
  } 
  return links
})

module.exports = mdlinks;
