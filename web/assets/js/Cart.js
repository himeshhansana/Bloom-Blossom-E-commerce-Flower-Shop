//async function loadCartItems() {
//    const popup = new Notification();
//    const response = await fetch("LoadCartItems");
//    if (response.ok) {
//
//        const json = await response.json();
//        if (json.status) {
//            //  console.log(json.cartItems);
//            const cart_item_container = document.getElementById("cart-item-container");
//            cart_item_container.innerHTML = "";
//
//            let total = 0;
//            let totalQty = 0;
//
//            json.cartItems.forEach(cart => {
//                let productSubTotal = cart.product.price * cart.qty;
//                total += productSubTotal;
//                totalQty += cart.qty;
//
//                let tableData = ` <tr id="cart-item-row">
//                                        <td class="product-remove"><a href="#" class="remove-wishlist"><i class="fal fa-times"></i></a></td>
//                                        <td class="product-thumbnail"><a href="#"><img src="product-images//${cart.product.id }//image1.png" alt="Product"></a></td>
//                                        <td class="product-title"><a href="#">${cart.product.title}</a></td>
//                                        <td class="product-price" data-title="Price"><span class="currency-symbol">Rs. </span><span>${new Intl.NumberFormat(
//                        "en-US",
//                        {
//                            minimumFractionDigits: 2
//                        })
//                        .format(cart.product.price)}</span></td>
//                                        <td class="product-quantity" data-title="Qty">
//                                            <div class="pro-qty">
//                                                <input type="number" class="quantity-input" value="${cart.qty}">
//                                            </div>
//                                        </td>
//                                        <td class="product-subtotal" data-title="Subtotal"><span class="currency-symbol">Rs. </span><span>
//${new Intl.NumberFormat(
//                        "en-US",
//                        {
//                            minimumFractionDigits: 2
//                        })
//                        .format(productSubTotal)}
//</span></td>
//                                    </tr>`;
//                cart_item_container.innerHTML += tableData;
//            });
//
//            document.getElementById("order-total-quantity").innerHTML = totalQty;
//            document.getElementById("order-total-amount").innerHTML = new Intl.NumberFormat(
//                    "en-US",
//                    {
//                        minimumFractionDigits: 2
//                    })
//                    .format(total);
//
//        } else {
//            popup.error(
//                    {
//                        message: json.message
//                    }
//            );
//        }
//
//    } else {
//        popup.error(
//                {
//                    message: "Cart Items Loading Failed"
//                }
//        );
//    }
//}



//async function loadCartItems() {
//    const popup = new Notification();
//    const response = await fetch("LoadCartItems");
//    if (response.ok) {
//        const json = await response.json();
//        if (json.status) {
//            const cart_item_container = document.getElementById("cart-item-container");
//            cart_item_container.innerHTML = "";
//
//            let total = 0;
//            let totalQty = 0;
//
//            json.cartItems.forEach(cart => {
//                let productSubTotal = cart.product.price * cart.qty;
//                total += productSubTotal;
//                totalQty += cart.qty;
//
//                let tableData = ` <tr id="cart-item-row-${cart.id}">
//                                    <td class="product-remove">
//                                        <a href="#" class="remove-cart-item" data-cart-id="${cart.id}">
//                                            <i class="fal fa-times"></i>
//                                        </a>
//                                    </td>
//                                    <td class="product-thumbnail"><a href="#"><img src="product-images//${cart.product.id}//image1.png" alt="Product"></a></td>
//                                    <td class="product-title"><a href="#">${cart.product.title}</a></td>
//                                    <td class="product-price" data-title="Price"><span class="currency-symbol">Rs. </span><span>${new Intl.NumberFormat(
//                    "en-US",
//                    {
//                        minimumFractionDigits: 2
//                    })
//                    .format(cart.product.price)}</span></td>
//                                    <td class="product-quantity" data-title="Qty">
//                                        <div class="pro-qty">
//                                            <input type="number" class="quantity-input" value="${cart.qty}">
//                                        </div>
//                                    </td>
//                                    <td class="product-subtotal" data-title="Subtotal"><span class="currency-symbol">Rs. </span><span>
//${new Intl.NumberFormat(
//                    "en-US",
//                    {
//                        minimumFractionDigits: 2
//                    })
//                    .format(productSubTotal)}
//</span></td>
//                                </tr>`;
//                cart_item_container.innerHTML += tableData;
//            });
//
//            document.getElementById("order-total-quantity").innerHTML = totalQty;
//            document.getElementById("order-total-amount").innerHTML = new Intl.NumberFormat(
//                    "en-US",
//                    {
//                        minimumFractionDigits: 2
//                    })
//                    .format(total);
//
//            // Add event listeners to delete buttons
//            document.querySelectorAll('.remove-cart-item').forEach(button => {
//                button.addEventListener('click', async function(e) {
//                    e.preventDefault();
//                    const cartId = this.getAttribute('data-cart-id');
//                    await deleteCartItem(cartId);
//                });
//            });
//
//        } else {
//            popup.error(
//                    {
//                        message: json.message
//                    }
//            );
//        }
//    } else {
//        popup.error(
//                {
//                    message: "Cart Items Loading Failed"
//                }
//        );
//    }
//}
//
//async function deleteCartItem(cartId) {
//    const popup = new Notification();
//    try {
//        const response = await fetch('DeleteCartItem', {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/x-www-form-urlencoded',
//            },
//            body: `cartId=${cartId}`
//        });
//        
//        if (response.ok) {
//            const result = await response.text();
//            if (result === 'success') {
//                // Remove the row from the table
//                document.getElementById(`cart-item-row-${cartId}`).remove();
//                // Reload cart items to update totals
//                await loadCartItems();
//                popup.success({ message: 'Item removed from cart successfully' });
//            } else if (result === 'not_found') {
//                popup.error({ message: 'Item not found in cart' });
//            } else {
//                popup.error({ message: 'Failed to remove item from cart' });
//            }
//        } else {
//            popup.error({ message: 'Failed to remove item from cart' });
//        }
//    } catch (error) {
//        console.error('Error:', error);
//        popup.error({ message: 'An error occurred while removing item from cart' });
//    }
//}
//
//// Load cart items when page loads
//document.addEventListener('DOMContentLoaded', loadCartItems);
//
//
//document.addEventListener('DOMContentLoaded', function() {
//    // Handle clear cart button
//    document.getElementById('clear-cart')?.addEventListener('click', async function(e) {
//        e.preventDefault();
//        const popup = new Notification();
//        
//        try {
//            const response = await fetch('ClearCart', {
//                method: 'POST'
//            });
//            
//            if (response.ok) {
//                const result = await response.text();
//                if (result === 'success') {
//                    document.getElementById('cart-item-container').innerHTML = '';
//                    document.getElementById('order-total-quantity').innerHTML = '0';
//                    document.getElementById('order-total-amount').innerHTML = 'Rs. <span>0.00</span>';
//                    popup.success({ message: 'Cart cleared successfully' });
//                } else {
//                    popup.error({ message: 'Failed to clear cart' });
//                }
//            } else {
//                popup.error({ message: 'Failed to clear cart' });
//            }
//        } catch (error) {
//            console.error('Error:', error);
//            popup.error({ message: 'An error occurred while clearing cart' });
//        }
//    });
//});




// Replace Notification class with SweetAlert functions
async function showSuccess(message) {
    await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 2000,
        showConfirmButton: false
    });
}

async function showError(message) {
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 2000,
        showConfirmButton: false
    });
}

async function confirmAction(message) {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    });
    return result.isConfirmed;
}

async function loadCartItems() {
    try {
        const response = await fetch("LoadCartItems");
        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                const cart_item_container = document.getElementById("cart-item-container");
                cart_item_container.innerHTML = "";

                let total = 0;
                let totalQty = 0;

                if (json.cartItems.length === 0) {
                    cart_item_container.innerHTML = `
                        <tr>
                            <td colspan="6" class="text-center py-5">
                                <i class="fas fa-shopping-cart fa-3x mb-3" style="color: #ccc;"></i>
                                <h5>Your cart is empty</h5>
                                <a href="products.html" class="axil-btn btn-bg-primary mt-3">Continue Shopping</a>
                            </td>
                        </tr>`;
                } else {
                    json.cartItems.forEach(cart => {
                        let productSubTotal = cart.product.price * cart.qty;
                        total += productSubTotal;
                        totalQty += cart.qty;

                        let tableData = ` <tr id="cart-item-row-${cart.id}">
                                            <td class="product-remove">
                                                <a href="#" class="remove-cart-item" data-cart-id="${cart.id}">
                                                    <i class="fal fa-times"></i>
                                                </a>
                                            </td>
                                            <td class="product-thumbnail"><a href="#"><img src="product-images//${cart.product.id}//image1.png" alt="Product"></a></td>
                                            <td class="product-title"><a href="#">${cart.product.title}</a></td>
                                            <td class="product-price" data-title="Price"><span class="currency-symbol">Rs. </span><span>${new Intl.NumberFormat(
                                "en-US",
                                {
                                    minimumFractionDigits: 2
                                })
                                .format(cart.product.price)}</span></td>
                                            <td class="product-quantity" data-title="Qty">
                                                <div class="pro-qty">
                                                    <input type="number" class="quantity-input" value="${cart.qty}" min="1">
                                                </div>
                                            </td>
                                            <td class="product-subtotal" data-title="Subtotal"><span class="currency-symbol">Rs. </span><span>
                        ${new Intl.NumberFormat(
                                "en-US",
                                {
                                    minimumFractionDigits: 2
                                })
                                .format(productSubTotal)}
                        </span></td>
                                        </tr>`;
                        cart_item_container.innerHTML += tableData;
                    });

                    // Add event listeners to delete buttons
                    document.querySelectorAll('.remove-cart-item').forEach(button => {
                        button.addEventListener('click', async function (e) {
                            e.preventDefault();
                            const cartId = this.getAttribute('data-cart-id');
                            await deleteCartItem(cartId);
                        });
                    });

                    // Add event listeners to quantity inputs
                    document.querySelectorAll('.quantity-input').forEach(input => {
                        input.addEventListener('change', async function () {
                            const cartId = this.closest('tr').id.replace('cart-item-row-', '');
                            const newQty = parseInt(this.value);
                            if (newQty > 0) {
                                await updateCartItemQuantity(cartId, newQty);
                            } else {
                                this.value = 1;
                                await showError('Quantity must be at least 1');
                            }
                        });
                    });
                }

                document.getElementById("order-total-quantity").innerHTML = totalQty;
                document.getElementById("order-total-amount").innerHTML = new Intl.NumberFormat(
                        "en-US",
                        {
                            minimumFractionDigits: 2
                        })
                        .format(total);

            } else {
                await showError(json.message);
            }
        } else {
            await showError("Cart Items Loading Failed");
        }
    } catch (error) {
        console.error('Error loading cart items:', error);
//        await showError("An error occurred while loading cart items");
    }
}

async function deleteCartItem(cartId) {
    try {
        const confirmed = await confirmAction('Are you sure you want to remove this item from your cart?');
        if (!confirmed)
            return;

        const response = await fetch('DeleteCartItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `cartId=${cartId}`
        });

        if (response.ok) {
            const result = await response.text();
            if (result === 'success') {
                // Remove the row from the table
                const row = document.getElementById(`cart-item-row-${cartId}`);
                if (row)
                    row.remove();

                // Reload cart items to update totals
                await loadCartItems();
                await showSuccess('Item removed from cart successfully');
            } else if (result === 'not_found') {
                await showError('Item not found in cart');
            } else {
                await showError('Failed to remove item from cart');
            }
        } else {
            await showError('Failed to remove item from cart');
        }
    } catch (error) {
        console.error('Error:', error);
        await showError('An error occurred while removing item from cart');
    }
}

async function updateCartItemQuantity(cartId, newQty) {
    try {
        const response = await fetch('UpdateCartItemQuantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `cartId=${cartId}&quantity=${newQty}`
        });

        if (response.ok) {
            const result = await response.text();
            if (result === 'success') {
                await loadCartItems();
                await showSuccess('Quantity updated successfully');
            } else {
                await showError('Failed to update quantity');
            }
        } else {
            await showError('Failed to update quantity');
        }
    } catch (error) {
        console.error('Error:', error);
        await showError('An error occurred while updating quantity');
    }
}

// Clear cart function
async function clearCart() {
    try {
        const confirmed = await confirmAction('Are you sure you want to clear your entire cart?');
        if (!confirmed)
            return;

        const response = await fetch('ClearCart', {
            method: 'POST'
        });

        if (response.ok) {
            const result = await response.text();
            if (result === 'success') {
                document.getElementById('cart-item-container').innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-5">
                            <i class="fas fa-shopping-cart fa-3x mb-3" style="color: #ccc;"></i>
                            <h5>Your cart is empty</h5>
                            <a href="index.html" class="axil-btn btn-bg-primary mt-3">Continue Shopping</a>
                        </td>
                    </tr>`;
                document.getElementById('order-total-quantity').innerHTML = '0';
                document.getElementById('order-total-amount').innerHTML = 'Rs. <span>0.00</span>';
                await showSuccess('Cart cleared successfully');
            } else {
                await showError('Failed to clear cart');
            }
        } else {
            await showError('Failed to clear cart');
        }
    } catch (error) {
        console.error('Error:', error);
        await showError('An error occurred while clearing cart');
    }
}

// Load cart items when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadCartItems();

    // Handle clear cart button
    document.getElementById('clear-cart')?.addEventListener('click', async function (e) {
        e.preventDefault();
        await clearCart();
    });
});