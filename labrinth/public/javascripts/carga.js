window.addEventListener('load',function(){
    console.log('JS vinculado correctamente');

    let formulario = document.querySelector('form#carga');
    console.log(formulario.elements)


    let inputName = formulario.elements[0];
    let inputDescription = formulario.elements[1];
    let inputPrice = formulario.elements[2];
    let inputDiscount = formulario.elements[3];
    let inputCategory = formulario.elements[4];
    let inputImage = formulario.elements[5];
    
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    




})