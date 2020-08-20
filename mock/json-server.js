'use strict';

const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const middlewares = require('./json-server-middlewares.js');
const data = require('./db.json');

let mockData = Object.assign({}, data);
let routes = {};
let uploadEndpoints = {};

const server = getJSONServer(mockData, middlewares, routes, uploadEndpoints);

server.listen(3000, function () {
  console.log('JSON Server is running mock backend in port ' + 3000)
});

/**
 * Return default JSON-Server configuration
 * @param data {*} Mock data to be handled by the server
 * @param middlewares {object} Middlewares to be applied just after the default Stark middlewares
 * @param routes {object} (Optional) Routes to be rewritten (in order to support nested resources)
 * @param uploadEndpoints {object} (Optional) Endpoints for file uploads
 * @returns {server} ExpressJS server definition
 */
function getJSONServer(data, middlewares, routes, uploadEndpoints) {
  let server = jsonServer.create();
  let router = jsonServer.router(data);
  let defaultMiddlewares = jsonServer.defaults({bodyParser: false}); // disable default bodyParser usage since it causes some issues

  // set ExpressJS App settings
  // http://expressjs.com/en/api.html#app.settings.table
  //server.set('etag', false);  // disable default etag generation

  server.get('/', function (req, res) {
    let host = getHost(req);
    //setXSRFCookie(req, res);

    res.send('<h2>Congrats!</h2>\n' +
      '<p>You\'re successfully running JSON Server on <b>' + host + '</b></p>' +
      '<br>' +
      '<p>' +
      '  To access and modify resources, you can use any HTTP method' +
      '  <br>' +
      '  <ul>' +
      '  <li><code>GET</code></li>' +
      '  <li><code>POST</code></li>' +
      '  <li><code>PUT</code></li>' +
      '  <li><code>PATCH</code></li>' +
      '  <li><code>DELETE</code></li>' +
      '  <li><code>OPTIONS</code></li>' +
      '</p>');
  });

  /*server.get('/ping', function (req, res) {
    let host = getHost(req);
    //setXSRFCookie(req, res);

    res.send('Ping successful: backend running on host ' + host);
  });*/

  //router.db._.id = 'uuid'; // use "uuid" as resource id

  routes = routes || {};
  let starkRoutes = {};
  // merge routes into starkRoutes
  Object.assign(starkRoutes, routes);
  // starkRoutes = expandRewrittenRoutes(starkRoutes);

  server.use(jsonServer.rewriter(starkRoutes));
  server.use(defaultMiddlewares);
  // use bodyParser separately passing the same options as in json-server defaults
  server.use(bodyParser.json({limit: '10mb', extended: false}));
  server.use(bodyParser.urlencoded({extended: false}));
  server.use(cookieParser()); // to parse Cookie header and populate "req.cookies"
  // server.use(transformRequests);

  if (uploadEndpoints && uploadEndpoints instanceof Array) {
    addUploadEndpoints(server, uploadEndpoints);
  }

  // Apply custom request transformations (if any)
  middlewares = middlewares || {};
  if (middlewares.transformRequests) {
    server.use(middlewares.transformRequests);
  }

  // Apply stark default response transformations + custom transformations (if any)
  router.render = composeTransformResponses(middlewares.transformResponses);
  //router.render = middlewares.transformResponses;
  server.use(router);

  return server;
}

function getHost(req) {
  return req.headers["host"];
}

function addUploadEndpoints(server, endPoints) {
  const multer = require('multer');

  // multer disk storage settings
  let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
      let timestamp = Date.now();
      let fileNamePartials = file.originalname.split('.');
      let fileExtension = fileNamePartials.pop();
      let fileName = fileNamePartials.join('');

      callback(null, fileName + '-' + timestamp + '.' + fileExtension);
    }
  });

  endPoints.forEach(function (endPoint) {
    // multer settings
    let upload = multer({storage: storage}).single('file');

    // API path that will upload the files
    server.post(endPoint.path, function (req, res) {
      upload(req, res, function (err) {
        if (err) {
          res.jsonp({error_code: 1, error_dec: err});
          return;
        }
        res.jsonp('File uploaded successfully!');
      });
    });
  });
}

/**
 * Call all the different Stark default transformations first, then the provided custom transformation (if any) and
 * finally return the final response.
 * @param transformFn {Function} Transform function to be applied to the response. This function should be
 * provided via the "middlewares" parameter in the getJSONServer method.
 * This function will be called with 3 parameters:
 * - Request: the current request
 * - Response: the current response (containing the default changes made by Stark middleware)
 * - StarkMetadata: metadata object constructed by the Stark middleware (only for Collection responses)
 *
 * @returns {Function}
 */
function composeTransformResponses(transformFn) {

  return function (req, res) {

    // if (isValidXSRFToken(req, res)) {
      let collectionMetadata = {};

      // transformResponses(req, res, collectionMetadata);

      if (transformFn) {
        transformFn(req, res, collectionMetadata);
      }

      // Finally send the response to the client (in case it has not been sent yet)
      // See: http://expressjs.com/es/api.html#res.headersSent
      if (!res.headersSent) {
      //   if (isGetCollectionRequest(req)) {
      //     res.jsonp({items: res.locals.data, metadata: collectionMetadata});
      //   } else {
           res.jsonp(res.locals.data);
         }
      // }
    // }
  }
}
