const hostname = '127.0.0.1';
const port = 3000;

const server = require('./controller.js');

server.listen(port, hostname, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
