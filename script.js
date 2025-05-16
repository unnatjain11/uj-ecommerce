
    // Products data
    const products = [
      {
        id: "p1",
        name: "Xiaomi QLED TV FX pro 43",
        description:
          "Xiaomi 108 cm (43 Inches) FX Pro Series 4K Ultra HD Smart Fire QLED TV L43MB-FPIN",
        price: 27999,
        image: "https://m.media-amazon.com/images/I/71RkWGWWrjL._SL1500_.jpg",
      },
      {
        id: "p2",
        name: "Xiaomi QLED TV FX pro 55",
        description:
          "Xiaomi 138 cm (55 Inches) FX Pro Series 4K Ultra HD Smart Fire QLED TV L55MB-FPIN.",
        price: 39999,
        image: "https://m.media-amazon.com/images/I/81CxO98dMBL._SL1500_.jpg",
      },
      {
        id: "p3",
        name: "Canon Camera",
        description:
          "Canon EOS R6 Mark II 24. 2 MP Mirrorless Camera with RF24-105mm f4 L is USM Lens Kit (Black)",
        price: 255999,
        image: "https://m.media-amazon.com/images/I/61JQs+UNEdL._SL1500_.jpg",
      },
      {
        id: "p4",
        name: "Sony Camera",
        description:
          "Sony Alpha ZV-E10L APS-C Camera (16-50mm Lens) | 24.2 MP vlog Camera | Made for Creators | Advanced Autofocus | Clear Audio & 4K Movie Recording - Black.",
        price: 65600,
        image: "https://m.media-amazon.com/images/I/71vct-nunyL._SL1500_.jpg",
      },
      {
        id: "p5",
        name: "Alexa Smart Home",
        description:
          "Amazon Echo (4th Gen) | Premium sound powered by Dolby and Alexa (Black)",
        price: 10500,
        image: "https://m.media-amazon.com/images/I/41f80Qu98zL.jpg",
      },
      {
        id: "p6",
        name: "Samsung Galaxy S24",
        description:
          "Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)",
        price: 85999,
        image: "https://m.media-amazon.com/images/I/711a+C6Yu7L._SL1500_.jpg",
      },

      {
        id: "p7",
        name: "Wireless Earbuds",
        description:
          "High-quality wireless headphones with noise cancellation.",
        price: 5600,
        image: "https://m.media-amazon.com/images/I/612FzKUOH1L._SL1500_.jpg",
      },
      {
        id: "p8",
        name: "Smart Watch",
        description:
          "Stay connected and track your fitness with this smart watch.",
        price: 12989,
        image:
          "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/3ea0033f-8eb3-4992-bd56-a9d953748b0c._CR0,0,1200,628_SX810_CB1169409_QL70_.jpg",
      },
      {
        id: "p9",
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with amazing sound quality.",
        price: 14999,
        image: "https://m.media-amazon.com/images/I/81fkcBjZndL._SL1500_.jpg",
      },
      {
        id: "p10",
        name: "Gaming Laptop",
        description:
          'ASUS TUF Gaming A15, AMD Ryzen 7 7435HS Gaming Laptop(NVIDIA RTX 3050-4GB/60W TGP/16GB RAM/512GB SSD/FHD/15.6"/144Hz/RGB KB/48WHr/Windows 11//Graphite)',
        price: 64899,
        image: "https://m.media-amazon.com/images/I/61nTNphSBvL._SL1500_.jpg",
      },
    ];

    // Cart state
    let cart = [];

    // Elements
    const productsList = document.getElementById("products-list");
    const cartButton = document.getElementById("cart-button");
    const cartCount = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    const paymentModal = document.getElementById("payment-modal");
    const closePaymentBtn = document.getElementById("close-payment");
    const paymentForm = document.getElementById("payment-form");
    const paymentMessage = document.getElementById("payment-message");

    // Helper functions
    function formatPrice(price) {
      return price.toFixed(2);
    }

    // Render products list
    function renderProducts() {
      productsList.innerHTML = "";
      products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.setAttribute("tabindex", "0");
        card.setAttribute(
          "aria-label",
          `${product.name}, Price $${formatPrice(product.price)}`
        );
        card.innerHTML = `
        <img src="${product.image}" alt="${product.name
          }" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-price"> Total Price ₹${formatPrice(
            product.price
          )}</div>
          <div class="button-group">
            <button class="btn btn-add" data-product-id="${product.id
          }" aria-label="Add ${product.name} to cart">Add to Cart</button>
            <button class="btn btn-buy" data-product-id="${product.id
          }" aria-label="Buy ${product.name} now">Buy Now</button>
          </div>
        </div>
      `;
        productsList.appendChild(card);
      });
    }

    // Add product to cart
    function addToCart(productId) {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartUI();
    }

    // Remove product from cart
    function removeFromCart(productId) {
      cart = cart.filter((item) => item.id !== productId);
      updateCartUI();
    }

    // Change cart item quantity
    function changeQuantity(productId, newQty) {
      const cartItem = cart.find((item) => item.id === productId);
      if (!cartItem) return;
      const quantity = parseInt(newQty);
      if (isNaN(quantity) || quantity < 1) return;
      cartItem.quantity = quantity;
      updateCartUI();
    }

    // Calculate total
    function calculateTotal() {
      return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // Update cart UI
    function updateCartUI() {
      cartCount.textContent = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutButton.disabled = true;
        cartTotalSpan.textContent = "0.00";
        return;
      }
      cart.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
        <span class="cart-item-name">${item.name}</span>
        <input type="number" min="1" max="99" class="cart-item-qty" aria-label="Quantity for ${item.name
          }" value="${item.quantity}" data-id="${item.id}" />
        <span class="cart-item-price"> ₹${formatPrice(
            item.price * item.quantity
          )}</span>
        <button class="cart-item-remove" aria-label="Remove ${item.name
          } from cart" data-id="${item.id}">&times;</button>
      `;
        cartItemsContainer.appendChild(itemDiv);
      });
      cartTotalSpan.textContent = formatPrice(calculateTotal());
      checkoutButton.disabled = false;
    }

    // Open modals
    function openModal(modal) {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      // Trap focus inside modal
      trapFocus(modal);
    }
    function closeModal(modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      // Return focus to cart button if cart modal closed
      if (modal === cartModal) {
        cartButton.focus();
      }
    }

    // Trap focus inside modal for accessibility
    let lastFocusedElement;
    function trapFocus(modal) {
      lastFocusedElement = document.activeElement;
      const focusableElementsString =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      const focusableElements = modal.querySelectorAll(
        focusableElementsString
      );
      if (focusableElements.length === 0) return;

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      firstFocusable.focus();

      function keyListener(e) {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        } else if (e.key === "Escape") {
          closeModal(modal);
          document.removeEventListener("keydown", keyListener);
        }
      }
      document.addEventListener("keydown", keyListener);
    }

    // Event handlers
    productsList.addEventListener("click", (e) => {
      if (e.target.matches("button.btn-add")) {
        const productId = e.target.getAttribute("data-product-id");
        addToCart(productId);
      } else if (e.target.matches("button.btn-buy")) {
        const productId = e.target.getAttribute("data-product-id");
        cart = [];
        addToCart(productId);
        openModal(paymentModal);
      }
    });

    cartButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      openModal(cartModal);
      updateCartUI();
    });

    closeCartBtn.addEventListener("click", () => {
      closeModal(cartModal);
    });

    closePaymentBtn.addEventListener("click", () => {
      closeModal(paymentModal);
      paymentForm.reset();
      paymentMessage.textContent = "";
    });

    cartItemsContainer.addEventListener("change", (e) => {
      if (e.target.classList.contains("cart-item-qty")) {
        const productId = e.target.getAttribute("data-id");
        changeQuantity(productId, e.target.value);
      }
    });

    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-item-remove")) {
        const productId = e.target.getAttribute("data-id");
        removeFromCart(productId);
      }
    });

    checkoutButton.addEventListener("click", () => {
      closeModal(cartModal);
      openModal(paymentModal);
      paymentForm.reset();
      paymentMessage.textContent = "";
    });

    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      paymentMessage.textContent = "";
      // Simulate payment validation and processing
      const formData = new FormData(paymentForm);
      const cardName = formData.get("cardName").trim();
      const cardNumber = formData.get("cardNumber").trim();
      const expiryDate = formData.get("expiryDate").trim();
      const cvv = formData.get("cvv").trim();

      if (
        cardName.length < 3 ||
        !/^\d{16}$/.test(cardNumber) ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate) ||
        !/^\d{3}$/.test(cvv)
      ) {
        paymentMessage.textContent = "Please enter valid payment details.";
        paymentMessage.style.color = "#e74c3c";
        return;
      }
      paymentMessage.style.color = "#067d30";
      paymentMessage.textContent = "Processing payment...";

      setTimeout(() => {
        paymentMessage.textContent =
          "Payment successful! Thank you for your purchase.";
        cart = [];
        updateCartUI();
        checkoutButton.disabled = true;
        paymentForm.reset();
        setTimeout(() => {
          closeModal(paymentModal);
        }, 2500);
      }, 2000);
    });

    // Clicking outside modal closes them
    window.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        closeModal(cartModal);
      } else if (e.target === paymentModal) {
        closeModal(paymentModal);
        paymentForm.reset();
        paymentMessage.textContent = "";
      }
    });

    // Escape key closes modals (already handled in trapFocus)

    // Initialization
    renderProducts();
    updateCartUI();