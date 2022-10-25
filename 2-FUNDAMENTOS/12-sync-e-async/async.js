const fs = require('fs')

console.log('inicio')

fs.writeFile('arquivo2.txt', 'tchau', function(err) {
    setTimeout(function() {
        console.log('Arquivo craido!')
    }, 2000)
})

console.log('fim')