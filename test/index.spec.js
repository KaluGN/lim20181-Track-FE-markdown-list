const mdlinks = require('../index');

test('mdlinks debería retornar una promesa', () => {
    const options = {
        validate: false,
        stats: false
    }
    return expect(mdlinks("README.md", options)).toBeInstanceOf(Promise);
});

test('Debería retornar [{Total : 6, Unique : 8, Broken : 3}]', () => {
    const options = {
        validate: true,
        stats: true
    }
    return expect(Promise.resolve(mdlinks('test', options))).resolves.toMatchSnapshot();
});

test('Debería retornar [{Total : 6, Unique: 8}]', () => {
    const options = {
        validate: false,
        stats: true
    }
    return expect(Promise.resolve(mdlinks("test", options))).resolves.toMatchSnapshot();
});

test('Debería retornar "Dead" o "alive"', () => {
    const options = {
        validate: true,
        stats: false
    }
    return expect(Promise.resolve(mdlinks("test", options))).resolves.toMatchSnapshot();
});