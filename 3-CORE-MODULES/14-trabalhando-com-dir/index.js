const fs = require('fs');

if(!fs.existsSync('./minhaPasta')) {
  console.log('Não existe');
  // usar esse comando para criar a pasta
  fs.mkdirSync('minhaPasta'); 
} else {
  console.log('Existe!!!!!');
  
}
