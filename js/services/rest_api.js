


const itemsCards = document.getElementById('itemsCard')




fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        showData(data)
    });


const showData = (data) => {

    console.log(data)

    let body = ''
    for( let i = 0 ; i < data.length ; i++){
        body += `<tr><td>${data[i]._id}</td><td>${data[i].name}</td><td>${data[i].type}</td><td>${data[i].size}</td><td>${data[i].quantity}</td><td>${data[i].entryDate}</td><td>${data[i].exitDate}</td></tr>`
    }

    document.getElementById('data').innerHTML = body
}