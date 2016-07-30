const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 80;

const makeRequest = (host, path)=> {
  return new Promise((resolve, reject) => {

    let options = {
      hostname: host,
      path: path,
      port: 80
    };

    let req = http.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      })
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

const server = http.createServer((req, res) => {

  let url_parts = url.parse(req.url, true).query.target;
  let target_url = url.parse(url_parts, true);

  let host = target_url.hostname;
  let path = target_url.path;

  if(url_parts) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    makeRequest(host, path).then((value) => {
      res.end(value);
      res.end('fnit')
      console.log(value)
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    responseData = '{status: false}'
    res.end(responseData);
  }
});

server.listen(port, hostname);


