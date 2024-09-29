const swiper = new Swiper('.swiper', {

    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//an empty cart array
let cart = [];

//add items to the cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    //store the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Added To Cart');

    //display content of the cart
    updateCartUI();
}

function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    const header = document.createElement('h2');
    header.textContent = "ITEMS IN CART";
    cartItemsDiv.appendChild(header);

    //list of items chosen
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<span class = itemDetails>${item.name} - ${item.price * item.quantity} <br></span>`;
        cartItemsDiv.appendChild(itemDiv);
    })

    const button = document.createElement('button');
    button.innerHTML = "BUY";
    cartItemsDiv.appendChild(button);
}

//event listener for add cart in buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price)

        addToCart(id, name, price);
        console.log('items picked');
    });
});

//event listener for the view cart button
document.getElementById('view-cart').addEventListener('click', function () {
    updateCartUI();
});