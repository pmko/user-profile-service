const url = require('url');
const dao = require('./dao.js');
const ListUsersHandler = require('./handlers/listUsersHandler.js');
const AddUserHandler = require('./handlers/addUserHandler.js');
const DeleteUserHandler = require('./handlers/deleteUserHandler.js');
const GetUserHandler = require('./handlers/getUserHandler.js');

function getUserId(reqUrl) {
  return /[0-9]+/i.exec(reqUrl.pathname);
}

exports.listUsers = function (req, res) {
  const handler = new ListUsersHandler({store:dao});
  handler.getUsers().then((result) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });
};

exports.addUser = function (req, res) {
  body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  const handler = new AddUserHandler({store:dao});

  req.on('end', function() {
    postData = JSON.parse(body);

    handler.addUser(postData).then((result) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    });
  });
};

exports.deleteUser = function (req, res) {
  const id = getUserId(url.parse(req.url, true));
  const handler = new DeleteUserHandler({store:dao});

  handler.deleteUser(id).then((result) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });
};

exports.getUser = function (req, res) {
  const id = getUserId(url.parse(req.url, true));
  const handler = new GetUserHandler({store:dao});
  handler.getUser(id).then((result) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });
};

exports.invalidRequest = function (req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Invalid Request');
};
