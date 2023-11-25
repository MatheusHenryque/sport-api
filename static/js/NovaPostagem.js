document.addEventListener("click", function(){
    let btnArquivo = document.getElementById("btnArq")
    let btnAcao = document.getElementById("btnAction")

    btnArquivo.addEventListener("click", function(){
        btnAcao.click()
    })
})