var flower_typeList;

async function loadProductData() {
    const response = await fetch("LoadProductData");


    if (response.ok) {
        const json = await response.json();
        console.log(json);
        if (json.status) {

            //load flowers_category
            loadSelect("flowers_category", json.flowers_categoryList, "name");


            //load flower_type
            flower_typeList = json.flower_typeList;
            // loadSelect("flower_type",json.flower_typeList,"name");

            //load size

            loadSelect("size", json.sizeList, "value");

            //load color
            loadSelect("color", json.colorList, "value");

            //load freshness
            loadSelect("freshness", json.freshnessList, "value");


        } else {
            document.getElementById("message").innerHTML = "Unable to get product data ! Please try again later";

        }


    } else {
        document.getElementById("message").innerHTML = "Unable to get product data ! Please try again later";
    }
}

function loadSelect(selectId, list, property) {
    const select = document.getElementById(selectId);

    list.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.innerHTML = item[property];
        select.appendChild(option);
    });

}

function loadModels() {

    const flowers_categoryId = document.getElementById("flowers_category").value;
    const flower_typeSelect = document.getElementById("flower_type");
    flower_typeSelect.length = 1;

    flower_typeList.forEach(item => {
        if (item.flowers_category.id == flowers_categoryId) {
            const option = document.createElement("option");
            option.value = item.id;
            option.innerHTML = item.name;
            flower_typeSelect.appendChild(option);


        }
    });

}

//async function saveProduct() {
//
//    const flowers_categoryId = document.getElementById("flowers_category").value;
//    const flower_typeId = document.getElementById("flower_type").value;
//    const title = document.getElementById("title").value;
//    const description = document.getElementById("description").value;
//    const sizeId = document.getElementById("size").value;
//    const colorId = document.getElementById("color").value;
//    const freshnessId = document.getElementById("freshness").value;
//    const price = document.getElementById("price").value;
//    const qty = document.getElementById("qty").value;
//
//    const image1 = document.getElementById("img1").files[0];
//    const image2 = document.getElementById("img2").files[0];
//    const image3 = document.getElementById("img3").files[0];
//
//    const form = new FormData();
//    form.append("flowers_categoryId", flowers_categoryId);
//    form.append("flower_typeId", flower_typeId);
//    form.append("title", title);
//    form.append("description", description);
//    form.append("sizeId", sizeId);
//    form.append("colorId", colorId);
//    form.append("freshnessId", freshnessId);
//    form.append("price", price);
//    form.append("qty", qty);
//    form.append("image1", image1);
//    form.append("image2", image2);
//    form.append("image3", image3);
//
//    const response = await fetch(
//            "SaveProduct",
//            {
//                method: "POST",
//                body: form
//            }
//    );
//
//
//    const popup = Notification();
//
//    if (response.ok) { // success
//        const json = await response.json();
//        if (json.status) {
//            document.getElementById("message").innerHTML = "Product Added Successfully.";
//
//            popup.success({
//                message: "Product Added Successfully."
//            });
//
//            document.getElementById("flowers_category").value = 0;
//            document.getElementById("flower_type").value = 0;
//            document.getElementById("title").value = 0;
//            document.getElementById("description").value = 0;
//            document.getElementById("size").value = 0;
//            document.getElementById("color").value = 0;
//            document.getElementById("freshness").value = 0;
//            document.getElementById("price").value = 0;
//            document.getElementById("qty").value = 0;
//
//            document.getElementById("img1").value = "";
//            document.getElementById("img2").value = "";
//            document.getElementById("img3").value = "";
//
//        } else {// when status false
//            if (json.message === "Please sign in!") {
//                window.location = "sing-in.html";
//            } else {
//                document.getElementById("message").innerHTML = json.message;
//
//                popup.error(
//                        {
//                            message: json.message
//                        }
//                );
//            }
//        }
//    } else {
//    }
//
//}


//async function saveProduct() {
//    // Initialize SweetAlert2 notification
//    const Toast = Swal.mixin({
//        toast: true,
//        position: 'top-end',
//        showConfirmButton: false,
//        timer: 3000,
//        timerProgressBar: true,
//        didOpen: (toast) => {
//            toast.addEventListener('mouseenter', Swal.stopTimer)
//            toast.addEventListener('mouseleave', Swal.resumeTimer)
//        }
//    });
//
//    try {
//        // Get form values
//        const flowers_categoryId = document.getElementById("flowers_category").value;
//        const flower_typeId = document.getElementById("flower_type").value;
//        const title = document.getElementById("title").value;
//        const description = document.getElementById("description").value;
//        const sizeId = document.getElementById("size").value;
//        const colorId = document.getElementById("color").value;
//        const freshnessId = document.getElementById("freshness").value;
//        const price = document.getElementById("price").value;
//        const qty = document.getElementById("qty").value;
//
//        const image1 = document.getElementById("img1").files[0];
//        const image2 = document.getElementById("img2").files[0];
//        const image3 = document.getElementById("img3").files[0];
//
//        // Validate required fields
//        if (!flowers_categoryId || !flower_typeId || !title || !price || !qty || !image1) {
//            await Toast.fire({
//                icon: 'error',
//                title: 'Please fill all required fields including at least one image'
//            });
//            return;
//        }
//
//        // Prepare form data
//        const form = new FormData();
//        form.append("flowers_categoryId", flowers_categoryId);
//        form.append("flower_typeId", flower_typeId);
//        form.append("title", title);
//        form.append("description", description);
//        form.append("sizeId", sizeId);
//        form.append("colorId", colorId);
//        form.append("freshnessId", freshnessId);
//        form.append("price", price);
//        form.append("qty", qty);
//        form.append("image1", image1);
//        if (image2)
//            form.append("image2", image2);
//        if (image3)
//            form.append("image3", image3);
//
//        // Show loading indicator
//        Swal.fire({
//            title: 'Processing...',
//            html: 'Please wait while we save your product',
//            allowOutsideClick: false,
//            didOpen: () => {
//                Swal.showLoading()
//            }
//        });
//
//        const response = await fetch("SaveProduct", {
//            method: "POST",
//            body: form
//        });
//
//        // Close loading indicator
//        Swal.close();
//
//        if (response.ok) {
//            const json = await response.json();
//
//            if (json.status) {
//                // Success notification
//                await Toast.fire({
//                    icon: 'success',
//                    title: 'Product Added Successfully!'
//                });
//
//                // Reset form
//                document.getElementById("flowers_category").selectedIndex = 0;
//                document.getElementById("flower_type").selectedIndex = 0;
//                document.getElementById("title").value = '';
//                document.getElementById("description").value = '';
//                document.getElementById("size").selectedIndex = 0;
//                document.getElementById("color").selectedIndex = 0;
//                document.getElementById("freshness").selectedIndex = 0;
//                document.getElementById("price").value = '';
//                document.getElementById("qty").value = '';
//                document.getElementById("img1").value = '';
//                document.getElementById("img2").value = '';
//                document.getElementById("img3").value = '';
//
//            } else {
//                if (json.message === "Please sign in!") {
//                    window.location.href = "sign-in.html";
//                } else {
//                    await Toast.fire({
//                        icon: 'error',
//                        title: json.message || 'Failed to save product'
//                    });
//                }
//            }
//        } else {
//            await Toast.fire({
//                icon: 'error',
//                title: 'Server error occurred. Please try again.'
//            });
//        }
//    } catch (error) {
//        console.error('Error:', error);
//        await Toast.fire({
//            icon: 'error',
//            title: 'An unexpected error occurred. Please try again.'
//        });
//    }
//}



class ProductNotification {
    constructor() {
        this.config = {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        };
    }

    success(options) {
        Swal.fire({
            ...this.config,
            icon: 'success',
            title: 'Success',
            text: options.message
        });
    }

    error(options) {
        Swal.fire({
            ...this.config,
            icon: 'error',
            title: 'Error',
            text: options.message
        });
    }
}

async function saveProduct() {
    const popup = new ProductNotification();

    try {
        // Get form values
        const flowers_categoryId = document.getElementById("flowers_category").value;
        const flower_typeId = document.getElementById("flower_type").value;
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const sizeId = document.getElementById("size").value;
        const colorId = document.getElementById("color").value;
        const freshnessId = document.getElementById("freshness").value;
        const price = document.getElementById("price").value;
        const qty = document.getElementById("qty").value;

        const image1 = document.getElementById("img1").files[0];
        const image2 = document.getElementById("img2").files[0];
        const image3 = document.getElementById("img3").files[0];

        // Client-side validation
        if (!flowers_categoryId || flowers_categoryId === "0") {
            popup.error({message: "Please select a flowers category"});
            return;
        }
        if (!flower_typeId || flower_typeId === "0") {
            popup.error({message: "Please select a flower type"});
            return;
        }
        if (!title) {
            popup.error({message: "Product title cannot be empty"});
            return;
        }
        if (!description) {
            popup.error({message: "Product description cannot be empty"});
            return;
        }
        if (!sizeId || sizeId === "0") {
            popup.error({message: "Please select a size"});
            return;
        }
        if (!colorId || colorId === "0") {
            popup.error({message: "Please select a color"});
            return;
        }
        if (!freshnessId || freshnessId === "0") {
            popup.error({message: "Please select freshness"});
            return;
        }
        if (!price || isNaN(price) || parseFloat(price) <= 0) {
            popup.error({message: "Please enter a valid price"});
            return;
        }
        if (!qty || isNaN(qty) || parseInt(qty) <= 0) {
            popup.error({message: "Please enter a valid quantity"});
            return;
        }
        if (!image1) {
            popup.error({message: "At least one image is required"});
            return;
        }

        const form = new FormData();
        form.append("flowers_categoryId", flowers_categoryId);
        form.append("flower_typeId", flower_typeId);
        form.append("title", title);
        form.append("description", description);
        form.append("sizeId", sizeId);
        form.append("colorId", colorId);
        form.append("freshnessId", freshnessId);
        form.append("price", price);
        form.append("qty", qty);
        if (image1)
            form.append("image1", image1);
        if (image2)
            form.append("image2", image2);
        if (image3)
            form.append("image3", image3);

        // Show loading indicator
        Swal.fire({
            title: 'Saving Product...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch("SaveProduct", {
            method: "POST",
            body: form
        });

        Swal.close(); // Close loading indicator

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                popup.success({
                    message: json.message || "Product added successfully!"
                });

                // Reset form
                document.getElementById("flowers_category").value = "0";
                document.getElementById("flower_type").value = "0";
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("size").value = "0";
                document.getElementById("color").value = "0";
                document.getElementById("freshness").value = "0";
                document.getElementById("price").value = "";
                document.getElementById("qty").value = "";
                document.getElementById("img1").value = "";
                document.getElementById("img2").value = "";
                document.getElementById("img3").value = "";

            } else {
                if (json.message === "Please sign in!") {
                    window.location.href = "sign-in.html";
                } else {
                    popup.error({
                        message: json.message || "Failed to save product"
                    });
                }
            }
        } else {
            popup.error({
                message: "Server error occurred. Please try again later."
            });
        }
    } catch (error) {
        Swal.close(); // Close loading indicator in case of error
        console.error("Error saving product:", error);
        popup.error({
            message: "Network error occurred. Please check your connection."
        });
    }
}
