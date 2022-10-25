const fs = require('fs'); // file system

fs.readFile('arquivo.txt', 'utf8', (err, data) => {
    if(err) return console.log(err);

    console.log(data);
});
