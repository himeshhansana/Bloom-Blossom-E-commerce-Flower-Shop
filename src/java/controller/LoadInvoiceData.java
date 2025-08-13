//package controller;
//
//import com.google.gson.JsonObject;
//import hibernate.HibernateUtil;
//import hibernate.OrderItems;
//import hibernate.Orders;
//import java.io.IOException;
//import java.io.PrintWriter;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.hibernate.Session;
//import org.hibernate.criterion.Restrictions;
//
//@WebServlet(name = "LoadInvoiceData", urlPatterns = {"/LoadInvoiceData"})
//public class LoadInvoiceData extends HttpServlet {
//
//    @Override
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        int orderId = Integer.parseInt(request.getParameter("orderId"));
//
//        Session session = HibernateUtil.getSessionFactory().openSession();
//        Orders order = (Orders) session.get(Orders.class, orderId);
//
//        JsonObject json = new JsonObject();
//
//        json.addProperty("firstName", order.getAddress().getFirstName());
//        json.addProperty("lastName", order.getAddress().getLastName());
//        json.addProperty("mobile", order.getAddress().getMobile());
//        json.addProperty("city", order.getAddress().getCity().getName());
//        json.addProperty("address", order.getAddress().getLineOne());
//        json.addProperty("postalCode", order.getAddress().getPostalCode());
//
//        // assuming one product for now
//        OrderItems item = (OrderItems) session.createCriteria(OrderItems.class)
//                .add(Restrictions.eq("orders", order)).list().get(0);
//
//        json.addProperty("product", item.getProduct().getTitle());
//        json.addProperty("qty", item.getQty());
//        json.addProperty("price", item.getProduct().getPrice());
//        double subtotal = item.getQty() * item.getProduct().getPrice();
//        json.addProperty("subtotal", subtotal);
//        json.addProperty("shipping", item.getDeliveryType().getPrice());
//        json.addProperty("total", subtotal + item.getDeliveryType().getPrice());
//
//        response.setContentType("application/json");
//        response.getWriter().write(json.toString());
//    }
//}
