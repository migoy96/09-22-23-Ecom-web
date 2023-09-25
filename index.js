let shoeList = {
    shoes: [
        {img: "images2/air-jordan-1-low-og.webp",
         name: "Air Jordan 1 Low OG",
         price: 7895,
         id: 1 },

        {img: "images2/air-jordan-1-low-se-2.webp",
         name: "Air Jordan 1 Low SE",
         price: 5119,
         id: 2 },

        {img: "images2/air-jordan-1-low-se-craft.webp",
         name: "Air Jordan 1 Low SE Craft",
         price: 5119,
         id: 3 },

        {img: "images2/air-jordan-1-low-se.webp",
         name: "Air Jordan 1 Low SE",
         price: 7095,
         id: 4 },

         {img: "images2/air-jordan-1-mid-se-2.webp",
         name: "Air Jordan 1 Mid SE",
         price: 7595,
         id: 5 },

         {img: "images2/air-jordan-1-mid-se-3.webp",
         name: "Air Jordan 1 Mid SE",
         price: 7595,
         id: 6 },

         {img: "images2/air-jordan-1-mid-se-craft-2.webp",
         name: "Air Jordan 1 Mid SE Craft",
         price: 7595,
         id: 7 },

         {img: "images2/air-jordan-1-mid-se-craft.webp",
         name: "Air Jordan 1 Mid SE Craft",
         price: 7595,
         id: 8 }
    ],

    orderList: [],

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
    const userLanguage = window.navigator.language;
        return new Intl.NumberFormat(userLanguage,{
            style: "currency",
            currency: currency,
        }).format(value);
};

shoeList.showCard();




function showList(){
    let cartList = document.getElementById("cartList");
    let orderList = "";
    let totalCost = 0;
    let quantity = 0;
    let delBtn = "";
    let new_list = JSON.parse(localStorage.getItem("new"))
    if (new_list == null || new_list == ""){
        cartList.innerHTML = `<p class="text-center">No items yet! Please continue Shopping.</p>`
        quantity.innerHTML = 0;
    }else{
        new_list.forEach(
            function(shoeinList){
                orderList += `
                    <div class="col-1 text-start"><button style="width: 20px; height: 20px; border-style:none; border-radius:50%;" class="bg-danger" onclick="del();">X</button></div>
                    <div class="col-7 text-start">${shoeinList.name}</div>
                    <div class="col-4 text-end">${formatCurrency(shoeinList.price, "php")}</div>`;
                    totalCost += Number(shoeinList.price);
                    quantity += 1 ;
            });
            output = formatCurrency(totalCost, "PHP");
            cartList.innerHTML = orderList;
            document.getElementById("totalPrice").innerText = `Total Price: ${output}`;
            document.getElementById("quantity").innerText = quantity;
            document.getElementById("quantity2").innerText = quantity;
    }        
}



function addToCart(id){
    let array = JSON.parse(localStorage.getItem("new"))
    if (array == null){
        shoeList.orderList = [];
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        shoeList.orderList.push({name:new_order, price:new_price});
        localStorage.setItem("new", JSON.stringify(shoeList.orderList));
        showList();

    }else{
        shoeList.orderList = JSON.parse(localStorage.getItem("new"));
        let new_order = document.getElementById("name"+id).innerHTML;
        let new_price = document.getElementById("price"+id).innerHTML;
        shoeList.orderList.push({name:new_order, price:new_price});
        localStorage.setItem("new", JSON.stringify(shoeList.orderList));
        showList();
 

    }
}

function del(){
    let new_list = JSON.parse(localStorage.getItem("new"));
    new_list.pop();
    localStorage.setItem("new", JSON.stringify(new_list));
    showList();


}

showList();
