const fs = require('fs')

const http = require('http');
const server = http.createServer((req, res) => {

    //sets header content type
    res.setHeader('Content-Type', 'text/html');

    //
    let path = './views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301
            res.setHeader('Location','/about') //to redirect the pages
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode=404;
            break;
    }

    //send html file
    fs.readFile(path, (err, data) => {
        if (err) { console.log(err); res.end(); }
        else {  res.end(data) }
    })

    
}).listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000')
})

