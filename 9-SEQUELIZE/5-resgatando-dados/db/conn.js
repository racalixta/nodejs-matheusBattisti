const { Sequelize } = require('sequelize');
// 6.6.5

const sequelize = new Sequelize('nodesequelize2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// try {
//   sequelize.authenticate();
//   console.log('Conectamos com sucesso!')

// } catch(err) {
//   console.log('Não foi possível conectar: ', err);
// }

module.exports = sequelize;
