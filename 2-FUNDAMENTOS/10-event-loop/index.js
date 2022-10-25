function a() {
    console.log('Executando a()')
}

function b() {
    console.log('Executando b()')
}

function c() {
    b()
    console.log('Executando c()')
    a()
}


c()




