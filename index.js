// TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)

const http = require('http');
const host = 'localhost'
const port = 8000;
const fs = require('fs');
const path = require('path');
const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
//const port = process.env.PORT || 8000;
//const httpStatus = require('http-status-codes');

// Import resources for API
const resources = require("./models/resources");

// Create error handling / response
const sendErrorResponse = (req, res, errorMessage) => {
  res.writeHead(httpStatusCodes.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  // TODO: Implement res.end with error message in h1 tags with text "Resource not found"
  res.end('<h1>Resource not found</h1>');
};

// Create Web Server
const server = http.createServer(function (req, res) {
  // Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
    // TODO: Implement healthcheck code here
    res.writeHead(httpStatusCodes.OK, {
      "Content-Type": "text/html",
    });
    res.end('<h1>Your server is running, go catch it!</h1>');
  }
  // Implement static file system and serve /views/index.html
  // ** OPTIONAL: Setup dynamic reading and serving of other static files (Hint: see lesson 6.1 Wexxler)
  fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
    if (error || !data) {
      sendErrorResponse(req, res, 'Resource not found');
    }
    // TODO: Implement res.writehead to send header information - 200 response content type html
    else {
      res.writeHead(httpStatusCodes.OK, {
        "Content-Type": "text/html",
      });
    // TODO: Implement res.end to send data
    res.end(data);
  }
});

  // Add a basic api to serve resources.js
  if (req.url == "/api/resources") {
    if (!resources) {
      sendErrorResponse(req, res, 'Resource not found');
    } 
    // TODO: Implement res.writeHead to send httpStatus.OK with JSON content type
    else {
      res.writeHead(httpStatusCodes.OK, {
        "Content-Type": "application/json",
      });
    // TODO: Implement res.end and use JSON.stringify to return resources
    res.end(JSON.stringify(resources));
  }
}
});

server.listen(port); // listen for any incoming requests;

console.log(`The server has started and is listening on port number: ${port}`);
