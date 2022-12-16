const selectNameItem = document.getElementById('input-name-item');
const selectedSizeProduct = document.getElementById('input-size-item');
const selectedQuantityProduct = document.getElementById('input-quantity-product');
const formAddTypeOptions = document.getElementById('form-add-option-type');
const formAddBrandOptions = document.getElementById('form-add-option-brand');
const formAddSizeOptions = document.getElementById('form-add-option-size');
const selectNameBySizeProduct = document.getElementById('input-size-item');
const formAddQuantityProduct = document.getElementById('form-add-quantity-product');


        selectNameItem.addEventListener('change', event => {

            const name_selected = selectNameItem.value;

            console.log(name_selected);

            fetch('https://clothesinventory.up.railway.app/items/getItemByName',{
                method:'POST',
                body:JSON.stringify({
                    name : name_selected
                }),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
                .then(function (response){
                    return response.json()
                })
                .then(function (data){
                    //TODO validar success : true
                    console.log('items sizes : ',data);
                    let options = ''
                    data.forEach(element => options += `<option value="${element.size}">${element.size}</option>`)
                    selectNameBySizeProduct.innerHTML = options;
                    

                })



        });


function addQuantityProduct(){

    fetch('https://clothesinventory.up.railway.app/items/getQuantity',{
        method:'POST',
        body:JSON.stringify({
            name : selectNameItem.value,
            size : selectedSizeProduct.value
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (response){
            return response.json()
        })
        .then(function (data){

            console.log(' quantity : ',data.quantity);

            fetch('https://clothesinventory.up.railway.app/items/addQuantityProduct', {
                method: 'PUT',
                body:JSON.stringify({
                    name : selectNameItem.value,
                    size : selectedSizeProduct.value,
                    quantity : (parseInt(data.quantity) + parseInt(selectedQuantityProduct.value))
                }),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log('res',response)
                    formAddQuantityProduct.reset();
                    window.alert('Producto Agregado');
                    }

                );


        })





}


fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Un Producto</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectNameItem.innerHTML = options;
    });




formAddTypeOptions.addEventListener('submit' , event => {

    event.preventDefault();

    const name_option = document.getElementById('input-option-type-product').value;


    fetch('https://clothesinventory.up.railway.app/options/addOptionType',{
        method:'POST',
        body:JSON.stringify({
            name : name_option
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            console.log(data);
            window.alert('Opcion Agregada exitosamente')
            document.getElementById('form-add-option-type').reset();
        })

})

formAddBrandOptions.addEventListener('submit' , event => {

    event.preventDefault();

    const name_option = document.getElementById('input-brand-option').value;


    fetch('https://clothesinventory.up.railway.app/options-brand/addOptionBrand',{
        method:'POST',
        body:JSON.stringify({
            name : name_option
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            console.log(data);
            window.alert('Marca Agregada exitosamente')
            document.getElementById('form-add-option-brand').reset();
        })

})

formAddSizeOptions.addEventListener('submit' , event => {

    event.preventDefault();

    const name_option = document.getElementById('input-size-option').value;


    fetch('https://clothesinventory.up.railway.app/options-size/addOptionSize',{
        method:'POST',
        body:JSON.stringify({
            name : name_option
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            //TODO validar success : true
            console.log(data);
            window.alert('Talla Agregada exitosamente')
            document.getElementById('form-add-option-size').reset();
        })

})







