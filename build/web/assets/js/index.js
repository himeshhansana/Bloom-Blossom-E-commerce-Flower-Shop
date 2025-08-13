//function indexOnloadFunctions() {
//    checkSessionCart();
//    loadProductData();
//
//}
//
//
//async function checkSessionCart() {
//    const popup = new Notification();
//    const response = await fetch("CheckSessionCart");
//    if (!response.ok) {
//
//        popup.error({
//            message: "Something went wrong! Try again shortly"
//
//        });
//
//    }
//
//}
//
//async function loadProductData() {
//    const popup = new Notification();
//    const response = await fetch("LoadHomeData");
//
//    if (response.ok) {
//
//        const json = await response.json();
//
//        if (json.status) {
//            console.log(json);
//            loadFlowersCategory(json);
//            loadNewArrivals(json);
//
//        } else {
//            popup.error(
//                    {
//                        message: "Something went wrong ! Try again shortly"
//                    }
//
//            );
//        }
//
//    } else {
//        popup.error(
//                {
//                    message: "Something went wrong ! Try again shortly"
//                }
//
//        );
//    }
//
//
//}
//
//
//
//function loadFlowersCategory(json) {
//    const categoriesGrid = document.getElementById("categoriesGrid");
//    const templateCard = document.getElementById("product_flowerCategory_card");
//
//    if (!templateCard || !categoriesGrid)
//        return;
//
//    // Remove previously added dynamic categories
//    const existingDynamicCards = categoriesGrid.querySelectorAll(".category-card.dynamic");
//    existingDynamicCards.forEach(el => el.remove());
//
//    // Icon list to rotate through
//    const icons = ["💐", "🌼", "🌺", "🌻", "🌷", "🌸", "🌹", "🌺"];
//    let card_delay = 200;
//
//    json.flowers_categoryList.forEach((item, index) => {
//        let clone = templateCard.cloneNode(true);
//        clone.style.display = "block";
//        clone.classList.add("dynamic"); // mark as dynamic
//
//        const miniCard = clone.querySelector("#product-flower-category-mini-card");
//        const anchor = clone.querySelector("#product-flower-category-a");
//        const title = clone.querySelector("#product-flower-category-title");
//        const icon = clone.querySelector(".category-icon");
//
//        // Set animation attributes
//        miniCard.setAttribute("data-sal", "zoom-out");
//        miniCard.setAttribute("data-sal-delay", String(card_delay));
//
//        // Set dynamic content
//        anchor.href = `search.html?category=${encodeURIComponent(item.name)}`;
//        title.textContent = item.name;
//        if (icon) {
//            icon.textContent = icons[index % icons.length]; // rotate icon
//        }
//
//        categoriesGrid.appendChild(clone);
//        card_delay += 100;
//    });
//
//    sal(); // Re-initialize animations
//}
//
//
//
//function loadNewArrivals(json) {
//
//    const new_arrival_product_container = document.getElementById("new-arrival-product-container");
//    new_arrival_product_container.innerHTML = "";
//
//    json.productList.forEach(item => {
//
//        let product_card = `<div class="col-xl-4 col-sm-6">
//                            <div class="axil-product product-style-one mb--30">
//                                <div class="thumbnail">
//                                    <a href="single-product.html?id=${item.id}">
//                                        <img src="product-images\\${item.id}\\image1.png" alt="Romantic Red Rose Bouquet" onerror="this.style.display='none'">
//                                    </a>
//                                    <div class="product-hover-action">
//                                        <ul class="cart-action">
//                                            <li class="wishlist"><a href="#" title="Add to Wishlist" onclick="addToWishlist(${item.id}, 1)"><i class="far fa-heart"></i></a></li>
//                                            <li class="select-option"><a href="#" title="Add to Cart" onclick="event.preventDefault(); addToCart(${item.id}, 1);">Add to Cart</a></li>
//                                            <li class="quickview"><a href="single-product.html?id=${item.id}" title="Quick View"><i class="far fa-eye"></i></a></li>
//                                        </ul>
//                                    </div>
//                                </div>
//                                <div class="product-content">
//                                    <div class="inner">
//                                        <h5 class="title"><a href="#">${item.title}</a></h5>
//                                        <div class="product-price-variant">
//                                            <span class="price current-price">Rs. ${new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item.price)} <span></span></span>
//                                        </div>
//                                    </div>
//                                </div>
//                            </div>
//                        </div>`;
//
//        new_arrival_product_container.innerHTML += product_card;
//    });
//}
//
//async function addToCart(productId, qty) {
//
//    //console.log(productId + " " + qty);
//
//    const popup = new Notification();
//
//    const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);
//
//    if (response.ok) {
//
//        const json = await response.json();
//        if (json.status) {
//            popup.success({
//                message: json.message
//            });
//        } else {
//            popup.error({
//                message: "something went wrong"
//            });
//        }
//
//    } else {
//
//    }
//}
//
//
//
//
//async function addToWishlist(productId, event) {
//    if (event) {
//        event.preventDefault();
//        event.stopPropagation();
//    }
//
//    if (!productId) {
//        console.error("No product ID provided");
//        return;
//    }
//
//    try {
//        const response = await fetch(`AddToWishlist?prId=${encodeURIComponent(productId)}`, {
//            method: 'GET',
//            headers: {
//                'Content-Type': 'application/json'
//            }
//        });
//
//        if (!response.ok) {
//            throw new Error(`HTTP error! status: ${response.status}`);
//        }
//
//        const result = await response.json();
//
//        if (result.status) {
//            // Update the heart icon
//            const heartIcon = event?.target?.closest('.wishlist')?.querySelector('i');
//            if (heartIcon) {
//                heartIcon.classList.toggle('far');
//                heartIcon.classList.toggle('fas');
//                heartIcon.style.color = heartIcon.classList.contains('fas') ? '#ff0000' : '';
//            }
//
//            // Show success message
//            if (typeof Notification !== 'undefined') {
//                const popup = new Notification();
//                popup.success({message: result.message});
//            }
//        } else {
//            if (typeof Notification !== 'undefined') {
//                const popup = new Notification();
//                popup.error({message: result.message || "Failed to add to wishlist"});
//            }
//        }
//    } catch (error) {
//        console.error('Error adding to wishlist:', error);
//        if (typeof Notification !== 'undefined') {
//            const popup = new Notification();
//            popup.error({message: "An error occurred while processing your request"});
//        }
//    }
//}


// Main initialization function
function indexOnloadFunctions() {
    checkSessionCart();
    loadProductData();
}

// Check if user has items in cart
async function checkSessionCart() {
    try {
        const response = await fetch("CheckSessionCart");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        const popup = new Notification();
        popup.error({message: "Something went wrong! Try again shortly"});
        console.error('Error checking session cart:', error);
    }
}

// Load product data for homepage
async function loadProductData() {
    try {
        const response = await fetch("LoadHomeData");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        if (!json.status) {
            throw new Error('Invalid data received');
        }

        console.log(json);
        loadFlowersCategory(json);
        loadNewArrivals(json);

    } catch (error) {
        const popup = new Notification();
        popup.error({message: "Something went wrong! Try again shortly"});
        console.error('Error loading product data:', error);
    }
}

// Load flower categories
function loadFlowersCategory(json) {
    const categoriesGrid = document.getElementById("categoriesGrid");
    const templateCard = document.getElementById("product_flowerCategory_card");

    if (!templateCard || !categoriesGrid) {
        console.error('Required elements not found');
        return;
    }

    // Remove previously added dynamic categories
    const existingDynamicCards = categoriesGrid.querySelectorAll(".category-card.dynamic");
    existingDynamicCards.forEach(el => el.remove());

    // Icon list to rotate through
    const icons = ["💐", "🌼", "🌺", "🌻", "🌷", "🌸", "🌹", "🌺"];
    let card_delay = 200;

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    json.flowers_categoryList.forEach((item, index) => {
        const clone = templateCard.cloneNode(true);
        clone.style.display = "block";
        clone.classList.add("dynamic");

        const miniCard = clone.querySelector("#product-flower-category-mini-card");
        const anchor = clone.querySelector("#product-flower-category-a");
        const title = clone.querySelector("#product-flower-category-title");
        const icon = clone.querySelector(".category-icon");

        if (!miniCard || !anchor || !title) {
            console.error('Required elements not found in template');
            return;
        }

        // Set animation attributes
        miniCard.setAttribute("data-sal", "zoom-out");
        miniCard.setAttribute("data-sal-delay", String(card_delay));

        // Set dynamic content
        anchor.href = `search.html?category=${encodeURIComponent(item.name)}`;
        title.textContent = item.name;
        if (icon) {
            icon.textContent = icons[index % icons.length];
        }

        fragment.appendChild(clone);
        card_delay += 100;
    });

    categoriesGrid.appendChild(fragment);
    sal(); // Re-initialize animations
}

// Load new arrival products
function loadNewArrivals(json) {
    const container = document.getElementById("new-arrival-product-container");
    if (!container) {
        console.error('Container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = "";

    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();

    json.productList.forEach(item => {
        const priceFormatted = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2
        }).format(item.price);

        const colDiv = document.createElement("div");
        colDiv.className = "col-xl-4 col-sm-6";

        // Create product card using template literals with proper escaping
        colDiv.innerHTML = `
            <div class="axil-product product-style-one mb--30">
                <div class="thumbnail">
                    <a href="single-product.html?id=${encodeURIComponent(item.id)}">
                        <img src="product-images/${encodeURIComponent(item.id)}/image1.png" 
                             alt="${escapeHtml(item.title) || 'Product image'}" 
                             onerror="this.style.display='none'">
                    </a>
                    <div class="product-hover-action">
                        <ul class="cart-action">
                            <li class="wishlist">
                                <a href="#" title="Add to Wishlist" onclick="addToWishlist(${item.id}, event)">
                                    <i class="far fa-heart"></i>
                                </a>
                            </li>
                            <li class="select-option">
                                <a href="#" title="Add to Cart" onclick="event.preventDefault(); addToCart(${item.id}, 1);">
                                    Add to Cart
                                </a>
                            </li>
                            <li class="quickview">
                                <a href="single-product.html?id=${encodeURIComponent(item.id)}" title="Quick View">
                                    <i class="far fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="product-content">
                    <div class="inner">
                        <h5 class="title">
                            <a href="single-product.html?id=${encodeURIComponent(item.id)}">
                                ${escapeHtml(item.title)}
                            </a>
                        </h5>
                        <div class="product-price-variant">
                            <span class="price current-price">Rs. ${priceFormatted}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        fragment.appendChild(colDiv);
    });

    container.appendChild(fragment);
}

// Add item to cart
async function addToCart(productId, qty) {
    try {
        const popup = new Notification();
        const response = await fetch(`AddToCart?prId=${encodeURIComponent(productId)}&qty=${encodeURIComponent(qty)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        if (json.status) {
            popup.success({message: json.message});
        } else {
            throw new Error(json.message || "Failed to add to cart");
        }
    } catch (error) {
        const popup = new Notification();
        popup.error({message: "Something went wrong"});
        console.error('Error adding to cart:', error);
    }
}

// Add item to wishlist
async function addToWishlist(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (!productId) {
        console.error("No product ID provided");
        return;
    }

    try {
        const response = await fetch(`AddToWishlist?prId=${encodeURIComponent(productId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status) {
            // Update the heart icon
            const heartIcon = event?.target?.closest('.wishlist')?.querySelector('i');
            if (heartIcon) {
                heartIcon.classList.toggle('far');
                heartIcon.classList.toggle('fas');
                heartIcon.style.color = heartIcon.classList.contains('fas') ? '#ff0000' : '';
            }

            // Show success message
            if (typeof Notification !== 'undefined') {
                const popup = new Notification();
                popup.success({message: result.message});
            }
        } else {
            throw new Error(result.message || "Failed to add to wishlist");
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        if (typeof Notification !== 'undefined') {
            const popup = new Notification();
            popup.error({message: error.message || "An error occurred while processing your request"});
        }
    }
}

// Helper function to escape HTML (prevent XSS)
function escapeHtml(unsafe) {
    if (!unsafe)
        return '';
    return unsafe.toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}