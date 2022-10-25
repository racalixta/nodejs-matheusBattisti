const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual a sua linguagem preferida? ', (language) => {
    if(language.toUpperCase() === "HTML" || language.toUpperCase() === "CSS") {
        console.log('Isso não é linguagem de programação')
    } else {
        console.log(`A minha linguagem preferida é ${language}`)
    }

    readline.close()
})



