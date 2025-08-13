package controller;

import hibernate.HibernateUtil;
import hibernate.User;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;
import org.hibernate.Transaction;

@WebServlet(name = "ClearCart", urlPatterns = {"/ClearCart"})
public class ClearCart extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        User user = (User) request.getSession().getAttribute("user");

        if (user != null) { // Clear database cart
            Session session = HibernateUtil.getSessionFactory().openSession();
            Transaction tx = null;

            try {
                tx = session.beginTransaction();
                session.createQuery("DELETE FROM Cart WHERE user = :user")
                        .setParameter("user", user)
                        .executeUpdate();
                tx.commit();
                response.getWriter().write("success");
            } catch (Exception e) {
                if (tx != null) {
                    tx.rollback();
                }
                e.printStackTrace();
                response.getWriter().write("error");
            } finally {
                session.close();
            }
        } else { // Clear session cart
            request.getSession().removeAttribute("sessionCart");
            response.getWriter().write("success");
        }
    }
}
