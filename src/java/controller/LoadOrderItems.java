package controller;

import hibernate.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import com.google.gson.Gson;

@WebServlet(name = "LoadOrderItems", urlPatterns = {"/LoadOrderItems"})
public class LoadOrderItems extends HttpServlet {

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
        Session session = factory.openSession();
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        try {
            session.beginTransaction();

            Criteria criteria = session.createCriteria(OrderItems.class)
                    .createAlias("orders", "o")
                    .addOrder(Order.desc("o.created_at"))
                    .setMaxResults(20); // Limit to 20 most recent order items

            List<OrderItems> orderItems = criteria.list();

            for (OrderItems item : orderItems) {
                OrderItemDTO dto = new OrderItemDTO();
                dto.id = item.getId();
                dto.productId = item.getProduct() != null ? item.getProduct().getId() : 0;
                dto.productName = item.getProduct() != null ? item.getProduct().getTitle() : "N/A";
                dto.orderId = item.getOrders() != null ? item.getOrders().getId() : 0;
                dto.quantity = item.getQty();
                dto.status = item.getOrderStatus() != null ? item.getOrderStatus().getValue() : "Unknown";
                dto.deliveryType = item.getDeliveryType() != null ? item.getDeliveryType().getName() : "Unknown";
                dto.rating = item.getRating();

                orderItemDTOs.add(dto);
            }

            session.getTransaction().commit();

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            out.print(new Gson().toJson(orderItemDTOs));
            out.flush();

        } catch (Exception e) {
            if (session.getTransaction() != null) {
                session.getTransaction().rollback();
            }
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error retrieving order items");
        } finally {
            session.close();
        }
    }

    // DTO class for JSON response
    private static class OrderItemDTO {

        int id;
        int productId;
        String productName;
        int orderId;
        int quantity;
        String status;
        String deliveryType;
        int rating;
    }

    @Override
    public void destroy() {
        if (factory != null) {
            factory.close();
        }
    }
}
