package controller;

import hibernate.Cart;
import hibernate.HibernateUtil;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.Transaction;

@WebServlet(name = "DeleteCartItem", urlPatterns = {"/DeleteCartItem"})
public class DeleteCartItem extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int cartId = Integer.parseInt(request.getParameter("cartId"));

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            Cart cart = (Cart) session.get(Cart.class, cartId);
            if (cart != null) {
                session.delete(cart);
                tx.commit();
                response.getWriter().write("success");
            } else {
                response.getWriter().write("not_found");
            }
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
            response.getWriter().write("error");
        } finally {
            session.close();
        }
    }
}
