window.addEventListener('load',function(){
    console.log('JS vinculado correctamente');

    let formulario = document.querySelector('form#carga');
    console.log(formulario.elements)


    let inputName = formulario.elements[0];
    let inputDescription = formulario.elements[1];
    let inputPrice = formulario.elements[2];
    let inputDiscount = formulario.elements[3];
    let inputCategory = formulario.elements[4];
    let inputSection = formulario.elements[5];
    let inputImage = formulario.elements[6];
    

    let errores = {};
    let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    inputName.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorName.innerHTML = "El nombre del producto es obligatorio";
                this.classList.add('is-invalid')
                break;
            case this.value.trim().length <=3:
                errorName.innerHTML = "Tenés que poner al menos tres letras"
                this.classList.add('is-invalid')
                break
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorName.innerHTML = ""
                break;
        }

    })

    inputDescription.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorDescription.innerHTML = "El campo descripción es obligatorio";
                this.classList.add('is-invalid')
                break;
           
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorDescription.innerHTML = ""
                break;
        }

    })

    inputPrice.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorPrice.innerHTML = "El precio es obligatorio";
                this.classList.add('is-invalid')
                break;
           
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorPrice.innerHTML = ""
                break;
        }

    })

    inputDiscount.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorDiscount.innerHTML = "El descuento es obligatorio";
                this.classList.add('is-invalid')
                break;
           
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorDiscount.innerHTML = ""
                break;
        }

    })

    inputCategory.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorCategory.innerHTML = "La categoria es obligatoria";
                this.classList.add('is-invalid')
                break;
           
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorCategory.innerHTML = ""
                break;
        }
    })

    inputSection.addEventListener('blur',function(){

        switch (true) {
            case this.value.length === 0:
                errorSection.innerHTML = "La sección es obligatoria";
                this.classList.add('is-invalid')
                break;
           
            default:
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                errorSection.innerHTML = ""
                break;
        }
    })

    inputImage.addEventListener('change',function(e){

        switch (true) {
            case !regExExtensions.exec(this.value) :
                errores.image = "Solo imagenes con extension jpg, jpeg, png, o gif"
                errorImage.innerHTML = errores.foto;
                this.classList.add('is-invalid')
                this.value = '';
               
                break
                default:
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                    errorImage.innerHTML = " ";
                break;
        }
    })


    formulario.addEventListener('submit',function(e){
        e.preventDefault();
        let elementos = formulario.elements

   
        let error = false
        for (let index = 0; index < elementos.length-2; index++) {
            if(elementos[index].value == 0 && index != 3){
                elementos[index].classList.add('is-invalid');
               error = true;
            }
        }
        if(!error){
            formulario.submit()
        }else{
            msgError.innerHTML = "*Los campos señalados son obligatorios*"
        }
   

    })

})

