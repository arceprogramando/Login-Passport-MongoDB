
# Refactor de Login Por Formulario y sesiones MongoDB

- Desarrollar un servidor basado en Express donde podamos realizar consultas a nuestro archivo de productos, establecer nuestras rutas, y manejar multer para subir imágenes desde Handlebars. También, integrar socket.io, MongoDB, Mongoose, MongoAtlas, Express Handlebars, Router y clases para trabajar con Mongoose. Practicaremos la indexación de páginacion y el manejo de sesiones

## 🧞 Commands 

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             |Para instalar las dependencias necesarias del proyecto|
| `npm run start:dev`             |Para inicializar el proyecto en dev necesita variables de entorno |
| `npm run start:test`             |Para inicializar el proyecto en test necesita variables de entorno |
| `npm run start:prod`             |Para inicializar el proyecto en prod necesita variables de entorno |


## 🌳 Tree

```text
/
├── src 
│     └──config
│     └──controllers
│     └──dao
│     └──models
│     └──public
│     └──routes
│     └──services
│     └──views
│     └── app.js
│     └── utils.js
├── .env.development.local(.gitignore)
├── .env.test.local(.gitignore)
├── .env.prod.local(.gitignore)
├── .gitignore
├── .eslintrc.json
└── Readme.md
```
## Para la nueva estructura de mis commits voy a utilizar https://www.conventionalcommits.org/en/v1.0.0/

## Herramientas

### Para realizar este Arquitectura

- Backend

| Dependencias /Librerias | Funcionalidad                 |
| --------------- | --------------------------------------------------------------------------- |
| ✅ [node.js]    | Se  instalo a nivel local NodeJs.|
| ✅ [express]   | Se uso la libreria Express de NodeJs.|
| ✅ [nodemon] | Se utilizo nodemon para la recarga automatica del Proyecto | 
| ✅ [multer] | Para la subida de imagenes dentro de la carpeta public/upload|
| ✅ [express-handlebars] | Express handlebars para renderizar mi client en mi backend|
| ✅ [socket.io] | Se instalo socket.io para trabajar con websocket dentro de nuestro servidor|
| ✅ [sweetalert2] | Se utiliza sweetalert para las alertas de creacion o eliminación de productos|
| ✅ [mongoose] | Utilizo mongoose para trabajar las rutas de mi mongo atlas , y pasar mi filesistem a una base de datos|
| ✅ [eslint] |  Estoy usando eslint como dependencia de desarrollo para mejorar la escritura de mi codigo|
| ✅ [cors] |  Para que funcione como middleware que especifica los origenes permitidos GET,POST,DELETE,PUT,|
| ✅ [dotenv] |  Para que funcione la aplicacion con environments multientorno|
| ✅ [bootstrap] |  Para poder hacer mi representacion en handlebars un poco mas atractiva|
| ✅ [cross-env] |  Para ejecutar scripts que establecen y utilizan variables de entorno en diferentes plataformas|
| ✅ [mongoose-paginate-v2] |  Para controlar la paginacion de el proyecto|
| ✅ [cookie-parser] |  Para el control de las cookies|
| ✅ [express-session] |  Para el control de las sesiones activas|
| ✅ [session-file-store] |  Para el guardado de archivos de sesiones en local|
| ✅ [cookie-session] |  se utiliza para almacenar las sesiones del usuario en cookies en el lado del cliente (navegador).|
| ✅ [connect-mongo] | para el almacenamiento de sesiones en aplicaciones web basadas en Express.js y MongoDB.|


[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[nodemon]: <https://nodemon.io>
[multer]: <https://www.npmjs.com/package/multer>
[express-handlebars]:<https://www.npmjs.com/package/express-handlebars>
[socket.io]:<https://socket.io/docs/v4/>
[sweetalert2]:<https://sweetalert2.github.io/v10.html>
[mongoose]:<https://www.npmjs.com/package/mongoose>
[eslint]:<https://eslint.org>
[cors]:<https://www.npmjs.com/package/cors>
[dotenv]:<https://www.npmjs.com/package/dotenv>
[cross-env]:<https://www.npmjs.com/package/cross-env>
[express-routemap]:<https://www.npmjs.com/package/express-routemap>
[bootstrap]:<https://getbootstrap.com>
[mongoose-paginate-v2]:<https://www.npmjs.com/package/mongoose-paginate-v2>
[cookie-parser]:<https://www.npmjs.com/package/cookie-parser>
[express-session]:<https://www.npmjs.com/package/express-session>
[session-file-store]:<https://www.npmjs.com/package/session-file-store>
[cookie-session]:<https://www.npmjs.com/package/cookie-session>
[connect-mongo]:<https://www.npmjs.com/package/connect-mongo>
