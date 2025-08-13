//// Modern Dashboard JavaScript
//class DashboardManager {
//    constructor() {
//        this.currentTab = 'account';
//        this.userData = {};
//        this.init();
//    }
//
//    init() {
//        this.setupEventListeners();
//        this.loadUserData();
//        this.loadDropdownData();
//        this.setupFormValidation();
//        this.setupFileUploads();
//        
//        // Set initial content border for active tab
//        this.updateContentBorder('account');
//    }
//
//    setupEventListeners() {
//        // Tab switching
//        document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
//            tab.addEventListener('shown.bs.tab', (e) => {
//                this.currentTab = e.target.getAttribute('data-bs-target').replace('#', '');
//                this.onTabChange(this.currentTab);
//            });
//        });
//
//        // Form submissions
//        document.addEventListener('click', (e) => {
//            if (e.target.classList.contains('btn-modern') && !e.target.classList.contains('logout-btn')) {
//                this.handleButtonClick(e.target);
//            }
//        });
//
//        // Price formatting
//        const priceInput = document.getElementById('price');
//        if (priceInput) {
//            priceInput.addEventListener('input', this.formatPrice.bind(this));
//        }
//
//        // Quantity validation
//        const qtyInput = document.getElementById('qty');
//        if (qtyInput) {
//            qtyInput.addEventListener('input', this.validateQuantity.bind(this));
//        }
//
//        // Brand selection
//        const brandSelect = document.getElementById('brand');
//        if (brandSelect) {
//            brandSelect.addEventListener('change', this.loadModels.bind(this));
//        }
//
//        // Responsive navigation
//        if (window.innerWidth <= 768) {
//            this.setupMobileNavigation();
//        }
//    }
//
//    setupFileUploads() {
//        document.querySelectorAll('input[type="file"]').forEach(input => {
//            input.addEventListener('change', (e) => {
//                const fileName = e.target.files[0]?.name || 'Choose Image';
//                const label = e.target.nextElementSibling.querySelector('span');
//                if (label) {
//                    label.textContent = fileName;
//                }
//            });
//        });
//    }
//
//    setupMobileNavigation() {
//        document.querySelectorAll('.nav-link').forEach(link => {
//            link.addEventListener('click', () => {
//                setTimeout(() => {
//                    document.querySelector('.dashboard-content').scrollIntoView({
//                        behavior: 'smooth'
//                    });
//                }, 100);
//            });
//        });
//    }
//
//    onTabChange(tabName) {
//        // Add specific logic for each tab
//        switch(tabName) {
//            case 'account':
//                this.loadAccountData();
//                break;
//            case 'add-product':
//                this.loadProductFormData();
//                break;
//            case 'products':
//                this.loadProductList();
//                break;
//            case 'orders':
//                this.loadOrderHistory();
//                break;
//            case 'address':
//                this.loadAddressData();
//                break;
//        }
//        
//        // Update content border color
//        this.updateContentBorder(tabName);
//    }
//
//    updateContentBorder(tabName) {
//        const contentArea = document.querySelector('.dashboard-content');
//        if (contentArea) {
//            // Remove all active classes
//            contentArea.classList.remove('active-account', 'active-add-product', 'active-products', 'active-orders', 'active-address');
//            
//            // Add the appropriate active class
//            contentArea.classList.add(`active-${tabName}`);
//        }
//    }
//
////    handleButtonClick(button) {
////        const buttonText = button.textContent.trim();
////        
////        switch(buttonText) {
////            case 'Save Changes':
////                this.saveChanges();
////                break;
////            case 'Add Product To Listing':
////                this.saveProduct();
////                break;
////            default:
////                this.addLoadingState(button);
////        }
////    }
//
//    addLoadingState(button) {
//        button.disabled = true;
//        const originalText = button.innerHTML;
//        button.innerHTML = '<div class="loading"></div> Processing...';
//        
//        setTimeout(() => {
//            button.disabled = false;
//            button.innerHTML = originalText;
//        }, 2000);
//    }
//
//    showAlert(id, message, type = 'danger') {
//        const alertElement = document.getElementById(id);
//        if (!alertElement) return;
//
//        alertElement.className = `alert-modern alert-${type}`;
//        alertElement.innerHTML = `<i class="fas fa-${this.getAlertIcon(type)}"></i> ${message}`;
//        alertElement.style.display = 'flex';
//        
//        // Auto hide after 5 seconds
//        setTimeout(() => {
//            alertElement.style.display = 'none';
//        }, 5000);
//    }
//
//    getAlertIcon(type) {
//        const icons = {
//            success: 'check-circle',
//            danger: 'exclamation-triangle',
//            warning: 'exclamation-triangle',
//            info: 'info-circle'
//        };
//        return icons[type] || 'info-circle';
//    }
//
//    // Form validation
//    setupFormValidation() {
//        const forms = document.querySelectorAll('form');
//        forms.forEach(form => {
//            form.addEventListener('submit', (e) => {
//                e.preventDefault();
//                this.validateForm(form);
//            });
//        });
//    }
//
//    validateForm(form) {
//        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
//        let isValid = true;
//
//        inputs.forEach(input => {
//            if (!input.value.trim()) {
//                this.showFieldError(input, 'This field is required');
//                isValid = false;
//            } else {
//                this.clearFieldError(input);
//            }
//        });
//
//        return isValid;
//    }
//
//    showFieldError(field, message) {
//        field.classList.add('is-invalid');
//        let errorElement = field.nextElementSibling;
//        
//        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
//            errorElement = document.createElement('div');
//            errorElement.className = 'invalid-feedback';
//            field.parentNode.appendChild(errorElement);
//        }
//        
//        errorElement.textContent = message;
//        errorElement.style.display = 'block';
//    }
//
//    clearFieldError(field) {
//        field.classList.remove('is-invalid');
//        const errorElement = field.nextElementSibling;
//        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
//            errorElement.style.display = 'none';
//        }
//    }
//
//    formatPrice(e) {
//        let value = e.target.value;
//        value = value.replace(/[^0-9.]/g, '');
//        
//        // Ensure only one decimal point
//        const parts = value.split('.');
//        if (parts.length > 2) {
//            value = parts[0] + '.' + parts[1];
//        }
//        
//        e.target.value = value;
//    }
//
//    validateQuantity(e) {
//        if (e.target.value < 1) {
//            e.target.value = 1;
//        }
//    }
//
//    // Backend Integration Functions (Keep your existing backend code)
////    async saveChanges() {
////        const formData = this.getAccountFormData();
////        
////        try {
////            // Replace with your actual backend call
////            console.log('Saving account changes...', formData);
////            
////            // Simulate API call
////            await this.delay(1000);
////            
////            this.showAlert('message', 'Account changes saved successfully!', 'success');
////            
////            // Update user data
////            this.userData = { ...this.userData, ...formData };
////            this.updateUserDisplay();
////            
////        } catch (error) {
////            console.error('Error saving changes:', error);
////            this.showAlert('message', 'Error saving changes. Please try again.', 'danger');
////        }
////    }
//
////    async saveProduct() {
////        const productData = this.getProductFormData();
////        
////        if (!this.validateProductData(productData)) {
////            return;
////        }
////
////        try {
////            console.log('Saving product...', productData);
////            
////            // Simulate API call
////            await this.delay(1500);
////            
////            this.showAlert('productMessage', 'Product added successfully!', 'success');
////            this.resetProductForm();
////            
////        } catch (error) {
////            console.error('Error saving product:', error);
////            this.showAlert('productMessage', 'Error saving product. Please try again.', 'danger');
////        }
////    }
//
////    async loadModels() {
////        const brandId = document.getElementById('brand').value;
////        const modelSelect = document.getElementById('model');
////        
////        if (brandId === '0') {
////            modelSelect.innerHTML = '<option value="0">Select Model</option>';
////            return;
////        }
////
////        try {
////            // Replace with your actual backend call
////            console.log('Loading models for brand:', brandId);
////            
////            // Simulate API call
////            await this.delay(500);
////            
////            const models = await this.fetchModels(brandId);
////            this.populateSelect(modelSelect, models);
////            
////        } catch (error) {
////            console.error('Error loading models:', error);
////            this.showAlert('productMessage', 'Error loading models. Please try again.', 'warning');
////        }
////    }
//
////    signOut() {
////        if (confirm('Are you sure you want to sign out?')) {
////            // Clear user data
////            this.userData = {};
////            localStorage.removeItem('userSession');
////            
////            // Redirect to sign-in page
////            window.location.href = 'sign-in.html';
////        }
////    }
//
//    // Data loading functions
////    async loadUserData() {
////        try {
////            // Replace with your actual backend call
////            console.log('Loading user data...');
////            
////            // Simulate API call
////            await this.delay(500);
////            
////            this.userData = await this.fetchUserData();
////            this.updateUserDisplay();
////            this.populateAccountForm();
////            
////        } catch (error) {
////            console.error('Error loading user data:', error);
////        }
////    }
//
////    async loadDropdownData() {
////        try {
////            console.log('Loading dropdown data...');
////            
////            // Load cities
////            const cities = await this.fetchCities();
////            this.populateSelect(document.getElementById('citySelect'), cities);
////            
////            // Load brands
////            const brands = await this.fetchBrands();
////            this.populateSelect(document.getElementById('brand'), brands);
////            
////            // Load other dropdown data
////            await this.loadProductOptions();
////            
////        } catch (error) {
////            console.error('Error loading dropdown data:', error);
////        }
////    }
////
////    async loadProductOptions() {
////        try {
////            const [storage, colors, conditions] = await Promise.all([
////                this.fetchStorageOptions(),
////                this.fetchColors(),
////                this.fetchConditions()
////            ]);
////            
////            this.populateSelect(document.getElementById('storage'), storage);
////            this.populateSelect(document.getElementById('color'), colors);
////            this.populateSelect(document.getElementById('condition'), conditions);
////            
////        } catch (error) {
////            console.error('Error loading product options:', error);
////        }
////    }
//
////    loadAccountData() {
////        console.log('Loading account data...');
////        this.populateAccountForm();
////    }
////
////    loadProductFormData() {
////        console.log('Loading product form data...');
////        // Reset form if needed
////    }
////
////    async loadProductList() {
////        console.log('Loading product list...');
////        try {
////            const products = await this.fetchUserProducts();
////            this.displayProductList(products);
////        } catch (error) {
////            console.error('Error loading products:', error);
////        }
////    }
////
////    async loadOrderHistory() {
////        console.log('Loading order history...');
////        try {
////            const orders = await this.fetchUserOrders();
////            this.displayOrderHistory(orders);
////        } catch (error) {
////            console.error('Error loading orders:', error);
////        }
////    }
////
////    loadAddressData() {
////        console.log('Loading address data...');
////        this.populateAddressDisplay();
////    }
//
//    // Helper functions
////    getAccountFormData() {
////        return {
////            firstName: document.getElementById('firstName').value,
////            lastName: document.getElementById('lastName').value,
////            lineOne: document.getElementById('lineOne').value,
////            lineTwo: document.getElementById('lineTwo').value,
////            postalCode: document.getElementById('postalCode').value,
////            city: document.getElementById('citySelect').value,
////            currentPassword: document.getElementById('currentPassword').value,
////            newPassword: document.getElementById('newPassword').value,
////            confirmPassword: document.getElementById('confirmPassword').value
////        };
////    }
//
////    getProductFormData() {
////        return {
////            brand: document.getElementById('brand').value,
////            model: document.getElementById('model').value,
////            title: document.getElementById('title').value,
////            description: document.getElementById('description').value,
////            storage: document.getElementById('storage').value,
////            color: document.getElementById('color').value,
////            condition: document.getElementById('condition').value,
////            price: document.getElementById('price').value,
////            quantity: document.getElementById('qty').value,
////            images: [
////                document.getElementById('img1').files[0],
////                document.getElementById('img2').files[0],
////                document.getElementById('img3').files[0]
////            ].filter(file => file)
////        };
////    }
//
////    validateProductData(data) {
////        const requiredFields = ['brand', 'model', 'title', 'description', 'storage', 'color', 'condition', 'price', 'quantity'];
////        
////        for (const field of requiredFields) {
////            if (!data[field] || data[field] === '0') {
////                this.showAlert('productMessage', `Please fill in the ${field} field.`, 'warning');
////                return false;
////            }
////        }
////        
////        if (data.images.length === 0) {
////            this.showAlert('productMessage', 'Please upload at least one image.', 'warning');
////            return false;
////        }
////        
////        return true;
////    }
//
////    populateSelect(selectElement, options) {
////        selectElement.innerHTML = '<option value="0">Select</option>';
////        options.forEach(option => {
////            const optionElement = document.createElement('option');
////            optionElement.value = option.id || option.value || option;
////            optionElement.textContent = option.name || option.text || option;
////            selectElement.appendChild(optionElement);
////        });
////    }
//
////    populateAccountForm() {
////        if (!this.userData) return;
////        
////        const fields = ['firstName', 'lastName', 'lineOne', 'lineTwo', 'postalCode'];
////        fields.forEach(field => {
////            const element = document.getElementById(field);
////            if (element && this.userData[field]) {
////                element.value = this.userData[field];
////            }
////        });
////        
////        if (this.userData.city) {
////            document.getElementById('citySelect').value = this.userData.city;
////        }
////    }
//
////    populateAddressDisplay() {
////        if (!this.userData) return;
////        
////        const name = `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim();
////        document.getElementById('addName').textContent = `Name: ${name || 'Not specified'}`;
////        document.getElementById('addEmail').textContent = `Email: ${this.userData.email || 'Not specified'}`;
////        document.getElementById('contact').textContent = `Phone: ${this.userData.phone || 'Not specified'}`;
////    }
//
////    updateUserDisplay() {
////        if (!this.userData) return;
////        
////        const name = `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim();
////        document.getElementById('username').textContent = `Hello ${name || 'User'}`;
////        
////        if (this.userData.joinDate) {
////            document.getElementById('since').textContent = `Smart Trade Member Since ${this.userData.joinDate}`;
////        }
////    }
//
////    resetProductForm() {
////        const form = document.querySelector('#add-product form');
////        if (form) {
////            form.reset();
////        }
////        
////        // Reset file upload labels
////        document.querySelectorAll('.file-upload-label span').forEach(span => {
////            span.textContent = span.textContent.replace(/Choose Image \d+/, 'Choose Image');
////        });
////    }
//
////    displayProductList(products) {
////        // Implementation for displaying products in the table
////        console.log('Displaying products:', products);
////    }
////
////    displayOrderHistory(orders) {
////        // Implementation for displaying orders in the table
////        console.log('Displaying orders:', orders);
////    }
//
//    // Mock API functions (replace with your actual backend calls)
////    async fetchUserData() {
////        // Simulate API call
////        await this.delay(500);
////        return {
////            firstName: 'John',
////            lastName: 'Doe',
////            email: 'john.doe@example.com',
////            phone: '+1234567890',
////            joinDate: 'Sep 2024',
////            lineOne: '123 Main St',
////            lineTwo: 'Apt 4B',
////            postalCode: '12345',
////            city: 'New York'
////        };
////    }
////
////    async fetchCities() {
////        await this.delay(300);
////        return [
////            { id: 'ny', name: 'New York' },
////            { id: 'la', name: 'Los Angeles' },
////            { id: 'chicago', name: 'Chicago' },
////            { id: 'houston', name: 'Houston' },
////            { id: 'phoenix', name: 'Phoenix' }
////        ];
////    }
////
////    async fetchBrands() {
////        await this.delay(300);
////        return [
////            { id: '1', name: 'Apple' },
////            { id: '2', name: 'Samsung' },
////            { id: '3', name: 'Google' },
////            { id: '4', name: 'OnePlus' }
////        ];
////    }
////
////    async fetchModels(brandId) {
////        await this.delay(300);
////        const modelsByBrand = {
////            '1': [
////                { id: '1', name: 'iPhone 15 Pro' },
////                { id: '2', name: 'iPhone 15' },
////                { id: '3', name: 'iPhone 14 Pro' }
////            ],
////            '2': [
////                { id: '4', name: 'Galaxy S24' },
////                { id: '5', name: 'Galaxy Note 20' },
////                { id: '6', name: 'Galaxy A54' }
////            ]
////        };
////        return modelsByBrand[brandId] || [];
////    }
////
////    async fetchStorageOptions() {
////        await this.delay(200);
////        return [
////            { id: '64', name: '64GB' },
////            { id: '128', name: '128GB' },
////            { id: '256', name: '256GB' },
////            { id: '512', name: '512GB' }
////        ];
////    }
////
////    async fetchColors() {
////        await this.delay(200);
////        return [
////            { id: 'black', name: 'Black' },
////            { id: 'white', name: 'White' },
////            { id: 'blue', name: 'Blue' },
////            { id: 'red', name: 'Red' }
////        ];
////    }
////
////    async fetchConditions() {
////        await this.delay(200);
////        return [
////            { id: 'new', name: 'Brand New' },
////            { id: 'like-new', name: 'Like New' },
////            { id: 'good', name: 'Good' },
////            { id: 'fair', name: 'Fair' }
////        ];
////    }
//
////    async fetchUserProducts() {
////        await this.delay(500);
////        return [
////            {
////                id: '1234',
////                title: 'Apple iPhone 15 Pro',
////                price: 'Rs 95,000',
////                quantity: 1,
////                date: 'September 02, 2024'
////            }
////        ];
////    }
//
////    async fetchUserOrders() {
////        await this.delay(500);
////        return [
////            {
////                id: '1234',
////                products: 'Apple iPhone 15 Pro, Samsung Galaxy Note 20',
////                date: 'September 02, 2024',
////                status: 'Delivered',
////                total: 'Rs 1,20,000'
////            }
////        ];
////    }
//
//    delay(ms) {
//        return new Promise(resolve => setTimeout(resolve, ms));
//    }
//}
//
//// Initialize dashboard when DOM is loaded
////document.addEventListener('DOMContentLoaded', () => {
////    window.dashboard = new DashboardManager();
////});
//
//// Global functions for backward compatibility
////function saveChanges() {
////    if (window.dashboard) {
////        window.dashboard.saveChanges();
////    }
////}
////
////function saveProuct() {
////    if (window.dashboard) {
////        window.dashboard.saveProduct();
////    }
////}
////
////function loadModels() {
////    if (window.dashboard) {
////        window.dashboard.loadModels();
////    }
////}
////
////function signOut() {
////    if (window.dashboard) {
////        window.dashboard.signOut();
////    }
////}
