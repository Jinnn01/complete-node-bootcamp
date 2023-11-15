const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
// if those data are the same or only need to loaded once, can use sync

// product json API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// objectData is an array for all data in json
const objectData = JSON.parse(data);

const slugs = objectData.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);
// load html template
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/Template_overview.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/templates/Template_card.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/Template_product.html`, 'utf-8');


// non-sync, will be called each time, if there is a request
// Routing
const server = http.createServer((req, res) => {
    // console.log(req);
    // extract the query and pathname from the URL of an incoming request. 
    const { query, pathname } = url.parse(req.url, true);
    // console.log(url.parse(req.url, true));
    // const pathName = req.url;

    //overview page
    if (pathname === '/' || pathname === '/overview') {
        //read overview template, since the template always be the same, we can call outside callback function
        res.writeHead(200, { 'Content-type': 'text/html' });

        // TODO: Replace placeholder with actual card
        const cardHtml = objectData.map(el => replaceTemplate(cardTemplate, el)).join('');
        const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardHtml);
        res.end(output);

        // product page
    } else if (pathname === '/product') {
        //console.log(query);
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = objectData[query.id];
        const output = replaceTemplate(productTemplate, product);
        res.end(output);
        // api page
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
        // NOT Found
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
