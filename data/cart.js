export let cart = JSON.parse(localStorage.getItem("cart"));

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(products, i) {
  //This is to trigger the message "added"
  const addedToCart = document.querySelector(
    `.js-added-to-cart-${products[i].id}`,
  );

  if (addedToCart) {
    addedToCart.classList.add("show");
    setTimeout(() => {
      addedToCart.classList.remove("show");
    }, 2000);
  }

  // getting cart index
  let cartItemIndex = -1;

  cart.forEach((cartItem, index) => {
    if (cartItem.productId === products[i].id) cartItemIndex = index;
  });

  if (cartItemIndex > -1) {
    let quantity = cart[cartItemIndex].quantity;

    // check if select value has a value to know how many items to be added
    let selectValue = document.querySelector(
      `.js-select-quantity-value-${products[i].id}`,
    );

    if (selectValue) quantity += parseInt(selectValue.value);
    else quantity++;

    cart[cartItemIndex] = {
      ...cart[cartItemIndex],
      quantity,
    };
  } else {
    let quantity = 1;

    // check if select value has a value to know how many items to be added
    let selectValue = document.querySelector(
      `.js-select-quantity-value-${products[i].id}`,
    );

    if (selectValue) quantity = parseInt(selectValue.value);

    cart.push({
      productId: products[i].id,
      quantity,
    });
  }

  saveToStorage();
}

function updateCartQuantity() {
  //This is to check/update the number of cart added
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".cart-length").innerHTML = cartQuantity;
}

function removeToCart(productID) {
  cart = cart.filter((e) => e.productId != productID);

  saveToStorage();
  console.log(cart);
}

export { addToCart, updateCartQuantity, removeToCart };
