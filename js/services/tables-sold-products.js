fetch('https://clothesinventory.up.railway.app/products/get-all')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        showDataSoldProducts(data)
    })

const showDataSoldProducts = (data) => {

    let body = ''
    for( let i = 0 ; i < data.length ; i++){
        body += `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].brand}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].type}</td>
                <td>${data[i].size}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].price_buy}</td>
                <td>${data[i].price_sell}</td>
                <td>${data[i].sale_amount} Bs</td>
                 <td>${data[i].sale_quantity}</td>
                <td>${data[i].exit_date}</td>
                </tr>`
    }

    document.getElementById('data-sold-products').innerHTML = body
}
ss