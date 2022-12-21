const formSellProduct = document.getElementById('form-sell-product');
const selectNameProductSell = document.getElementById('input-name-product-sell');
const selectTypeProductSell = document.getElementById('input-type-product-sell');
const selectSizeProductSell = document.getElementById('input-size-product-sell');
const inputQuantityForSell = document.getElementById('input-quantity-product-sell')


fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Un Producto</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectNameProductSell.innerHTML = options;
    });



selectNameProductSell.addEventListener('change', event => {

    const name_selected = selectNameProductSell.value;

    console.log(selectNameProductSell);


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
            selectTypeProductSell.innerHTML = optionsType;

            selectTypeProductSell.addEventListener('change',ev => {


                fetch('https://clothesinventory.up.railway.app/items/get-item-by-name-type',{
                    method:'POST',
                    body:JSON.stringify({
                        name : name_selected,
                        type : selectTypeProductSell.value
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
                        selectSizeProductSell.innerHTML = optionSize;



                    })


            })





        })



});


function sellProduct(){


        //GET PRODUCT
        fetch('https://clothesinventory.up.railway.app/items/get-item-by-name-type-size',{
            method:'POST',
            body:JSON.stringify({
                name : selectNameProductSell.value,
                type : selectTypeProductSell.value,
                size :selectSizeProductSell.value,

            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        })
            .then(function (response){
                return response.json()
            })
            .then(function (data){
                console.log(data.type)

                const nameOfSale = data.name;
                const saleAmount =(inputQuantityForSell.value * data.price_sell);
                const inputQuantitySale = inputQuantityForSell.value;
                let quantityRequestItem = 0;
                const tempItem = data;

                console.log('data temp :: ' ,tempItem)


                //GET QUANTITY
                fetch('https://clothesinventory.up.railway.app/items/get-quantity-for-sale',{
                    method:'POST',
                    body:JSON.stringify({
                        name : selectNameProductSell.value,
                        type : selectTypeProductSell.value,
                        size : selectSizeProductSell.value,
                    }),
                    headers:{
                        "Content-Type":"application/json; charset=UTF-8"
                    }
                })
                    .then(function (response){
                        return response.json()
                    })
                    .then(function (data) {
                        console.log('Object for quantity' ,data)

                        quantityRequestItem = data.quantity;

                        let resulOfSell = (quantityRequestItem - inputQuantitySale)



                        if(inputQuantitySale > quantityRequestItem){
                            formSellProduct.reset();
                            window.alert(`ERROR Cantidad Requerida : ${inputQuantitySale} , Cantidad Disponible ${quantityRequestItem} `);
                        }else{
                            //TODO UPDATE QUANTITY PRODUCTS AFTER SELL

                            fetch('https://clothesinventory.up.railway.app/items/sell-product', {
                                method: 'PUT',
                                body: JSON.stringify({
                                    name: selectNameProductSell.value,
                                    type: selectTypeProductSell.value,
                                    size: selectSizeProductSell.value,
                                    quantity_sell: resulOfSell
                                }),
                                headers: {
                                    "Content-Type": "application/json; charset=UTF-8"
                                }
                            })
                                .then(response => response.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                        console.log('res',response)
                                    }

                                );

                            //TODO POST PRODUCT SOLD
                            fetch('https://clothesinventory.up.railway.app/products/products-sold',{
                                method:'POST',
                                body:JSON.stringify({
                                    name: tempItem.name,
                                    brand: tempItem.brand,
                                    gender:tempItem.gender,
                                    type:tempItem.type,
                                    size:tempItem.size,
                                    quantity:tempItem.quantity,
                                    price_buy:tempItem.price_buy,
                                    price_sell:tempItem.price_buy,
                                    sale_amount:saleAmount,
                                    sale_quantity: inputQuantitySale ,
                                    entry_date:tempItem.entry_date,
                                    exit_date:Date.now(),
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
                                    formSellProduct.reset();
                                    window.alert(`${nameOfSale} Vendida , Cantidad Vendida : ${saleAmount} Bs`);

                                })
                        }


                    })







            })


}