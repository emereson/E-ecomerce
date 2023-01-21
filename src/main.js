
let productsClothes = [
    {
        id: "0",
        name: "Hoodies",
        price: 14,
        stock: 10,
        urlImage: "./src/img/featured1.png",
    },
    {
        id: "1",
        name: "Shirts",
        price: 24,
        stock: 15,
        urlImage: "./src/img/featured2.png",
    },
    {
        id: "2",
        name: "Sweatshirts",
        price: 24,
        stock: 20,
        urlImage: "./src/img/featured3.png",
    },
];


const iconCart = document.querySelector(".cart");
const close =document.querySelector(".bx-x")
const contentCart = document.querySelector(".contentCar");
const products = document.querySelector(".products");
const cartProducts = document.querySelector(".carProducts");
const carTotal = document.querySelector(".carTotal");
const amountCart = document.querySelector(".count");

iconCart.addEventListener("click", function () {
    contentCart.classList.toggle("contentCar__show");
});
close.addEventListener("click", function () {
    contentCart.classList.toggle("contentCar__show");
});


productsClothes = JSON.parse(localStorage.getItem("productsClothes")) || productsClothes;
let objCart = JSON.parse(localStorage.getItem("objCart")) || {};

function verifyAddToCart(findProduct, id) {
    if (findProduct.stock === objCart[id].amount) {
        alert("We do not have enough in stock");
    } else {
        objCart[id].amount++;
    }
}

function seacrProduct(id) {
    return productsClothes.find(function (clothes) {
        return clothes.id === id;
    });
}

function deleteProduct(id) {
    const res = confirm("Are you sure you want to delete this product?");
    if (res) delete objCart[id];
}

function printAmountCart() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    if (!arrayCart.length) {
        amountCart.style.display = "none";
        return;
    }

    amountCart.style.display = "flex";

    arrayCart.forEach(function ({ amount }) {
        sum += amount;
    });

    amountCart.textContent = sum;
}

function printTotalCart() {
    const arrayCart = Object.values(objCart);
    let sumItems = 0;
    let sum = 0;
    if (!arrayCart.length) {
        carTotal.innerHTML = `
        <figure class="mycart__empty">
            <img src="./src/img/empty-cart.png"alt="empty-cart">
            <div class="emptyCart__info">
                <h2>Your cart is empty</h2>
                <p>You can add items to your cart by clicking on the "+" button on the product page.</p>
                </div>
                    <div>
                    <p>${sumItems} Items</p>
                    <div>
                <h3>Total $${sum}.00</h3>
                <button class="btn btn__buy" disabled='disabled'><i class='bx bx-check-shield'></i> Checkout</button>
                </div>
            </div>
        </figure>
        
        `;

        return;
    }
    
    
    
    arrayCart.forEach(function ({ amount, price }) {
        sum += amount * price;
        sumItems += amount;
    });

    carTotal.innerHTML = `
    <div>
        <div><p>${sumItems} Items</p></div>
        <div>
            <h3>Total $${sum}.00</h3>
            <button class="btn btn__buy"><i class='bx bx-check-shield'></i> Checkout</button>
        </div>
    </div>
        `;
}

function printProductsInCart() {
    let html = "";

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function ({ id, name, price, urlImage, amount,stock }) {
        let subtotal = 0
        subtotal = amount * price
        html += `
            <div class="product">
                <div class="product__img">
                    <img src="${urlImage}" alt="${name}" />
                </div>
                <div class="options">

                <div class="product__info">
                    <p>${name}</p>
                    <p><span>Stock: ${stock}</span>  |  $${price}.00</p>
                    <div> Subtotal:$ ${subtotal}.00</div>
                    </div>
                
                <div class="product__options" id="${id}">
                    <span class='bx bx-minus simbolos'></span>  <span class='monto';> ${amount} unit</span>                
                    <span class='bx bx-plus simbolos'></span>
                    <span class='bx bx-trash'></span>
                </div>
                </div>

                
            </div>
        `;
    });
    
    cartProducts.innerHTML = html;
}

function printProducts() {
    let html = "";

    productsClothes.forEach(function ({ id, name, price, stock, urlImage }) {
        html += `
            <div class="element ${name}">
                <div class="product__img">
                <div>
                <img src="${urlImage}" alt="${name}" />
                </div>
                </div>

                <div class="product__info">
                    <h2>$ ${price}.00 | <span>Stock: ${stock}</span></h2>
                    <h3>${name}</h3>
                </div>

                <div class="product__options" id="${id}">
                    <button class="btn btn__add">+</button>
                </div>
            </div>
        `;
    });

    products.innerHTML = html;
}


products.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__add")) {
        // obtenemos el id
        const id = e.target.parentElement.id;

        // vamos a obtener el producto por id
        let findProduct = seacrProduct(id);

        if (findProduct.stock === 0) return alert("We do not have enough in stock");
        // logica para el carrito
        if (objCart[id]) {
            verifyAddToCart(findProduct, id);

        } else {
            objCart[id] = {
                ...findProduct,
                amount: 1,
            };
        }
        localStorage.setItem("objCart", JSON.stringify(objCart));
    }

    printProductsInCart();
    printTotalCart();
    printAmountCart();
});

cartProducts.addEventListener("click", function (e) {
    
    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;

        if (objCart[id].amount === 1) {
            deleteProduct(id);
        } else {
            objCart[id].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;
        let findProduct = seacrProduct(id);
        verifyAddToCart(findProduct, id);
    }
    if (e.target.classList.contains("bx-trash")) {
        const id = e.target.parentElement.id;
        deleteProduct(id);
    }
    localStorage.setItem("objCart", JSON.stringify(objCart));

    printProductsInCart();
    printTotalCart();
    printAmountCart();
}

);

carTotal.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__buy")) {
        const res = confirm("Are you sure you want to make the purchase?");

        if (!res) return;

        let newArray = [];

        productsClothes.forEach(function (clothes) {
            if (clothes.id === objCart[clothes.id]?.id) {
                newArray.push({
                    ...clothes,
                    stock: clothes.stock - objCart[clothes.id].amount,
                });
            } else {
                newArray.push(clothes);
            }
        });

        productsClothes = newArray;
        objCart = {};

        localStorage.setItem("objCart", JSON.stringify(objCart));
        localStorage.setItem("productsClothes", JSON.stringify(productsClothes));

        printProducts();
        printProductsInCart();
        printTotalCart();
        printAmountCart();
    }
});


printProducts();
printTotalCart();
printAmountCart();
printProductsInCart();