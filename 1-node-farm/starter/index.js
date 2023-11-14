// include modules
const fs = require('fs');
// Blocking
// Read file
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);

// Write file
const textOut = `This is what we know about the avocade:${textIn}.\nCreated on ${Date.now()}`;
//write into a new file
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!')

fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('Reading file...');

//Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('File Reading...');

// read the content of files in start.txt
fs.readFile('./txt/startt.txt', 'utf-8', (err, filename) => {
    if (err) return console.log("Oppps");

    fs.readFile(`./txt/${filename}.txt`, 'utf-8', (err, data1) => {
        console.log(data1);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data2) => {
            console.log(data2);
            fs.writeFile('./txt/final2.txt', `${data1}\n${data2}`, 'utf-8', err => {
                console.log("Your file has been written");
            });
        });
    });
});
console.log('File Reading...');