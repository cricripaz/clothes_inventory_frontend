const divTotalProducts = document.getElementById('div-total-products');
const divSaleTotalProducts = document.getElementById('total-sale-products');
const divGanacia = document.getElementById('ganancia-total');
const divGananciaSus = document.getElementById('ganancia-total-sus')


fetch('https://clothesinventory.up.railway.app/items/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let total_products = 0;

        data.forEach(element => total_products += element.quantity);

        divTotalProducts.innerHTML = total_products;
    });


fetch('https://clothesinventory.up.railway.app/products/get-all')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let total_amount = 0;
        let total_price_buy = 0;
        let total_products_sale = 0;

        data.forEach(element => total_amount += element.sale_amount);
        data.forEach(e => total_price_buy += (e.sale_quantity * e.price_buy));
        data.forEach(e =>total_products_sale += e.sale_quantity);

        divSaleTotalProducts.innerHTML = total_products_sale;

        divGanacia.innerHTML = (total_amount-total_price_buy) +" Bs";

        divGananciaSus.innerHTML = ((total_amount-total_price_buy)/7).toFixed(2) + " $";


    });