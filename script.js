const items = {
    rice: { price: 20, image: "rice.jpg" },
    sugar: { price: 30, image: "sugar.jpg" },
    salt: { price: 20, image: "salt.jpg" },
    oil: { price: 110, image: "Oil.jpeg" },
    paneer: { price: 150, image: "paneer.JPG" },
    maggi: { price: 50, image: "maggi.jpg" },
    boost: { price: 90, image: "boost.jpg" },
    collgate: { price: 85, image: "colgate.jpg" }
};

let cart = [];
let totalPrice = 0;

function displayItems() {
    const itemsContainer = document.getElementById('items');
    for (let item in items) {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <img src="${items[item].image}" alt="${item}">
            <h3>${item}</h3>
            <p>Rs ${items[item].price}/kg</p>
            <div>
                <input type="number" id="${item}-quantity" min="1" value="1">
                <button onclick="addToCart('${item}')">Add</button>
            </div>
        `;
        itemsContainer.appendChild(itemCard);
    }
}

function addToCart(itemName) {
    const quantity = parseInt(document.getElementById(`${itemName}-quantity`).value);
    if (quantity > 0) {
        const price = quantity * items[itemName].price;
        cart.push({ itemName, quantity, price });
        totalPrice += price;
        updateCart();
    }
}

function updateCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cartItem.itemName}</td>
            <td>${cartItem.quantity}</td>
            <td>${cartItem.price}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });
    const gst = totalPrice * 0.05;
    document.getElementById('total-price').textContent = totalPrice;
    document.getElementById('gst').textContent = gst.toFixed(2);
    document.getElementById('final-price').textContent = (totalPrice + gst).toFixed(2);
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function generateBill() {
    alert("Thank you for shopping! Your bill has been generated.");
}

// Initialize items on page load
displayItems();