export const getNameType = (value) => {
    /*let nome_tipo = ''

    if(value == 1) {
        nome_tipo = 'Administrador'
    }else if(value == 2) {
        nome_tipo = 'Gerente'
    }else if(value ==3 ){
        nome_tipo = 'Funcionário'
    }

    return nome_tipo*/

    var arr = ['Administrador', 'Gerente', 'Funcionário']
    return arr[value - 1]
}