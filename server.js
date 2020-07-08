const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// we can save instance of server in a constant just in case you want to use it in future for something like websockets etc (we ain't doing it here though) u can just to http.createServer() as well without saving instance

const server = http.createServer((req,res) => {
  // console.log(req.url, req.method);

  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greeting = _.once(() => {
    console.log('hello brotherrrr');
  })
  greeting();
  greeting();
  

  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;  
      break;
      case '/about-us':
      res.statusCode = 301;  
      res.setHeader('Location', '/about');
      res.end();
        break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }


  //set header content types
  res.setHeader('Content-Type', 'text/html');
  
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data);
      res.end(data);
    }
  })
});

server.listen(3000, 'localhost', () => {
  console.log('listening for request on localhost 3000');
})