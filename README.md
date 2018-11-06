# Markdown Links

## Descripción

Esta [librería](https://www.npmjs.com/package/validador-mdlinks) permite visualizar el nombre, dirección y el estado de los links de un archivo de formato MD.

El comportamiento por defecto es analizar un archivo Markdown y mostrar los links encontrados.

## Versión

v 1.0.1


## Instalación

npm i validador-mdlinks

### CLI (Línea de comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```



### Options

#### `--validate`

Al pasar la opción `--validate`, se valida el funcionamiento del link, si resulta en una redirección a una
URL que responde ok, entonces consideraremos que el link es válido.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

El _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

#### `--stats`

Al pasar la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 2
```

#### `--stats` y `--validate`
Al combinar `--stats` y `--validate` obtendras estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 4
Unique: 3
Broken: 1
```

