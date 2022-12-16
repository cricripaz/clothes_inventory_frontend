

const formAddItem = document.getElementById('formAddItem');
const selectType = document.getElementById('inputType');
const selectBrand = document.getElementById('input-marca');
const selectSize = document.getElementById('inputSize');




fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        showData(data)
    })

const showData = (data) => {

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let body = ''
    for( let i = 0 ; i < data.length ; i++){

        body += `<tr>
                <td>${data[i]._id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].brand}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].type}</td>
                <td>${data[i].size}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].price_buy}</td>
                <td>${data[i].price_sell}</td>
                <td>${data[i].entry_date.toString().substring(0,10)}</td>
                </tr>`
    }

    console.log("s")

    document.getElementById('data').innerHTML = body
}



fetch('https://clothesinventory.up.railway.app/options/optionsType')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Un Tipo</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectType.innerHTML = options;
    });

fetch('https://clothesinventory.up.railway.app/options-brand/optionsbrand')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Una Marca</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectBrand.innerHTML = options;
    });

fetch('https://clothesinventory.up.railway.app/options-size/optionsSize')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let options = `<option value="">Elige Una Talla</option>`
        data.forEach(element => options += `<option value="${element.name}">${element.name}</option>`)

        selectSize.innerHTML = options;
    });








formAddItem.addEventListener('submit',function (e){
    e.preventDefault();

    const name_ = document.getElementById('input-nombre').value;
    const type_ = document.getElementById('inputType').value;
    const size_ = document.getElementById('inputSize').value;
    const quantity_ = document.getElementById('inputQuantity').value;
    const brand_ = document.getElementById('input-marca').value;
    const gender_ = document.getElementById('input-gender').value;
    const price_buy_ = document.getElementById('input-price-buy').value;
    const price_sell_ = document.getElementById('input-price-sell').value;

    const entryDate_ = Date.now();
    const exitDate_ = '2022-12-12';

    console.log(entryDate_);

    fetch('https://clothesinventory.up.railway.app/items/addItem' ,{
        method:'POST',
        body:JSON.stringify({
            name:name_,
            brand:brand_,
            gender:gender_,
            type:type_,
            size:size_,
            quantity:quantity_,
            price_buy:price_buy_,
            price_sell:price_sell_,
            entry_date:entryDate_,
            exit_date:exitDate_,
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
            window.alert('Item Agregado exitosamente');
            document.getElementById('formAddItem').reset();
        })



});






