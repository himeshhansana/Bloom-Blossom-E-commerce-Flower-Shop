package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Admin;
import hibernate.HibernateUtil;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "AdminSignIn", urlPatterns = {"/AdminSignIn"})
public class AdminSignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("AdminSignIn servlet called");
        
        Gson gson = new Gson();
        JsonObject signIn = gson.fromJson(request.getReader(), JsonObject.class);
        System.out.println("Received data: " + signIn);

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        String email = signIn.get("email").getAsString().trim();
        String password = signIn.get("password").getAsString().trim();
        System.out.println("Attempting login with email: " + email);

        if (email.isEmpty()) {
            responseObject.addProperty("message", "Please enter email!");
        } else if (!Util.isEmailValid(email)) {
            responseObject.addProperty("message", "Please enter valid email!");
        } else if (password.isEmpty()) {
            responseObject.addProperty("message", "Please enter password!");
        } else {
            SessionFactory sf = HibernateUtil.getSessionFactory();
            Session s = sf.openSession();

            try {
                Criteria c = s.createCriteria(Admin.class);
                c.add(Restrictions.eq("email", email.toLowerCase())); // Case insensitive match
                
                Admin admin = (Admin) c.uniqueResult();
                
                if (admin == null) {
                    System.out.println("No admin found with email: " + email);
                    responseObject.addProperty("message", "Invalid credentials!");
                } else {
                    System.out.println("Admin found: " + admin.getEmail());
                    
                    // Password comparison (exact match)
                    if (admin.getPassword().equals(password)) {
                        responseObject.addProperty("status", true);
                        HttpSession session = request.getSession();
                        session.setAttribute("admin", admin);
                        responseObject.addProperty("message", "1");
                        System.out.println("Login successful for admin: " + email);
                    } else {
                        System.out.println("Password mismatch");
                        responseObject.addProperty("message", "Invalid credentials!");
                    }
                }
            } catch (Exception e) {
                System.err.println("Error during admin login: " + e.getMessage());
                e.printStackTrace();
                responseObject.addProperty("message", "System error. Please try again.");
            } finally {
                s.close();
            }
        }
        
        System.out.println("Returning response: " + responseObject);
        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
}