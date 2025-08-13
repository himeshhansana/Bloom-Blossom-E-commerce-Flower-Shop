document.addEventListener('DOMContentLoaded', function () {
    // Load immediately if on analytics tab
    if (document.getElementById('analytics-tab').classList.contains('active')) {
        loadAnalyticsData();
    }

    // Load when tab becomes active
    document.getElementById('analytics-tab').addEventListener('shown.bs.tab', loadAnalyticsData);
});

function loadAnalyticsData() {
    showLoadingState();

    fetch('Analytics')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                updateDashboard(data);
            })
            .catch(error => {
                console.error('Analytics Error:', error);
                showErrorState(error.message);
            });
}

function updateDashboard(data) {
    console.log("Received data:", data); // Debug log

    // Update each card - ensure these selectors match your HTML
    updateCard('total-revenue', formatCurrency(data.totalRevenue));
    updateCard('total-orders', data.totalOrders);
    updateCard('total-users', data.totalUsers);
    updateCard('total-products', data.totalProductsSold);
}

function updateCard(type, value) {
    const card = document.querySelector(`.stats-card[data-type="${type}"]`);
    if (card) {
        const numberElement = card.querySelector('.stats-number');
        if (numberElement) {
            numberElement.textContent = value;
            card.classList.remove('loading', 'error');
        }
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function showLoadingState() {
    document.querySelectorAll('.stats-card').forEach(card => {
        card.classList.add('loading');
        const numberElement = card.querySelector('.stats-number');
        if (numberElement.textContent === 'Error') {
            numberElement.textContent = 'Retrying...';
        } else if (numberElement.textContent !== 'Rs') {
            numberElement.textContent = 'Loading...';
        }
    });
}

function showErrorState(message) {
    document.querySelectorAll('.stats-card').forEach(card => {
        if (!card.querySelector('.stats-number').textContent.match(/^/)) {
            card.classList.add('error');
            card.querySelector('.stats-number').textContent = 'Error';
        }
    });

    // Simple error display
    const errorDisplay = document.getElementById('analytics-error') ||
            document.createElement('div');
    errorDisplay.id = 'analytics-error';
    errorDisplay.className = 'alert alert-danger';
    errorDisplay.textContent = message;
    errorDisplay.style.position = 'fixed';
    errorDisplay.style.bottom = '20px';
    errorDisplay.style.right = '20px';
    errorDisplay.style.zIndex = '1000';

    if (!document.getElementById('analytics-error')) {
        document.body.appendChild(errorDisplay);
        setTimeout(() => errorDisplay.remove(), 5000);
    }
}