
async function loadData() {
    console.log("single product js done.");

    const searchParam = new URLSearchParams(window.location.search);
    if (searchParam.has("id")) {
        const productId = searchParam.get("id");
        const response = await fetch("LoadSingleProduct?id=" + productId);
        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                console.log(json);

                //single product view images
                document.getElementById("mainProductImage").src = "product-images\\" + json.product.id + "\\image1.png"; // malindu main


                document.getElementById("image1").src = "product-images\\" + json.product.id + "\\image1.png";
                document.getElementById("image2").src = "product-images\\" + json.product.id + "\\image2.png";
                document.getElementById("image3").src = "product-images\\" + json.product.id + "\\image3.png";

//                document.getElementById("thumb-imge1").src = "product-images\\" + json.product.id + "\\image1.png";
//                document.getElementById("thumb-imge2").src = "product-images\\" + json.product.id + "\\image2.png";
//                document.getElementById("thumb-imge3").src = "product-images\\" + json.product.id + "\\image3.png";
                //single product view images

                document.getElementById("product-title").innerHTML = json.product.title;
                document.getElementById("published-on").innerHTML = json.product.created_at;
                document.getElementById("product-price").innerHTML = new Intl.NumberFormat(
                        "en-US",
                        {minimumFractionDigits: 2}).format(json.product.price);
                document.getElementById("product-cat").innerHTML = json.product.flower_type.flowers_category.name;
                document.getElementById("flower-type-name").innerHTML = json.product.flower_type.name;
                document.getElementById("product-freshness").innerHTML = json.product.freshness.value;
                document.getElementById("product-stock").innerHTML = json.product.qty;

                //product color
//                document.getElementById("color-border").style.borderColor = json.product.color.value;
                document.getElementById("color-background").style.backgroundColor = json.product.color.value;
//                document.getElementById("color-background").innerHTML = json.product.color.value;
                document.getElementById("product-size").innerHTML = json.product.size.value;
                document.getElementById("product-description").innerHTML = json.product.description;


                //add to cart main button
                const addToCartMain = document.getElementById("add-to-cart-main");
                addToCartMain.addEventListener(
                        "click", (e) => {
                    addToCart(json.product.id, document.getElementById("add-to-cart-qty").value);
                    e.preventDefault();
                });
                //add to cart main button



                //similer-product
                let similer_product_main = document.getElementById("smiler-product-main");
                let productHtml = document.getElementById("similer-product");
                similer_product_main.innerHTML = "";
                json.productList.forEach(item => {
                    let productCloneHtml = productHtml.cloneNode(true);
                    productCloneHtml.querySelector("#similer-product-a1").href = "single-product.html?id=" + item.id;
                    productCloneHtml.querySelector("#similer-product-image").src = "product-images\\" + item.id + "\\image1.png";
                    productCloneHtml.querySelector("#similer-product-add-to-cart").addEventListener(
                            "click", (e) => {
                        addToCart(item.id, 1);

                        e.preventDefault();
                    });
                    productCloneHtml.querySelector("#similer-product-a2").href = "single-product.html?id=" + item.id;
                    productCloneHtml.querySelector("#similer-product-title").innerHTML = item.title;
                    productCloneHtml.querySelector("#similer-product-size").innerHTML = item.size.value;
                    productCloneHtml.querySelector("#similer-product-price").innerHTML = "Rs." + new Intl.NumberFormat(
                            "en-US",
                            {minimumFractionDigits: 2})
                            .format(item.price);
                    productCloneHtml.querySelector("#similer-product-color-border").style.borderColor = "black";
                    productCloneHtml.querySelector("#similer-product-color-background").style.backgroundColor = item.color.value;

                    similer_product_main.appendChild(productCloneHtml);

                });
                //similer-product end

                $('.recent-product-activation').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    dots: false,
                    prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
                    nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
                    responsive: [{
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 479,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });


            } else {
                window.location = "index.html";
            }
        } else {
            window.location = "index.html";

        }
    }

}



//async function addToCart(productId, qty) {
//    const popup = new Notification();
//    const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);
//
//    if (response.ok) {
//
//        const json = await response.json();
//        if (json.status) {
//            popup.success({
//                message: json.message
//            });
//            document.getElementById("message").innerHTML = json.message;
//
//        } else {
//            popup.error({
//                message: "something went wrong"
//            });
//            document.getElementById("message").innerHTML = json.message;
//
//        }
//
//    } else {
//        popup.error({
//            message: "something went wrong"
//        });
//        document.getElementById("message").innerHTML = json.message;
//
//    }
//}


async function addToCart(productId, qty) {
    try {
        const response = await fetch("AddToCart?prId=" + productId + "&qty=" + qty);

        if (response.ok) {
            const json = await response.json();

            if (json.status) {
                // Success notification
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: json.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                document.getElementById("message").innerHTML = json.message;
            } else {
                // Error notification
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: json.message || 'Something went wrong',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                document.getElementById("message").innerHTML = json.message || 'Something went wrong';
            }
        } else {
            // Network error notification
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Network response was not ok',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            document.getElementById("message").innerHTML = 'Network response was not ok';
        }
    } catch (error) {
        // Exception handling
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        document.getElementById("message").innerHTML = 'An unexpected error occurred';
        console.error('Error:', error);
    }
}