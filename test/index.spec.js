const mdLinks = require('../index');
const options = {
    validate: false,
    stats: false 
}

test('mdlinks debería retornar una promesa', () => {
    return expect(mdlinks("README.md", options)).toBeInstanceOf(Promise);
  });