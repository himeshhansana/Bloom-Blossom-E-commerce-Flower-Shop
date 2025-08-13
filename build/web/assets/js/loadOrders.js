document.addEventListener('DOMContentLoaded', function () {
    loadRecentOrderItems();
});

function loadRecentOrderItems() {
    const contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

    fetch(contextPath + '/LoadOrderItems')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(orderItems => {
                const tbody = document.querySelector('#orders table tbody');
                if (!tbody) {
                    console.error('Table body not found');
                    return;
                }

                tbody.innerHTML = '';

                if (!orderItems || orderItems.length === 0) {
                    tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center">No order items found</td>
                    </tr>
                `;
                    return;
                }

                orderItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.productId} - ${item.productName}</td>
                    <td>${item.orderId}</td>
                    <td>${item.quantity}</td>
                    <td><span class="badge bg-${getStatusBadgeClass(item.status)}">${item.status}</span></td>
                    <td>${item.deliveryType}</td>
                    <td>${renderRatingStars(item.rating)}</td>
                `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error loading order items:', error);
                const tbody = document.querySelector('#orders table tbody');
                if (tbody) {
                    tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-danger">
                            Error loading order items: ${error.message}
                        </td>
                    </tr>
                `;
                }
            });
}

function getStatusBadgeClass(status) {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'warning';
        case 'shipped':
            return 'info';
        case 'delivered':
            return 'success';
        case 'cancelled':
            return 'danger';
        default:
            return 'secondary';
    }
}

function renderRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}