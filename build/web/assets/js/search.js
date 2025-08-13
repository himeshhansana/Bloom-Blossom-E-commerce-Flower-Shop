//
//async function loadData() {
//    console.log("filter data load");
//    const popup = new Notification();
//    try {
//        const response = await fetch("loadData");
//        if (response.ok) {
//            const json = await response.json();
//            if (json.status) {
//                console.log(json);
//                loadOptions("flowers_category", json.flowers_categoryList, "name");
//                loadOptions("flowers_type", json.flower_typeList, "name");
//                loadOptions("freshness", json.freshnessList, "value");
//                loadOptions("color", json.colorList, "value");
//                loadOptions("size", json.sizeList, "value");
//                updateProductView(json);
//            } else {
//                popup.error({
//                    message: "Something went wrong. Please try again later"
//                });
//            }
//        } else {
//            popup.error({
//                message: "Failed to load data from server"
//            });
//        }
//    } catch (error) {
//        console.error("Error loading data:", error);
//        popup.error({
//            message: "Network error. Please check your connection"
//        });
//    }
//}
//
//
//function loadOptions(prefix, dataList, property) {
//    // Get the correct options container ID
//    let optionsId = `${prefix}-options`;
//    let options = document.getElementById(optionsId);
//
//    if (!options) {
//        console.error(`Element with ID ${optionsId} not found`);
//        return;
//    }
//
//    // Clear existing options
//    options.innerHTML = '';
//
//    // Add new options
//    dataList.forEach(item => {
//        let li = document.createElement('li');
//
//        if (prefix === "color") {
//            li.innerHTML = `
//                <label class="color-option-wrapper">
//                    <input type="radio" name="color" value="${item[property]}">
//                    <span class="color-circle" style="background-color: ${item[property]};"></span>
//                </label>
//            `;
//        } else if (prefix === "size") {
//            li.innerHTML = `
//                <button class="size-btn" data-size="${item[property]}">${item[property]}</button>
//            `;
//        } else {
//            // For flowers category, type, and freshness
//            let inputName = prefix === "flowers_category" ? "category" :
//                    prefix === "flowers_type" ? "type" :
//                    prefix;
//
//            li.innerHTML = `
//                <label class="filter-checkbox">
//                    <input type="checkbox" name="${inputName}" value="${item[property]}">
//                    <span class="checkmark"></span>
//                    ${item[property]}
//                </label>
//            `;
//        }
//
//        options.appendChild(li);
//    });
//
//    // Add event listeners for size buttons
//    if (prefix === "size") {
//        document.querySelectorAll(`#${optionsId} .size-btn`).forEach(button => {
//            button.addEventListener('click', function () {
//                document.querySelectorAll(`#${optionsId} .size-btn`).forEach(btn => {
//                    btn.classList.remove('active');
//                });
//                this.classList.add('active');
//            });
//        });
//    }
//}
//
//
//async function searchProduct(firstResult) {
//    const popup = new Notification();
//    const flowers_categoryName = document.getElementById("flowers_category-options")
//            .querySelector(".chosen")?.querySelector("a").innerHTML;
//
//    const flowers_type = document.getElementById("flowers_type-options")
//            .querySelector(".chosen")?.querySelector("a").innerHTML;
//
//    const color_name = document.getElementById("color-options")
//            .querySelector(".chosen")?.querySelector("a").style.backgroundColor;
//
//    const freshnessName = document.getElementById("freshness-options")
//            .querySelector(".chosen")?.querySelector("a").innerHTML;
//
//    const size_value = document.getElementById("size-options")
//            .querySelector(".chosen")?.querySelector("a").innerHTML;
//
//    const price_range_start = $("#slider-range").slider("values", 0); //left
//    const price_range_end = $("#slider-range").slider("values", 1);//right
//
//    const sort_value = document.getElementById("st-sort").value;
//
//    const data = {
//        firstResult: firstResult,
//        flowers_categoryName: flowers_categoryName,
//        flowers_typeName: flowers_type,
//        colorName: color_name,
//        sizeValue: size_value,
//        freshnessName: freshnessName,
//        priceStart: price_range_start,
//        priceEnd: price_range_end,
//        sortValue: sort_value
//    };
//
//    const dataJSON = JSON.stringify(data);
//
//    const response = await fetch("SearchProducts",
//            {
//                method: "POST",
//                headers: {
//                    "Content-Type": "application/json"
//                },
//                body: dataJSON
//            });
//
//    if (response.ok) {
//        const json = await response.json();
//        if (json.status) {
//            console.log(json);
//            updateProductView(json);
//            popup.success({
//                message: "Product Loading Complete..."
//            });
//        } else {
//            popup.error({
//                message: "Somthing went wrong. Please try again later"
//            });
//        }
//    } else {
//        popup.error({
//            message: "Somthing went wrong. Please try again later"
//        });
//    }
//}
//
//
//
//
//const st_product = document.getElementById("st-product"); // product card parent node
//let st_pagination_button = document.getElementById("st-pagination-button");
//let current_page = 0;
//
//function updateProductView(json) {
//    const product_container = document.getElementById("st-product-container");
//    product_container.innerHTML = "";
//    json.productList.forEach(product => {
//        let st_product_clone = st_product.cloneNode(true);// enable child nodes cloning / allow child nodes
//        st_product_clone.querySelector("#st-product-a-1").href = "single-product.html?id=" + product.id;
//        st_product_clone.querySelector("#st-product-img-1").src = "product-images//" + product.id + "//image1.png";
//        st_product_clone.querySelector("#st-product-add-to-cart").addEventListener(
//                "click", (e) => {
//            addToCart(product.id, 1);
//            e.preventDefault();
//        });
//        st_product_clone.querySelector("#st-product-a-2").href = "single-product.html?id=" + product.id;
//        st_product_clone.querySelector("#st-product-title-1").innerHTML = product.title;
//        st_product_clone.querySelector("#st-product-price-1").innerHTML = new Intl.NumberFormat(
//                "en-US",
//                {minimumFractionDigits: 2})
//                .format(product.price);
//        //append child
//        product_container.appendChild(st_product_clone);
//    });
//
//    let st_pagination_container = document.getElementById("st-pagination-container");
//    st_pagination_container.innerHTML = "";
//    let all_product_count = json.allProductCount;
//    document.getElementById("all-item-count").innerHTML = all_product_count;
//    let product_per_page = 6;
//    let pages = Math.ceil(all_product_count / product_per_page); // round upper integer 
//
//    //previous-button
//    if (current_page !== 0) {
//        let st_pagination_button_prev_clone = st_pagination_button.cloneNode(true);
//        st_pagination_button_prev_clone.innerHTML = "Prev";
//        st_pagination_button_prev_clone.addEventListener(
//                "click", (e) => {
//            current_page--;
//            searchProduct(current_page * product_per_page);
//            e.preventDefault();
//        });
//        st_pagination_container.appendChild(st_pagination_button_prev_clone);
//    }
//
//    // pagination-buttons
//    for (let i = 0; i < pages; i++) {
//        let st_pagination_button_clone = st_pagination_button.cloneNode(true);
//        st_pagination_button_clone.innerHTML = i + 1;
//        st_pagination_button_clone.addEventListener(
//                "click", (e) => {
//            current_page = i;
//            searchProduct(i * product_per_page);
//            e.preventDefault();
//        });
//
//        if (i === Number(current_page)) {
//            st_pagination_button_clone.className = "axil-btn btn btn-primary btn-lg fw-bold ml--5";
//        } else {
//            st_pagination_button_clone.className = "axil-btn btn btn-outline-secondary btn-lg ml--5";
//        }
//        st_pagination_container.appendChild(st_pagination_button_clone);
//    }
//
//    // next-button
//    if (current_page !== (pages - 1)) {
//        let st_pagination_button_next_clone = st_pagination_button.cloneNode(true);
//        st_pagination_button_next_clone.innerHTML = "Next";
//        st_pagination_button_next_clone.addEventListener(
//                "click", (e) => {
//            current_page++;
//            searchProduct(current_page * product_per_page);
//            e.preventDefault();
//        });
//        st_pagination_container.appendChild(st_pagination_button_next_clone);
//    }
//}
//
//
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


// Initialize SweetAlert2 notifications
class Notification {
    success(options) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: options.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }

    error(options) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: options.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    }
}

async function loadData() {
    console.log("filter data load");
    const popup = new Notification();
    try {
        const response = await fetch("loadData");
        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                console.log(json);
                loadOptions("flowers_category", json.flowers_categoryList, "name");
                loadOptions("flowers_type", json.flower_typeList, "name");
                loadOptions("freshness", json.freshnessList, "value");
                loadOptions("color", json.colorList, "value");
                loadOptions("size", json.sizeList, "value");
                updateProductView(json);
            } else {
                popup.error({
                    message: "Something went wrong. Please try again later"
                });
            }
        } else {
            popup.error({
                message: "Failed to load data from server"
            });
        }
    } catch (error) {
        console.error("Error loading data:", error);
        popup.error({
            message: "Network error. Please check your connection"
        });
    }
}

function loadOptions(prefix, dataList, property) {
    // Get the correct options container ID
    let optionsId = `${prefix}-options`;
    let options = document.getElementById(optionsId);

    if (!options) {
        console.error(`Element with ID ${optionsId} not found`);
        return;
    }

    // Clear existing options
    options.innerHTML = '';

    // Add new options
    dataList.forEach(item => {
        let li = document.createElement('li');

        if (prefix === "color") {
            li.innerHTML = `
                <label class="color-option-wrapper">
                    <input type="radio" name="color" value="${item[property]}">
                    <span class="color-circle" style="background-color: ${item[property]};"></span>
                </label>
            `;
        } else if (prefix === "size") {
            li.innerHTML = `
                <button class="size-btn" data-size="${item[property]}">${item[property]}</button>
            `;
        } else {
            // For flowers category, type, and freshness
            let inputName = prefix === "flowers_category" ? "category" :
                    prefix === "flowers_type" ? "type" :
                    prefix;

            li.innerHTML = `
                <label class="filter-checkbox">
                    <input type="checkbox" name="${inputName}" value="${item[property]}">
                    <span class="checkmark"></span>
                    ${item[property]}
                </label>
            `;
        }

        options.appendChild(li);
    });

    // Add event listeners for size buttons
    if (prefix === "size") {
        document.querySelectorAll(`#${optionsId} .size-btn`).forEach(button => {
            button.addEventListener('click', function () {
                document.querySelectorAll(`#${optionsId} .size-btn`).forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
}

async function searchProduct(firstResult) {
    const popup = new Notification();
    try {
        const flowers_categoryName = document.getElementById("flowers_category-options")
                .querySelector(".chosen")?.querySelector("a")?.innerHTML;

        const flowers_type = document.getElementById("flowers_type-options")
                .querySelector(".chosen")?.querySelector("a")?.innerHTML;

        const color_name = document.getElementById("color-options")
                .querySelector(".chosen")?.querySelector("a")?.style.backgroundColor;

        const freshnessName = document.getElementById("freshness-options")
                .querySelector(".chosen")?.querySelector("a")?.innerHTML;

        const size_value = document.getElementById("size-options")
                .querySelector(".chosen")?.querySelector("a")?.innerHTML;

        const price_range_start = $("#slider-range").slider("values", 0); //left
        const price_range_end = $("#slider-range").slider("values", 1);//right

        const sort_value = document.getElementById("st-sort").value;

        const data = {
            firstResult: firstResult,
            flowers_categoryName: flowers_categoryName,
            flowers_typeName: flowers_type,
            colorName: color_name,
            sizeValue: size_value,
            freshnessName: freshnessName,
            priceStart: price_range_start,
            priceEnd: price_range_end,
            sortValue: sort_value
        };

        const dataJSON = JSON.stringify(data);

        const response = await fetch("SearchProducts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: dataJSON
                });

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                console.log(json);
                updateProductView(json);
                popup.success({
                    message: "Product Loading Complete..."
                });
            } else {
                popup.error({
                    message: json.message || "Something went wrong. Please try again later"
                });
            }
        } else {
            popup.error({
                message: "Failed to fetch data from server"
            });
        }
    } catch (error) {
        console.error("Search error:", error);
        popup.error({
            message: "Network error occurred. Please try again"
        });
    }
}

const st_product = document.getElementById("st-product"); // product card parent node
let st_pagination_button = document.getElementById("st-pagination-button");
let current_page = 0;

function updateProductView(json) {
    const product_container = document.getElementById("st-product-container");
    product_container.innerHTML = "";
    json.productList.forEach(product => {
        let st_product_clone = st_product.cloneNode(true);// enable child nodes cloning / allow child nodes
        st_product_clone.querySelector("#st-product-a-1").href = "single-product.html?id=" + product.id;
        st_product_clone.querySelector("#st-product-img-1").src = "product-images//" + product.id + "//image1.png";
        st_product_clone.querySelector("#st-product-add-to-cart").addEventListener(
                "click", (e) => {
            addToCart(product.id, 1);
            e.preventDefault();
        });
        st_product_clone.querySelector("#st-product-a-2").href = "single-product.html?id=" + product.id;
        st_product_clone.querySelector("#st-product-title-1").innerHTML = product.title;
        st_product_clone.querySelector("#st-product-price-1").innerHTML = new Intl.NumberFormat(
                "en-US",
                {minimumFractionDigits: 2})
                .format(product.price);
        //append child
        product_container.appendChild(st_product_clone);
    });

    let st_pagination_container = document.getElementById("st-pagination-container");
    st_pagination_container.innerHTML = "";
    let all_product_count = json.allProductCount;
    document.getElementById("all-item-count").innerHTML = all_product_count;
    let product_per_page = 6;
    let pages = Math.ceil(all_product_count / product_per_page); // round upper integer 

    //previous-button
    if (current_page !== 0) {
        let st_pagination_button_prev_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_prev_clone.innerHTML = "Prev";
        st_pagination_button_prev_clone.addEventListener(
                "click", (e) => {
            current_page--;
            searchProduct(current_page * product_per_page);
            e.preventDefault();
        });
        st_pagination_container.appendChild(st_pagination_button_prev_clone);
    }

    // pagination-buttons
    for (let i = 0; i < pages; i++) {
        let st_pagination_button_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_clone.innerHTML = i + 1;
        st_pagination_button_clone.addEventListener(
                "click", (e) => {
            current_page = i;
            searchProduct(i * product_per_page);
            e.preventDefault();
        });

        if (i === Number(current_page)) {
            st_pagination_button_clone.className = "axil-btn btn btn-primary btn-lg fw-bold ml--5";
        } else {
            st_pagination_button_clone.className = "axil-btn btn btn-outline-secondary btn-lg ml--5";
        }
        st_pagination_container.appendChild(st_pagination_button_clone);
    }

    // next-button
    if (current_page !== (pages - 1)) {
        let st_pagination_button_next_clone = st_pagination_button.cloneNode(true);
        st_pagination_button_next_clone.innerHTML = "Next";
        st_pagination_button_next_clone.addEventListener(
                "click", (e) => {
            current_page++;
            searchProduct(current_page * product_per_page);
            e.preventDefault();
        });
        st_pagination_container.appendChild(st_pagination_button_next_clone);
    }
}

async function addToCart(productId, qty) {
    const popup = new Notification();
    try {
        const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                popup.success({
                    message: json.message || "Product added to cart successfully"
                });
                
                // Update cart count if needed
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent) || 0;
                    cartCount.textContent = currentCount + parseInt(qty);
                }
            } else {
                popup.error({
                    message: json.message || "Failed to add product to cart"
                });
            }
        } else {
            popup.error({
                message: "Server error occurred. Please try again"
            });
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        popup.error({
            message: "Network error occurred. Please check your connection"
        });
    }
}