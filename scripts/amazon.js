import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productHtml = "";
products.forEach((product) => {
  productHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select class="js-select-quantity-value-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button data-product-name="${product.name}">Add to Cart</button>
        </div>`;
});

// this is for add to card and auto increment for existing cart added
document.querySelector(".js-product-grid").innerHTML = productHtml;
document.querySelectorAll(".js-add-to-cart-button").forEach((button, i) => {
  button.addEventListener("click", () => {
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
    let itemIndex = -1;

    cart.forEach((item, index) => {
      if (item.productName === products[i].name) itemIndex = index;
    });

    if (itemIndex > -1) {
      let quantity = cart[itemIndex].quantity;

      // check if select value has a value to know how many items to be added
      let selectValue = document.querySelector(
        `.js-select-quantity-value-${products[i].id}`,
      );

      if (selectValue) quantity += parseInt(selectValue.value);
      else quantity++;

      cart[itemIndex] = {
        ...cart[itemIndex],
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
        id: products[i].id,
        productName: products[i].name,
        quantity,
      });
    }

    //This is to check/update the number of cart added
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".cart-length").innerHTML = cartQuantity;
  });
});
