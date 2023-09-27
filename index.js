let shoeList = {
    shoes: [
        {img: "images2/air-jordan-1-low-og.webp",
         name: "Air Jordan 1 Low OG",
         price: 7895.00,
         id: 1 },

        {img: "images2/air-jordan-1-low-se-2.webp",
         name: "Air Jordan 1 Low SE",
         price: 5119.00,
         id: 2 },

        {img: "images2/air-jordan-1-low-se-craft.webp",
         name: "Air Jordan 1 Low SE Craft",
         price: 5119.00,
         id: 3 },

        {img: "images2/air-jordan-1-low-se.webp",
         name: "Air Jordan 1 Low SE",
         price: 7095.00,
         id: 4 },

         {img: "images2/air-jordan-1-mid-se-2.webp",
         name: "Air Jordan 1 Mid SE",
         price: 7595.00,
         id: 5 },

         {img: "images2/air-jordan-1-mid-se-3.webp",
         name: "Air Jordan 1 Mid SE",
         price: 7595.00,
         id: 6 },

         {img: "images2/air-jordan-1-mid-se-craft-2.webp",
         name: "Air Jordan 1 Mid SE Craft",
         price: 7595.00,
         id: 7 },

         {img: "images2/air-jordan-1-mid-se-craft.webp",
         name: "Air Jordan 1 Mid SE Craft",
         price: 7595.00,
         id: 8 }
    ],

    orderList: [],

    quantityList: [],

    delBtn:[],

    showCard(){
        let itemList = document.getElementById("itemList");
        let shoes = "";
        this.shoes.forEach(
            function(shoeinList){
                shoes += `<div class="card d-inline-flex m-3 border-2" style="width: 17rem;box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54);
                -webkit-box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54);
                -moz-box-shadow: 0px 5px 11px 1px rgba(120,104,104,0.54);">
                <img src="${shoeinList.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fs-6" id="name${shoeinList.id}">${shoeinList.name}</h5>
                  <p id="ids${shoeinList.id}" hidden>${shoeinList.id}</p>
                  <p class="card-text" id="price${shoeinList.id}"> ${shoeinList.price}</p>
                  <a class="btn btn-secondary" onclick="addToCart(${shoeinList.id});">Add to Cart</a>
                </div>
              </div>`;
            });
            itemList.innerHTML = shoes;
    }
}

function formatCurrency(value, currency){
    let userLanguage = window.navigator.language;
        return new Intl.NumberFormat(userLanguage,{
            style: "currency",
            currency: currency,
        }).format(value);
};

shoeList.showCard();




function showList(){
    let cartList = document.getElementById("cartList");
    let orderList = "";
    let totalCost = document.getElementById("totalPrice");
    let totalPrice = 0;
    let price = document.getElementById("price");
    let delBtn = "";
    let new_list = JSON.parse(localStorage.getItem("new"));
    if (new_list == null || new_list == ""){
        cartList.innerHTML = `<p class="text-center">No items yet! Please continue Shopping.</p>`
        totalCost.innerHTML = "";
    }else{
        new_list.forEach(
            function(shoeinList){
                orderList += `
                    <div class="col-7 text-start">${shoeinList.name}</div>
                    <div class="col-4 text-end">${formatCurrency(shoeinList.price, "php")}</div>
                    <div class="col-1 text-end"><button style="width: 20px; height: 20px; border-style:none; border-radius:50%;" class="bg-danger" onclick="del();">X</button></div>
                    `;
                    totalPrice += Number(shoeinList.price);
            });
            output = formatCurrency(totalPrice, "php")
            cartList.innerHTML = orderList;
            totalCost.innerHTML = `Total Price: ${output}`;
    }        
}



function showQuantity(){
    let quantityList = document.getElementById("quantity");
    let quantityList2 = document.getElementById("quantity2");
    let bilang = 0;
    let quantity = JSON.parse(localStorage.getItem("new"));
    if (quantity == null || quantity == ""){
        quantityList.innerText = "";
        quantityList2.innerText = "";
    }else{
        quantity.forEach(
            (shoeinList) => {
                bilang += 1;
            }
        );
        quantityList.innerHTML = bilang;
        quantityList2.innerHTML = bilang;
        
    }
}

showQuantity();

function alertItem(){
    let dialog = `No Items placed. Please continue Shopping.`
    let item = JSON.parse(localStorage.getItem("new"));
    if (item == null || item == ""){
        alert(dialog);
    }else{
        location.href = "checkout.html"
    }
}


function showTotal(){
    let price = document.getElementById("price");
    let shipfee = document.getElementById("shipfee");
    let vat = document.getElementById("vat");
    let sumofall = document.getElementById("sumofall");
    let total = JSON.parse(localStorage.getItem("new"))
    
    
}

function addToCart(id){
    let array = JSON.parse(localStorage.getItem("new"))
    if (array == null){
        shoeList.orderList = [];
        shoeList.quantityList = [];
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        shoeList.orderList.push({name:new_order, price:new_price});
        shoeList.quantityList.push();
        localStorage.setItem("new", JSON.stringify(shoeList.orderList));
        showList();
        showQuantity();

    }else{
        shoeList.orderList = JSON.parse(localStorage.getItem("new"));
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        shoeList.orderList.push({name:new_order, price:new_price});
        localStorage.setItem("new", JSON.stringify(shoeList.orderList));
        showList();
        showQuantity();
 

    }
}

function del(){
    let new_list = JSON.parse(localStorage.getItem("new"));
    new_list.pop();
    localStorage.setItem("new", JSON.stringify(new_list));
    showList();
    showQuantity();
}

function endSession(){
    localStorage.removeItem("new");
    showOrder();
}

showList();

