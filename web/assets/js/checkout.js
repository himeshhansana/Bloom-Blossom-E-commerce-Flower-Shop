//
//payhere.onCompleted = function onCompleted(orderId) {
//
//    console.log(orderId);
//    alert("Your Order successfully placed! Order ID: " + orderId);
//    window.location = "payment-success.html?orderId=" + orderId;
//
//};
//
//
//payhere.onDismissed = function onDismissed() {
//
//    console.log("Payment dismissed");
//};
//
//
//payhere.onError = function onError(error) {
//
//    console.log("Error:" + error);
//};
//
//
//
//
//
//
//
//async function loadCheckoutData() {
//
//    const popup = new Notification();
//
//    const response = await fetch("LoadCheckoutData");
//
//    if (response.ok) {
//
//
//        const json = await response.json();
//
//        if (json.status) {
//
//            console.log(json);
//            const userAddress = json.userAddress;
//            const cityList = json.cityList;
//            const cartItems = json.cartList;
//            const deliveryTypes = json.deliveryTypes;
//
//            const city_select = document.getElementById("city-select");
//
//            cityList.forEach(city => {
//
//                let option = document.createElement("option");
//                option.value = city.id;
//                option.innerHTML = city.name;
//
//                city_select.appendChild(option);
//
//            });
//
//            //load current address
//
//            const current_address_checkbox = document.getElementById("checkbox1");
//
//            current_address_checkbox.addEventListener("change", function () {
//
//                let first_name = document.getElementById("first-name");
//                let last_name = document.getElementById("last-name");
//                let line_one = document.getElementById("line-one");
//                let line_two = document.getElementById("line-two");
//                let postal_code = document.getElementById("postal-code");
//                let mobile = document.getElementById("mobile");
//
//                if (current_address_checkbox.checked) {
//
//                    first_name.value = userAddress.user.first_name;
//                    last_name.value = userAddress.user.last_name;
//                    city_select.value = userAddress.city.id;
//                    city_select.disabled = true;
//                    city_select.dispatchEvent(new Event("change"));
//                    line_one.value = userAddress.lineOne;
//                    line_two.value = userAddress.lineTwo;
//                    postal_code.value = userAddress.postalCode;
//                    mobile.value = userAddress.mobile;
//
//
//
//                } else {
//
//                    first_name.value = "";
//                    last_name.value = "";
//                    city_select.value = 0;
//                    city_select.disabled = false;
//                    city_select.dispatchEvent(new Event("change"));
//                    line_one.value = "";
//                    line_two.value = "";
//                    postal_code.value = "";
//                    mobile.value = "";
//
//
//                }
//
//            });
//
//            //cart details
//            let st_tbody = document.getElementById("st-tbody");
//            let st_item_tr = document.getElementById("st-item-tr");
//            let st_subtotal_tr = document.getElementById("st-subtotal-tr");
//            let st_order_shipping_tr = document.getElementById("st-order-shipping-tr");
//            let st_order_total_tr = document.getElementById("st-order-total-tr");
//
//            st_tbody.innerHTML = "";
//
//            let total = 0;
//            let item_count = 0;
//
//            cartItems.forEach(cart => {
//
//                let st_item_tr_clone = st_item_tr.cloneNode(true);
//                st_item_tr_clone.querySelector("#st-product-title").innerHTML = cart.product.title;
//                st_item_tr_clone.querySelector("#st-product-qty").innerHTML = cart.qty;
//                item_count += cart.qty;
//                let item_sub_total = Number(cart.qty) * Number(cart.product.price);
//
//                st_item_tr_clone.querySelector("#st-product-price").innerHTML = new Intl.NumberFormat(
//                        "en-US",
//                        {
//                            minimumFractionDigits: 2
//                        })
//                        .format(item_sub_total);
//                st_tbody.appendChild(st_item_tr_clone);
//
//                total += item_sub_total;
//
//            });
//            st_subtotal_tr.querySelector("#st-product-total-amount").innerHTML = new Intl.NumberFormat(
//                    "en-US",
//                    {
//                        minimumFractionDigits: 2
//                    })
//                    .format(total);
//            st_tbody.appendChild(st_subtotal_tr);
//
//            let shipping_charges = 0;
//            city_select.addEventListener("change", (e) => {
//
//                let cityName = city_select.options[city_select.selectedIndex].innerHTML;
//                if (cityName === "colombo") {
//
//
//
//                    shipping_charges = deliveryTypes[0].price;
//
//                } else {
//                    shipping_charges = deliveryTypes[1].price;
//                }
//
//                st_order_shipping_tr.querySelector("#st-product-shipping-charges").innerHTML = new Intl.NumberFormat(
//                        "en-US",
//                        {
//                            minimumFractionDigits: 2
//                        }).format(shipping_charges);
//
//
//                st_tbody.appendChild(st_order_shipping_tr);
//
//                st_order_total_tr.querySelector("#st-order-total-amount")
//                        .innerHTML = new Intl.NumberFormat(
//                                "en-US",
//                                {
//                                    minimumFractionDigits: 2
//                                }).format(shipping_charges + total);
//
//                st_tbody.appendChild(st_order_total_tr);
//
//
//            });
//
//
//
//        } else {
//            if (json.message === "Empty cart") {
//                popup.error({
//                    message: "Emmpty cart . Please add some products"
//                });
//                window.location = "index.html";
//            } else {
//
//
//                popup.error({
//                    message: json.message
//                });
//            }
//
//        }
//
//
//
//    } else {
//        if (response.status === 401) {
//            window.location = "sign-in.html";
//        }
////        if(response.status ===404){
////            window.location= "404.html";
////        }
//
//    }
//
//
//}
//
//async function checkout() {
//    let checkbox1 = document.getElementById("checkbox1").checked;
//    let first_name = document.getElementById("first-name");
//    let last_name = document.getElementById("last-name");
//    let line_one = document.getElementById("line-one");
//    let line_two = document.getElementById("line-two");
//    let postal_code = document.getElementById("postal-code");
//    let mobile = document.getElementById("mobile");
//    const city_select = document.getElementById("city-select");
//
//    let data = {
//        isCurrentAddress: checkbox1,
//        firstName: first_name.value,
//        lastName: last_name.value,
//        citySelect: city_select.value,
//        lineOne: line_one.value,
//        lineTwo: line_two.value,
//        postalCode: postal_code.value,
//        mobile: mobile.value
//    };
//
//    let dataJSON = JSON.stringify(data);
//
//    const response = await fetch("Checkout", {
//        method: "POST",
//        headers: {
//            "Content-Type": "application/json"
//        },
//        body: dataJSON
//    });
//
//
//    const popup = new Notification();
//
//    if (response.ok) {
//        const json = await response.json();
//        if (json.status) {
//            console.log(json);
//            //payhere process
//            payhere.startPayment(json.payhereJson);
//
//        } else {
//            popup.error({
//                message: json.message
//            });
//        }
//    } else {
//        popup.error({
//            message: "Something went wrong c. Please try again! "
//        });
//    }
//
//
//
//}


// SweetAlert notification functions
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
        timer: 3000,
        showConfirmButton: true
    });
}

async function showLoading(message = 'Processing...') {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

async function showWarning(message) {
    await Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
        timer: 3000,
        showConfirmButton: true
    });
}

async function loadCheckoutData() {
    try {
        await showLoading('Loading checkout data...');

        const response = await fetch("LoadCheckoutData");

        if (response.status === 401) {
            Swal.close();
            await showError('Please sign in to continue');
            window.location = "sign-in.html";
            return;
        }

        if (!response.ok) {
            throw new Error('Failed to load checkout data');
        }

        const json = await response.json();
        Swal.close();

        if (json.status) {
            console.log(json);
            const userAddress = json.userAddress;
            const cityList = json.cityList;
            const cartItems = json.cartList;
            const deliveryTypes = json.deliveryTypes;

            const city_select = document.getElementById("city-select");
            city_select.innerHTML = '<option value="0">Select</option>';

            cityList.forEach(city => {
                let option = document.createElement("option");
                option.value = city.id;
                option.innerHTML = city.name;
                city_select.appendChild(option);
            });

            // Load current address
            const current_address_checkbox = document.getElementById("checkbox1");
            current_address_checkbox.addEventListener("change", function () {
                const first_name = document.getElementById("first-name");
                const last_name = document.getElementById("last-name");
                const line_one = document.getElementById("line-one");
                const line_two = document.getElementById("line-two");
                const postal_code = document.getElementById("postal-code");
                const mobile = document.getElementById("mobile");

                if (current_address_checkbox.checked) {
                    first_name.value = userAddress.user.first_name;
                    last_name.value = userAddress.user.last_name;
                    city_select.value = userAddress.city.id;
                    city_select.disabled = true;
                    city_select.dispatchEvent(new Event("change"));
                    line_one.value = userAddress.lineOne;
                    line_two.value = userAddress.lineTwo;
                    postal_code.value = userAddress.postalCode;
                    mobile.value = userAddress.mobile;
                } else {
                    first_name.value = "";
                    last_name.value = "";
                    city_select.value = 0;
                    city_select.disabled = false;
                    city_select.dispatchEvent(new Event("change"));
                    line_one.value = "";
                    line_two.value = "";
                    postal_code.value = "";
                    mobile.value = "";
                }
            });

            // Cart details
            let st_tbody = document.getElementById("st-tbody");
            let st_item_tr = document.getElementById("st-item-tr");
            let st_subtotal_tr = document.getElementById("st-subtotal-tr");
            let st_order_shipping_tr = document.getElementById("st-order-shipping-tr");
            let st_order_total_tr = document.getElementById("st-order-total-tr");

            st_tbody.innerHTML = "";

            let total = 0;
            let item_count = 0;

            cartItems.forEach(cart => {
                let st_item_tr_clone = st_item_tr.cloneNode(true);
                st_item_tr_clone.querySelector("#st-product-title").innerHTML = cart.product.title;
                st_item_tr_clone.querySelector("#st-product-qty").innerHTML = cart.qty;
                item_count += cart.qty;
                let item_sub_total = Number(cart.qty) * Number(cart.product.price);

                st_item_tr_clone.querySelector("#st-product-price").innerHTML = new Intl.NumberFormat(
                        "en-US", {minimumFractionDigits: 2}
                ).format(item_sub_total);
                st_tbody.appendChild(st_item_tr_clone);

                total += item_sub_total;
            });

            st_subtotal_tr.querySelector("#st-product-total-amount").innerHTML = new Intl.NumberFormat(
                    "en-US", {minimumFractionDigits: 2}
            ).format(total);
            st_tbody.appendChild(st_subtotal_tr);

            let shipping_charges = 0;
            city_select.addEventListener("change", (e) => {
                let cityName = city_select.options[city_select.selectedIndex].innerHTML.toLowerCase();
                if (cityName === "colombo") {
                    shipping_charges = deliveryTypes[0].price;
                } else {
                    shipping_charges = deliveryTypes[1].price;
                }

                st_order_shipping_tr.querySelector("#st-product-shipping-charges").innerHTML = new Intl.NumberFormat(
                        "en-US", {minimumFractionDigits: 2}
                ).format(shipping_charges);
                st_tbody.appendChild(st_order_shipping_tr);

                st_order_total_tr.querySelector("#st-order-total-amount").innerHTML = new Intl.NumberFormat(
                        "en-US", {minimumFractionDigits: 2}
                ).format(shipping_charges + total);
                st_tbody.appendChild(st_order_total_tr);
            });

            // Trigger initial calculation
            city_select.dispatchEvent(new Event("change"));

        } else {
            if (json.message === "Empty cart") {
                await showError("Your cart is empty. Please add some products");
                window.location = "index.html";
            } else {
                await showError(json.message);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        await showError("Failed to load checkout data. Please try again.");
    }
}

async function checkout() {
    try {
        // Validate form
        const checkbox1 = document.getElementById("checkbox1").checked;
        const first_name = document.getElementById("first-name").value.trim();
        const last_name = document.getElementById("last-name").value.trim();
        const line_one = document.getElementById("line-one").value.trim();
        const line_two = document.getElementById("line-two").value.trim();
        const postal_code = document.getElementById("postal-code").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const city_select = document.getElementById("city-select");
        const cityId = city_select.value;

        if (!checkbox1) {
            if (!first_name) {
                await showError("Please enter your first name");
                return;
            }
            if (!last_name) {
                await showError("Please enter your last name");
                return;
            }
            if (cityId === "0") {
                await showError("Please select your city");
                return;
            }
            if (!line_one) {
                await showError("Please enter address line 1");
                return;
            }
            if (!postal_code) {
                await showError("Please enter postal code");
                return;
            }
            if (!mobile) {
                await showError("Please enter mobile number");
                return;
            }
        }

        await showLoading("Processing your order...");

        const data = {
            isCurrentAddress: checkbox1,
            firstName: first_name,
            lastName: last_name,
            citySelect: cityId,
            lineOne: line_one,
            lineTwo: line_two,
            postalCode: postal_code,
            mobile: mobile
        };

        const response = await fetch("Checkout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        Swal.close();

        if (!response.ok) {
            throw new Error('Checkout failed');
        }

        const json = await response.json();

        if (json.status) {
            // Start payment process
            payhere.startPayment(json.payhereJson);
        } else {
            await showError(json.message || "Checkout failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        await showError("An error occurred during checkout. Please try again.");
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutData();

    // Handle Enter key in form fields
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkout();
            }
        });
    });
});

// PayHere callbacks
payhere.onCompleted = function onCompleted(orderId) {
    console.log(orderId);
    Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        html: `Your order has been successfully placed!<br>Order ID: ${orderId}`,
        confirmButtonText: 'Continue'
    }).then(() => {
        window.location = "payment-success.html?orderId=" + orderId;
    });
};

payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
    Swal.fire({
        icon: 'info',
        title: 'Payment Cancelled',
        text: 'You can complete your payment later',
        confirmButtonText: 'OK'
    });
};

payhere.onError = function onError(error) {
    console.log("Error:" + error);
    Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'An error occurred during payment: ' + error,
        confirmButtonText: 'OK'
    });
};