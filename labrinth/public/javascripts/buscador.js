window.addEventListener('load',function(){
    let formulario = document.querySelector('.formBusqueda');
    let inputSearch = document.querySelector('.inputBuscar')
    console.log(formulario)

    formulario.addEventListener('submit',function(e){
        e.preventDefault()
        if(inputSearch.value != ""){
            formulario.submit()
        }
    })
})
