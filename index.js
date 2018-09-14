const fs = require('fs');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');
const path = require('path');

const uniques = (link) => {
  return [... new Set(link)];
}

const mdlinks = (ruta, options) => {
    // console.log(path);
    // console.log(options.validate);
    return new Promise((resolve, reject) => {
        if (fs.statSync(ruta).isFile()) {
            if (path.extname(ruta) === '.md') {
                if(options.validate && !options.stats){
                    var markdown = fs.readFileSync(ruta).toString();
                    var links = markdownLinkExtractor(markdown);
                    // resolve(links)
                    links.forEach((link) => {
                        const linkHref = link.href;
                        linkCheck(linkHref, function (err, result) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            // console.log(`${result.link} is ${result.statusCode} is ${result.status}`);
                            // console.log({link : result.link, status : result.statusCode, stat : result.status }) //Porque aquí no funciona el resolve ¡? Preguntar a una coach
                        });
                        console.log(`total: ${links.length}\nunicos :${uniques(linkHref).length}`)
                    })
                }else if(!options.validate && options.stats){
                    console.log('return total unicos')
                }else if(!options.validate && !options.stats){
                    console.log('return los link(href,text)')
                }else if(options.validate && options.stats){
                    console.log('return total unicos rotos')
                }
            } else {
                resolve('no soy md')
            }
        } else {
            resolve('soy otraa cosa')
        }
    })
}
module.exports = mdlinks;
