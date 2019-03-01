const http = require('http');
const url = require('url');

function requestLogging(method,pathname) {
  console.log('Request Type:' +
    method + ' Endpoint: ' +
    pathname);
}

module.exports = http.createServer((req, res) => {
  const service = require('./userServices.js');
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname == '/user/list' && req.method === 'GET') {
    requestLogging(req.method,reqUrl.pathname);
    service.listUsers(req, res);
  } else if (reqUrl.pathname == '/user/add' && req.method === 'POST') {
    requestLogging(req.method,reqUrl.pathname);
    service.addUser(req, res);
  } else if (/^\/user\/delete\/[0-9]+/i.test(reqUrl.pathname) && req.method === 'DELETE') {
    requestLogging(req.method,reqUrl.pathname);
    service.deleteUser(req, res);
  } else if (/^\/user\/[0-9]+/i.test(reqUrl.pathname) && req.method === 'GET') {
    requestLogging(req.method,reqUrl.pathname);
    service.getUser(req, res);
  } else {
    requestLogging(req.method,reqUrl.pathname);
    service.invalidRequest(req, res);
  }
});
