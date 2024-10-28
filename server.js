const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      console.log("html works")
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/palindromeAPI') {
    console.log("Palindrome API works")
    try {

      let string = params['text'].toLowerCase()
      let backwards = params['text'].toLowerCase().split('').reverse().join('')

      if('text' in params){
        if (string === backwards) {
          console.log("Palidrome is working")
          // console.log("This is a palindrome")
          res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              status: "This is a palindrome"
            }
            res.end(JSON.stringify(objToJson));
        } else if (string !== backwards){
          console.log("!Palindrome is working")
          res.writeHead(200, {'Content-Type': 'application/json'});
          const objToJson = {
            status: "This is not a palindrome"
          }
          res.end(JSON.stringify(objToJson));
        } 
      }

      // if('text' in params){
      //   console.log("text params works")
      //   if(params['text']== 'leon'){
      //     console.log("entered string is received")
      //     res.writeHead(200, {'Content-Type': 'application/json'});
      //     const objToJson = {
      //       name: "leon",
      //       status: "Boss Man",
      //       currentOccupation: "Baller"
      //     }
      //     res.end(JSON.stringify(objToJson));
      //   }//student = leon
      //   else if(params['text'] != 'leon'){
      //     res.writeHead(200, {'Content-Type': 'application/json'});
      //     const objToJson = {
      //       name: "unknown",
      //       status: "unknown",
      //       currentOccupation: "unknown"
      //     }
      //     res.end(JSON.stringify(objToJson));
      //   }//student != leon
      // }//student if
    } catch (error) {
      console.error('Error processing string:', error.message);
      // Implement error handling logic here
    }
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(3333);