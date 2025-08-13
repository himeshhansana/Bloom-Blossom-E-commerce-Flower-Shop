//function printinvoice() {
//    // Get values safely
//    const firstName = document.getElementById("first-name")?.value.trim();
//    const lastName = document.getElementById("last-name")?.value.trim();
//    const city = document.getElementById("city-select")?.value.trim();
//    const address1 = document.getElementById("line-one")?.value.trim();
//    const postalCode = document.getElementById("postal-code")?.value.trim();
//    const mobile = document.getElementById("mobile")?.value.trim();
//
//    const product = document.getElementById("st-product-title")?.innerText.trim();
//    const qty = document.getElementById("st-product-qty")?.innerText.trim();
//    const price = document.getElementById("st-product-price")?.innerText.trim();
//    const subtotal = document.getElementById("st-product-total-amount")?.innerText.trim();
//    const shipping = document.getElementById("st-product-shipping-charges")?.innerText.trim();
//    const total = document.getElementById("st-order-total-amount")?.innerText.trim();
//
//    // Basic validation check
//    if (!firstName || !lastName || !city || !address1 || !postalCode || !mobile) {
//        alert("Please fill in all required customer details before generating the invoice.");
//        return;
//    }
//
//    if (!product || !qty || !price || !subtotal || !shipping || !total) {
//        alert("Product information is incomplete. Cannot generate invoice.");
//        return;
//    }
//
//    const date = new Date().toLocaleDateString();
//
//    const invoiceHTML = `
//        <html>
//        <head>
//            <title>Invoice - Bloom & Blossom</title>
//            <style>
//                body {
//                    font-family: 'Segoe UI', sans-serif;
//                    margin: 0;
//                    padding: 0;
//                    background: #fdf6f9;
//                    color: #333;
//                }
//                .invoice-container {
//                    background: #ffffff;
//                    max-width: 800px;
//                    margin: 30px auto;
//                    padding: 30px;
//                    border-radius: 12px;
//                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//                    position: relative;
//                }
//                .header {
//                    text-align: center;
//                    border-bottom: 2px solid #f8c5db;
//                    padding-bottom: 20px;
//                    margin-bottom: 20px;
//                }
//                .header img {
//                    width: 100px;
//                    margin-bottom: 10px;
//                }
//                .header h1 {
//                    font-size: 28px;
//                    color: #d63384;
//                    margin: 0;
//                }
//                .info, .summary {
//                    font-size: 15px;
//                    line-height: 1.6;
//                    margin-bottom: 20px;
//                }
//                .info strong {
//                    color: #d63384;
//                }
//                table {
//                    width: 100%;
//                    border-collapse: collapse;
//                    margin-top: 10px;
//                }
//                th {
//                    background-color: #f8c5db;
//                    color: #000;
//                    padding: 12px;
//                    text-align: left;
//                    font-size: 16px;
//                }
//                td {
//                    padding: 12px;
//                    border-bottom: 1px solid #eee;
//                    font-size: 15px;
//                }
//                .summary p {
//                    text-align: right;
//                    font-weight: bold;
//                }
//                .footer {
//                    text-align: center;
//                    margin-top: 30px;
//                    font-size: 13px;
//                    color: #888;
//                    border-top: 1px dashed #ccc;
//                    padding-top: 10px;
//                }
//                .floral-bg {
//                    position: absolute;
//                    top: -50px;
//                    right: -50px;
//                    opacity: 0.08;
//                    width: 300px;
//                    transform: rotate(15deg);
//                }
//            </style>
//        </head>
//        <body>
//            <div class="invoice-container">
//                <img class="floral-bg" src="assets/images/invoice.png" alt="Floral Decoration" />
//                <div class="header">
//                     <img src="assets/images/invoicei.png" alt="Bloom & Blossom Logo" style="width: 120px; height: auto;">
//                    <h1>Bloom & Blossom</h1>
//                    <p>Elegant Flower Bouquets Delivered to Your Doorstep</p>
//                </div>
//
//                <div class="info">
//                    <p><strong>Customer Name:</strong> ${firstName} ${lastName}</p>
//                    <p><strong>Mobile:</strong> ${mobile}</p>
//                    <p><strong>Address:</strong> ${address1}, ${city}, ${postalCode}</p>
//                    <p><strong>Date:</strong> ${date}</p>
//                </div>
//
//                <table>
//                    <thead>
//                        <tr>
//                            <th>Product</th>
//                            <th>Qty</th>
//                            <th>Price</th>
//                            <th>Subtotal</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        <tr>
//                            <td>${product}</td>
//                            <td>${qty}</td>
//                            <td>Rs. ${price}</td>
//                            <td>Rs. ${subtotal}</td>
//                        </tr>
//                    </tbody>
//                </table>
//
//                <div class="summary">
//                    <p>Shipping: Rs. ${shipping}</p>
//                    <p>Total Amount: Rs. ${total}</p>
//                </div>
//
//                <div class="footer">
//                    Thank you for shopping with Bloom & Blossom! 🌸<br>
//                    www.bloomandblossom.lk | support@bloomandblossom.lk
//                </div>
//            </div>
//
//            <script>
//                window.onload = function() {
//                    window.print();
//                    setTimeout(() => window.close(), 200);
//                };
//            </script>
//        </body>
//        </html>
//    `;
//
//    const printWindow = window.open('', '_blank', 'width=900,height=700');
//    if (printWindow) {
//        printWindow.document.write(invoiceHTML);
//        printWindow.document.close();
//    } else {
//        alert("Popup blocked! Please allow popups for this site.");
//    }
//}





function printinvoice() {
    // Get values safely using optional chaining and fallback values
    const firstName = document.getElementById("first-name")?.value.trim() || "N/A";
    const lastName = document.getElementById("last-name")?.value.trim() || "N/A";
    const city = document.getElementById("city-select")?.value.trim() || "N/A";
    const address1 = document.getElementById("line-one")?.value.trim() || "N/A";
    const postalCode = document.getElementById("postal-code")?.value.trim() || "00000";
    const mobile = document.getElementById("mobile")?.value.trim() || "N/A";

    const product = document.getElementById("st-product-title")?.innerText.trim() || "Unknown Product";
    const qty = document.getElementById("st-product-qty")?.innerText.trim() || "0";
    const price = document.getElementById("st-product-price")?.innerText.trim() || "0.00";
    const subtotal = document.getElementById("st-product-total-amount")?.innerText.trim() || "0.00";
    const shipping = document.getElementById("st-product-shipping-charges")?.innerText.trim() || "0.00";
    const total = document.getElementById("st-order-total-amount")?.innerText.trim() || "0.00";

    const date = new Date().toLocaleDateString();

    const invoiceHTML = `
        <html>
        <head>
            <title>Invoice - Bloom & Blossom</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: #fdf6f9;
                    color: #333;
                }
                .invoice-container {
                    background: #ffffff;
                    max-width: 800px;
                    margin: 30px auto;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: relative;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #f8c5db;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .header img {
                    width: 100px;
                    margin-bottom: 10px;
                }
                .header h1 {
                    font-size: 28px;
                    color: #d63384;
                    margin: 0;
                }
                .info, .summary {
                    font-size: 15px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .info strong {
                    color: #d63384;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                th {
                    background-color: #f8c5db;
                    color: #000;
                    padding: 12px;
                    text-align: left;
                    font-size: 16px;
                }
                td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                    font-size: 15px;
                }
                .summary p {
                    text-align: right;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 13px;
                    color: #888;
                    border-top: 1px dashed #ccc;
                    padding-top: 10px;
                }
                .floral-bg {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    opacity: 0.08;
                    width: 300px;
                    transform: rotate(15deg);
                }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <img class="floral-bg" src="assets/images/invoice.png" alt="Floral Decoration" />
                <div class="header">
                    <img src="assets/images/invoicei.png" alt="Bloom & Blossom Logo" style="width: 120px; height: auto;">
                    <h1>Bloom & Blossom</h1>
                    <p>Elegant Flower Bouquets Delivered to Your Doorstep</p>
                </div>

                <div class="info">
                    <p><strong>Customer Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Address:</strong> ${address1}, ${city}, ${postalCode}</p>
                    <p><strong>Date:</strong> ${date}</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${product}</td>
                            <td>${qty}</td>
                            <td>Rs. ${price}</td>
                            <td>Rs. ${subtotal}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="summary">
                    <p>Shipping: Rs. ${shipping}</p>
                    <p>Total Amount: Rs. ${total}</p>
                </div>

                <div class="footer">
                    Thank you for shopping with Bloom & Blossom! 🌸<br>
                    www.bloomandblossom.lk | support@bloomandblossom.lk
                </div>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 200);
                };
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
    } else {
        alert("Popup blocked! Please allow popups for this site.");
    }
}
