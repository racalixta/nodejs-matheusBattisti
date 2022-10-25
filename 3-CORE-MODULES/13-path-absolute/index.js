const path = require('path')

// path absoluto
console.log('\n-----------------------\n')
console.log(path.resolve('teste.txt'))
console.log('\n-----------------------\n')


// fromar path

const midFolder = 'relatorios'
const fileName = 'matheus.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)

console.log('\n-----------------------\n')




