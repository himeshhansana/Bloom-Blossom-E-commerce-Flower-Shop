package controller;

import hibernate.OrderItems;
import hibernate.Orders;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import com.google.gson.Gson;

@WebServlet(name = "Analytics", urlPatterns = {"/Analytics"})
public class Analytics extends HttpServlet {

    private SessionFactory factory;

    @Override
    public void init() throws ServletException {
        try {
            factory = new Configuration()
                    .configure("hibernate.cfg.xml")
                    .addAnnotatedClass(OrderItems.class)
                    .addAnnotatedClass(Orders.class)
                    .addAnnotatedClass(User.class)
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Failed to create sessionFactory object." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Session session = factory.openSession();
        PrintWriter out = response.getWriter();

        try {
            session.beginTransaction();

            AnalyticsData data = new AnalyticsData();

            // 1. Total Revenue (working)
            Double revenue = (Double) session.createQuery(
                    "SELECT SUM(oi.qty * p.price) FROM OrderItems oi JOIN oi.product p")
                    .uniqueResult();
            data.setTotalRevenue(revenue != null ? revenue : 0.0);

            // 2. Total Orders (fixed)
            Long orders = (Long) session.createQuery("SELECT COUNT(o.id) FROM Orders o").uniqueResult();
            data.setTotalOrders(orders != null ? orders : 0);

            // 3. Total Users (fixed)
            Long users = (Long) session.createQuery("SELECT COUNT(u.id) FROM User u").uniqueResult();
            data.setTotalUsers(users != null ? users : 0);

            // 4. Total Products Sold (fixed)
            Long products = (Long) session.createQuery("SELECT SUM(oi.qty) FROM OrderItems oi").uniqueResult();
            data.setTotalProductsSold(products != null ? products : 0);

            session.getTransaction().commit();

            // Send JSON response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(new Gson().toJson(data));

        } catch (Exception e) {
            if (session.getTransaction() != null) {
                session.getTransaction().rollback();
            }
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"Server error: " + e.getMessage() + "\"}");
            e.printStackTrace();
        } finally {
            session.close();
            out.close();
        }
    }

    // Data transfer object with proper naming
    public static class AnalyticsData {

        private double totalRevenue;
        private long totalOrders;
        private long totalUsers;
        private long totalProductsSold;

        // Getters and setters must match JavaScript property names exactly
        public double getTotalRevenue() {
            return totalRevenue;
        }

        public void setTotalRevenue(double totalRevenue) {
            this.totalRevenue = totalRevenue;
        }

        public long getTotalOrders() {
            return totalOrders;
        }

        public void setTotalOrders(long totalOrders) {
            this.totalOrders = totalOrders;
        }

        public long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(long totalUsers) {
            this.totalUsers = totalUsers;
        }

        public long getTotalProductsSold() {
            return totalProductsSold;
        }

        public void setTotalProductsSold(long totalProductsSold) {
            this.totalProductsSold = totalProductsSold;
        }
    }

    @Override
    public void destroy() {
        if (factory != null) {
            factory.close();
        }
    }
}
