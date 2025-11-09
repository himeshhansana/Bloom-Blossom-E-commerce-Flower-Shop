# Bloom & Blossom - Premium Flower Delivery

A comprehensive e-commerce web application for premium flower delivery services, built with Java servlets, Hibernate ORM, and MySQL database.

## 🌸 Project Overview

Bloom & Blossom is a full-featured online flower shop that provides customers with a seamless shopping experience for premium flower arrangements. The platform includes both customer-facing features and administrative tools for managing the business.

## ✨ Features

### Customer Features
- **Product Catalog**: Browse through various flower arrangements and bouquets
- **User Authentication**: Sign up, sign in, and account verification
- **Shopping Cart**: Add/remove items, update quantities
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Complete order placement with payment integration
- **Order Tracking**: View order history and status
- **Product Search**: Find specific flowers and arrangements
- **User Account Management**: Manage personal information and preferences

### Admin Features
- **Admin Dashboard**: Comprehensive management interface
- **Product Management**: Add, edit, and manage flower inventory
- **Order Management**: Process and track customer orders
- **Analytics**: Business insights and reporting
- **User Management**: Manage customer accounts

## 🏗️ Technology Stack

- **Backend**: Java Servlets
- **ORM**: Hibernate
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript
- **Build Tool**: Apache Ant
- **Server**: GlassFish
- **Architecture**: MVC Pattern

## 📁 Project Structure

```
Flowers/
├── build.xml                    # Ant build configuration
├── src/
│   ├── java/
│   │   ├── controller/         # Servlet controllers
│   │   ├── hibernate/          # Entity classes
│   │   ├── model/              # Business logic models
│   │   └── hibernate.cfg.xml   # Hibernate configuration
│   └── conf/
│       └── MANIFEST.MF
├── web/                        # Web resources
│   ├── *.html                  # HTML pages
│   ├── assets/
│   │   ├── css/               # Stylesheets
│   │   ├── js/                # JavaScript files
│   │   └── images/            # Static images
│   ├── product-images/        # Product gallery
│   └── WEB-INF/
│       ├── glassfish-web.xml
│       ├── classes/
│       └── lib/
├── lib/                        # External libraries
└── nbproject/                  # NetBeans project files
```

## 🛠️ Setup Instructions

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- MySQL Server
- GlassFish Server
- Apache Ant (for building)
- NetBeans IDE (recommended)

### Database Setup
1. Create a MySQL database named `flowers`
2. Update the database connection details in `src/java/hibernate.cfg.xml`:
   ```xml
   <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/flowers?useSSL=false</property>
   <property name="hibernate.connection.username">your_username</property>
   <property name="hibernate.connection.password">your_password</property>
   ```
3. Run the application to auto-generate tables (Hibernate will handle schema creation)

### Build and Deployment
1. Clone the repository to your local machine
2. Open the project in NetBeans IDE
3. Clean and build the project:
   ```bash
   ant clean
   ant build
   ```
4. Deploy to GlassFish server
5. Access the application at `http://localhost:8080/Flowers`

## 🗃️ Database Schema

The application uses Hibernate entities for the following main tables:
- **Users**: Customer information and authentication
- **Products**: Flower arrangements and inventory
- **Orders**: Customer orders and order items
- **Cart**: Shopping cart management
- **Wishlist**: Customer wishlists
- **Admin**: Administrative users
- **Categories**: Product categorization
- **Addresses**: Customer shipping addresses
- **Cities**: Location data

## 🚀 Key Servlets

| Servlet | Functionality |
|---------|---------------|
| `SignUp.java` | User registration |
| `SignIn.java` | User authentication |
| `LoadHomeData.java` | Home page data loading |
| `LoadProductData.java` | Product catalog |
| `AddToCart.java` | Shopping cart management |
| `Checkout.java` | Order processing |
| `AdminSignIn.java` | Admin authentication |
| `ProductInventory.java` | Inventory management |
| `Analytics.java` | Business analytics |

## 🔧 Configuration

### Hibernate Configuration
The `hibernate.cfg.xml` file contains:
- Database connection settings
- Hibernate properties
- Entity mappings

### Web Configuration
- `web.xml`: Servlet mappings and configuration
- `glassfish-web.xml`: GlassFish-specific settings

## 📱 Pages

- **index.html**: Home page
- **sign-in.html**: User login
- **sign-up.html**: User registration
- **single-product.html**: Product details
- **cart.html**: Shopping cart
- **checkout.html**: Order checkout
- **admin-dashboard.html**: Administrative interface
- **my-account.html**: User account management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please contact the development team or open an issue in the repository.

---

**Bloom & Blossom** - Bringing beauty to your doorstep, one flower at a time. 🌹