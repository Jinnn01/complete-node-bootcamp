const http = require('http');
const url = require('url');
const fs = require('fs');

//server request, response, sending out the response
// const server = http.createServer((req, res) => {
//     // console.log(req);
//     console.log(req.url);
//     res.end('Hello from the server');
// });
// // listen to in coming requests from clients
// server.listen(8000, '127.0.0.1', () => {
//     console.log('Listening to requests on port 8000');
// });

// API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const objectData = JSON.parse(data);
// Routing
const server = http.createServer((req, res) => {
    // console.log(req);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overivew page');
    } else if (pathName === '/product') {
        res.end('This is the product page');
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-hear': 'Hello-Bug'
        });
        res.end('<h1>Page Not Found</h1>');
    }
});
// listen to in coming requests from clients
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
