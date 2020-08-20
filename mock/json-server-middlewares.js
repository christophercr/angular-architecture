"use strict";

/**
 * Custom request transformations.
 * @param req {*} The current request
 * @param res {*} The current response
 * @param next {Function} Function to call next middleware (should always be called at the end of the current middleware)
 */
exports.transformRequests = function (req, res, next) {
  console.log("--- transformRequests custom middleware");

  if (req.method === "GET" && req.url.match(/\/security\/userprofile/)) {
    req.url = req.url.replace(/\/security\/userprofile/, "/userprofile");
    console.log("--- request url transformed for request => %s", req.url);
  } else if (req.method === "POST" && req.url.match((/\/auth\/login/))) {
    let searchCriteria = req.body;
    req.method = "GET";
    req.url = req.url.replace(/\/auth\/login/, "/users\?email=" + req.body.email + "&password=" + req.body.password);
    Object.assign(req.query, searchCriteria);
    console.log("--- login request HTTP method changed for request => %s", req.url);
  } else if (req.method === "POST" && req.url.match((/\/users/))) {
    let newUser = req.body;
    const randomNumber = Math.floor(Math.random() * 50);
    newUser['token'] = 'dummy-token-' + randomNumber;
    console.log("--- added user token to register user request => %s", req.body);
  } else if (req.method === "POST" && req.url.match((/\/auth\/forgot-password/))) {
    // changing the request url to '/users' so that we can search for the given email
    req.method = "GET";
    req.url = req.url.replace(/\/auth\/forgot-password/, "/users\?email=" + req.body.email);
    console.log("--- forgot-password request HTTP method changed for request => %s", req.url);
  } else if (req.method === 'GET' && req.url.match((/\/users\?.*\*/))) { // search request
    let searchTerm = req.url.match(/\*\w*\*/);

    if (searchTerm) {
      searchTerm = searchTerm[0].replace(/\*/g, '');
      req.query = {};
      Object.assign(req.query, {q: searchTerm});

      req.url = req.url.replace(/users\?(.*)/, 'users\?q=' + searchTerm);
      console.log("--- users search request url transformed for request => %s", req.url);
    }
  } else if (req.method === 'GET' && req.url.match((/\/users\?/))) { // sort request
    // pagination params
    req.url = req.url.replace(/page/, '_page').replace(/limit/, '_limit');
    // sorting params
    const hasOrder = !!req.url.match(/order/);
    const order = req.url.match(/order=-/) ? 'desc' : 'asc';
    req.url = req.url.replace(/order=-?/, '_sort=');
    if (hasOrder) {
      req.url = req.url + '&_order=' + order;
    }

    // construct new query object
    const newQuery = {};
    for (const key of Object.keys(req.query)) {
      if (['page', 'limit'].indexOf(key) !== -1) {
        newQuery['_'+key] = req.query[key];
      } else if (key === 'order') {
        newQuery['_sort'] = req.query['order'].replace(/-/, '');
      }
    }
    if (hasOrder) {
      newQuery['_order'] = order;
    }
    Object.assign(req.query, newQuery);
    console.log("--- users (sorting) list request url transformed for request => %s", req.url);
  }

  next();
};

/**
 * Custom response transformations.
 * @param req {*} The current request
 * @param res {*} The current response
 * @param metadata {object} Metadata object constructed only for Collection responses
 */
exports.transformResponses = function (req, res, metadata) {
  console.log("--- transformResponses middleware");

  if (req.method === "POST" && req.url.match(/\/requests$/)) {
    const randomNumber = Math.floor(Math.random() * (2));

    // return a failure randomly
    if (randomNumber === 1) {
      const invalidDataHttpError = {
        type: "https://api.demo.nbb.be/v1/errors/request-invalid",
        title: "Invalid data",
        titleKey: "MESSAGES.ERRORS.INVALID_DATA",
        instance: "a35b74ad-d20f-4ea4-a686-7e0f906f9a7e",
        errors: [
          {
            type: "https://api.demo.nbb.be/v1/errors/data-invalid",
            title: "Invalid request data",
            titleKey: "errors.information.invalid",
            detail: "The request has some invalid fields.",
            detailKey: "REQUEST.ERRORS.REQUEST_INVALID_DATA",
            fields: [
              "holidayRequest.startDate",
              "holidayRequest.endDate",
              "holidayRequest.requestTypeId",
              "holidayRequest.comment"
            ],
            instance: "a35b74ad-d20f-4ea4-a686-7e0f906f9a7e"
          }
        ]
      };
      res.header("X-Hello", "This is a test when url = " + req.url);
      res.status(400);
      res.jsonp(invalidDataHttpError); // send the response immediately to the client (skip further middleware to be applied)
    }
  }

  if (req.url.match((/\/users\?email=/))) {
    let data = res.locals.data;
    let searchCriteria = req.query;
    console.log('---- searchCriteria', searchCriteria);
    let matchedUser = undefined;

    for (const user of data) {
      if (searchCriteria.password) {
        if (user.email === searchCriteria.email && user.password === searchCriteria.password) {
          matchedUser = user;
        }
      } else {
        // in case the criteria does not contain password ("forgot password" functionality)
        if (user.email === searchCriteria.email) {
          matchedUser = user;
        }
      }
    }
    //res.locals.data = Object.assign({}, matchedUser);
    console.log('---- new response data', matchedUser);

    if (matchedUser) {
      res.jsonp(matchedUser); // send the response immediately to the client (skip further middleware to be applied)
    } else {
      res.status(404).send('Sorry, we cannot find that!');
    }
  }

  if (req.url.match((/\/ping/))) {
    let host = req.headers["host"];
    res.send('Ping successful: backend running on host ' + host);
  }

  // This is to authorize the app domain to make a call through these urls
  const demoUrls = [
    "http://some.url:3001",
    "http://another.url:3002"
  ];

  if (demoUrls.indexOf(req.get("origin")) > -1) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "false");
  }
};
