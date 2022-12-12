


const itemsCards = document.getElementById('itemsCard');
const formAddItem = document.getElementById('formAddItem')




fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        showData(data)
    });

const showData = (data) => {

    console.log(data)

    let body = ''
    for( let i = 0 ; i < data.length ; i++){
        body += `<tr>
                <td>${data[i]._id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].type}</td>
                <td>${data[i].size}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].entryDate}</td>
                <td>${data[i].exitDate}</td>
                </tr>`
    }

    document.getElementById('data').innerHTML = body
}




formAddItem.addEventListener('submit',function (e){
    e.preventDefault();

    const name_ = document.getElementById('input-nombre').value;
    const type_ = document.getElementById('inputType').value;
    const size_ = document.getElementById('inputSize').value;
    const quantity_ = document.getElementById('inputQuantity').value;
    const entryDate_ = Date.now();
    const exitDate_ = '2023-12-02';

    console.log(entryDate_);

    fetch('https://clothesinventory.up.railway.app/items/addItem' ,{
        method:'POST',
        body:JSON.stringify({
            name:name_,
            type:type_,
            size:size_,
            quantity:quantity_,
            entryDate:entryDate_,
            exitDate:exitDate_
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            console.log(data)
        })



});







