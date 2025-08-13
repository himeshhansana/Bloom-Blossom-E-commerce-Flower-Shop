document.addEventListener('DOMContentLoaded', function () {
    loadProductStats();
    loadProducts();
});

function loadProductStats() {
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

    fetch(contextPath + '/ProductInventory?action=stats')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(stats => {
                document.getElementById('totalProducts').textContent = stats.totalProducts;
                document.getElementById('inStock').textContent = stats.inStock;
                document.getElementById('lowStock').textContent = stats.lowStock;
                document.getElementById('outOfStock').textContent = stats.outOfStock;
            })
            .catch(error => {
                console.error('Error loading product stats:', error);
            });
}

function loadProducts() {
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));
    const tableBody = document.querySelector('#productsTable tbody');

    // Show loading state
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="ms-2">Loading products...</span>
            </td>
        </tr>
    `;

    fetch(contextPath + '/ProductInventory?action=list')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(products => {
                renderProductsTable(products);
            })
            .catch(error => {
                console.error('Error loading products:', error);
                tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center text-danger">
                        Error loading products: ${error.message}
                    </td>
                </tr>
            `;
            });
}

function renderProductsTable(products) {
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = '';

    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">No products found</td>
            </tr>
        `;
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.flowerType || 'N/A'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <span class="badge bg-${getStockStatusClass(product.qty)}">
                    ${product.qty}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getStockStatusClass(quantity) {
    if (quantity <= 0)
        return 'danger';      // Out of Stock
    if (quantity <= 10)
        return 'warning';    // Low Stock
    return 'success';                        // In Stock
}

function editProduct(productId) {
    // Implement edit functionality
    console.log('Edit product:', productId);
    // window.location.href = `editProduct.html?id=${productId}`;
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

        fetch(contextPath + '/ProductInventory?action=delete&id=' + productId, {
            method: 'DELETE'
        })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    if (result.success) {
                        alert('Product deleted successfully');
                        loadProductStats();
                        loadProducts();
                    } else {
                        alert('Failed to delete product: ' + result.message);
                    }
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                    alert('Error deleting product: ' + error.message);
                });
    }
}