const chalk = require('chalk');

const nota = 4;

if(nota >= 7) {
    console.log(chalk.green.bold('Parabéns! Você está aprovado'));
} else {
    console.log(chalk.bgRed.bold('Parabéns! Você está de recuperação! '))
}

