function typeWrite(elemento) {
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function (letra, i) {
        setTimeout(function () {
            elemento.innerHTML += letra;
            if (i === textoArray.length - 1) {
                elemento.innerHTML += ''; // Adiciona o emoji após o texto completo
            }
        }, 75 * i);
    });
}
const titulo = document.querySelector('.titulo-principal');
typeWrite(titulo);
