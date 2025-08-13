package controller;

import hibernate.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.Criteria;
import com.google.gson.Gson;

@WebServlet(name = "ProductInventory", urlPatterns = {"/ProductInventory"})
public class ProductInventory extends HttpServlet {

    private SessionFactory factory;

    @Override
    public void init() throws ServletException {
        try {
            factory = new Configuration()
                    .configure("hibernate.cfg.xml")
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Failed to create sessionFactory object." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            if ("stats".equals(action)) {
                getProductStats(response);
            } else if ("list".equals(action)) {
                getProductList(response);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid action parameter");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        }
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Product ID is required");
            return;
        }

        int productId = Integer.parseInt(idParam);
        Session session = factory.openSession();
        Map<String, Object> result = new HashMap<>();

        try {
            session.beginTransaction();
            Product product = (Product) session.get(Product.class, productId);
            if (product != null) {
                session.delete(product);
                session.getTransaction().commit();
                result.put("success", true);
                result.put("message", "Product deleted successfully");
            } else {
                result.put("success", false);
                result.put("message", "Product not found");
            }
        } catch (Exception e) {
            if (session.getTransaction() != null) {
                session.getTransaction().rollback();
            }
            result.put("success", false);
            result.put("message", "Error deleting product: " + e.getMessage());
        } finally {
            session.close();
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new Gson().toJson(result));
    }

    private void getProductStats(HttpServletResponse response) throws IOException {
        Session session = factory.openSession();
        Map<String, Integer> stats = new HashMap<>();

        try {
            // Total products
            Long total = (Long) session.createQuery("SELECT COUNT(*) FROM Product").uniqueResult();
            stats.put("totalProducts", total != null ? total.intValue() : 0);

            // In stock (quantity >= 10)
            Long inStock = (Long) session.createQuery(
                    "SELECT COUNT(*) FROM Product WHERE qty >= 10")
                    .uniqueResult();
            stats.put("inStock", inStock != null ? inStock.intValue() : 0);

            // Low stock (quantity between 1 and 9)
            Long lowStock = (Long) session.createQuery(
                    "SELECT COUNT(*) FROM Product WHERE qty BETWEEN 1 AND 9")
                    .uniqueResult();
            stats.put("lowStock", lowStock != null ? lowStock.intValue() : 0);

            // Out of stock (quantity = 0)
            Long outOfStock = (Long) session.createQuery(
                    "SELECT COUNT(*) FROM Product WHERE qty = 0")
                    .uniqueResult();
            stats.put("outOfStock", outOfStock != null ? outOfStock.intValue() : 0);

            response.getWriter().write(new Gson().toJson(stats));
        } finally {
            session.close();
        }
    }

    private void getProductList(HttpServletResponse response) throws IOException {
        Session session = factory.openSession();
        try {
            Criteria criteria = session.createCriteria(Product.class)
                    .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

            List<Product> products = criteria.list();
            response.getWriter().write(new Gson().toJson(products));
        } finally {
            session.close();
        }
    }

    @Override
    public void destroy() {
        if (factory != null) {
            factory.close();
        }
    }
}
