const selectNameDeleteItem = document.getElementById('input-name-item-delete');
const selectTypeDeleteItem = document.getElementById('input-type-item-delete');
const selectSizeDeleteItem = document.getElementById('input-size-item-delete');
const formDeleteItem = document.getElementById('form-delete-item');


fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Un Producto</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectNameDeleteItem.innerHTML = options;
    });


selectNameDeleteItem.addEventListener('change', event => {

    const name_selected = selectNameDeleteItem.value;

    console.log(selectNameDeleteItem);


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
            let optionsType = '';

            data.forEach(element => optionsType += `<option value="${element.type}">${element.type}</option>`);
            selectTypeDeleteItem.innerHTML = optionsType;

            selectTypeDeleteItem.addEventListener('change',ev => {


                fetch('https://clothesinventory.up.railway.app/items/get-item-by-name-type',{
                    method:'POST',
                    body:JSON.stringify({
                        name : name_selected,
                        type : selectTypeDeleteItem.value
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
                        let optionSize = '';

                        data.forEach(element => optionSize += `<option value="${element.size}">${element.size}</option>`);
                        selectSizeDeleteItem.innerHTML = optionSize;



                    })


            })





        })



});



function deleteItem(){

    fetch('https://clothesinventory.up.railway.app/items/deleteItem', {
        method: 'DELETE',
        body: JSON.stringify({
            name: selectNameDeleteItem.value,
            type: selectTypeDeleteItem.value,
            size: selectSizeDeleteItem.value
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                console.log('res',response);

                        window.alert(`Exito : ${response.message}`);
                        formDeleteItem.reset();

            }



        );

}