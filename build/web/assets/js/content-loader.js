function initHeaderDropdowns() {
    const userIcon = document.querySelector(".my-account > a");
    const dropdown = document.querySelector(".my-account-dropdown");

    if (userIcon && dropdown) {
        userIcon.addEventListener("click", function (e) {
            e.preventDefault();
            dropdown.classList.toggle("open");
            userIcon.classList.toggle("close");
        });
        document.addEventListener("click", function (e) {
            if (!userIcon.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
                userIcon.classList.remove("close");
            }
        });
    }
}

function loadHeader() {
    const data = `<div class="nav-container">
                <a href="index.html" class="logo">
                    <i class="fas fa-seedling"></i>
                    Bloom & Blossom
                </a>

                <div class="nav-menu">
                    <a href="#categories">Categories</a>
                    <a href="#products">Products</a>
                    <a href="#features">About</a>
                    <a href="contact.html">Contact</a>
                </div>

                <div class="nav-actions">
                    <div class="search-container">
                        <input type="text" class="search-box" placeholder="Search beautiful flowers...">
                        <i class="fas fa-search search-icon"></i>
                    </div>

                    <a href="cart.html" class="cart-btn" title="Shopping Cart">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cartCount">0</span>
                    </a>

                    <div class="user-dropdown">
                        <button class="user-btn" onclick="toggleUserDropdown()" id="userBtn">
                            <i class="fas fa-user"></i>
                        </button>

                        <div class="dropdown-menu" id="userDropdown">
                            <div class="dropdown-header">
                                <h4>Welcome Back!</h4>
                                <p>Manage your account</p>
                            </div>
                                <a href="index.html" class="dropdown-item">
                                    <i class="fas fa-home"></i>
                                    Home
                                </a>
                                <a href="my-account.html" class="dropdown-item">
                                    <i class="fas fa-user-circle"></i>
                                    My Account
                                </a>
                                <a href="wishlist.html" class="dropdown-item">
                                    <i class="fas fa-heart"></i>
                                    Wishlist
                                </a>
                                <a href="my-account.html" class="dropdown-item">
                                    <i class="fas fa-box"></i>
                                    My Orders
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="sign-in.html" class="dropdown-item">
                                    <i class="fas fa-sign-in-alt"></i>
                                    Sign In
                                </a>
                                <a href="" class="dropdown-item danger">
                                    <i class="fas fa-sign-out-alt" ></i>
                                    <button style="color: red" onclick="signOut();">Sign Out</button> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    document.querySelector("nav").innerHTML = data;
}
function loadFooter() {
    const data = `<div class="footer-content">
                <div class="footer-main">
                    <div class="footer-brand">
                        <a href="index.html" class="footer-logo">
                            <i class="fas fa-seedling"></i>
                            Bloom & Blossom
                        </a>
                        <p class="footer-desc">
                            Creating magical moments with fresh, beautiful flowers. Your trusted partner for all occasions,
                            delivering joy and natural beauty right to your doorstep.
                        </p>
                        <div class="social-links">
                            <a href="#" class="social-link">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-pinterest"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <div class="footer-links">
                            <a href="#categories">Categories</a>
                            <a href="#products">Products</a>
                            <a href="#features">About Us</a>
                            <a href="contact.html">Contact</a>
                            <a href="#">Blog</a>
                            <a href="#">Gift Cards</a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h3>Services</h3>
                        <div class="footer-links">
                            <a href="#">Same-Day Delivery</a>
                            <a href="#">Wedding Flowers</a>
                            <a href="#">Corporate Events</a>
                            <a href="#">Subscription Boxes</a>
                            <a href="#">Custom Arrangements</a>
                            <a href="#">Plant Care Tips</a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h3>Support</h3>
                        <div class="footer-links">
                            <a href="#">Help Center</a>
                            <a href="#">Track Your Order</a>
                            <a href="#">Returns & Exchanges</a>
                            <a href="#">Care Instructions</a>
                            <a href="#">Size Guide</a>
                            <a href="#">FAQ</a>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2025 Bloom & Blossom. All rights reserved. Made with ❤️ for flower lovers.</p>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>`;

    document.querySelector("footer").innerHTML = data;
}


async function viewCart() {
    const popup = new Notification();
    const response = await fetch("LoadCartItems");
    if (response.ok) {

        const json = await response.json();
        if (json.status) {
            //  console.log(json.cartItems);
            const side_panel_cart_item_list = document.getElementById("side-panel-cart-item-list");
            side_panel_cart_item_list.innerHTML = "";

            let total = 0;
            let totalQty = 0;

            json.cartItems.forEach(cart => {
                let productSubTotal = cart.product.price * cart.qty;
                total += productSubTotal;
                totalQty += cart.qty;

                let cartItem = `
    <li class="cart-item">
        <div class="item-img">
            <a href="single-product.html?id=${cart.product.id}">
                <img src="product-images/${cart.product.id}/image1.png" alt="Product Image-1">
            </a>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="item-content">
            <h3 class="item-title">
                <a href="#">${cart.product.title}</a>
            </h3>
            <div class="item-price">
                <span class="currency-symbol">Rs. </span>
                ${(new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2
                }).format(cart.product.price))}
            </div>
            <div class="pro-qty item-quantity">
                <input type="number" class="quantity-input" value="${cart.qty}">
            </div>
        </div>
    </li>
`;



                side_panel_cart_item_list.innerHTML += cartItem;
            });


            document.getElementById("side-panel-cart-sub-total").innerHTML = new Intl.NumberFormat(
                    "en-US",
                    {
                        minimumFractionDigits: 2
                    })
                    .format(total);

        } else {
            popup.error(
                    {
                        message: json.message
                    }
            );
        }

    } else {
        popup.error(
                {
                    message: "Cart Items Loading Failed"
                }
        );
    }
}




loadHeader();
loadFooter();
initHeaderDropdowns();

