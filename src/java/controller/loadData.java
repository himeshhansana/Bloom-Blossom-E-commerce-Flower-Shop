package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.City;
import hibernate.Color;
import hibernate.Flower_type;
import hibernate.Flowers_category;
import hibernate.Freshness;
import hibernate.HibernateUtil;
import hibernate.Product;
import hibernate.Size;
import hibernate.Status;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

@WebServlet(name = "LoadProducts", urlPatterns = {"/loadData"})
public class loadData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        //get categpry
        Criteria c1 = s.createCriteria(Flowers_category.class);
        List<City> flowers_categoryList = c1.list();

        //get types
        Criteria c2 = s.createCriteria(Flower_type.class);
        List<Flower_type> flower_typeList = c2.list();

        //get color
        Criteria c3 = s.createCriteria(Color.class);
        List<Color> colorList = c3.list();

        //get Freshness
        Criteria c4 = s.createCriteria(Freshness.class);
        List<Freshness> freshnessList = c4.list();

        //get size
        Criteria c5 = s.createCriteria(Size.class);
        List<Size> sizeList = c5.list();

        //load-product-data
        Status status = (Status) s.get(Status.class, 2);
        Criteria c6 = s.createCriteria(Product.class);
        c6.addOrder(Order.desc("id"));
        c6.add(Restrictions.eq("status", status));
        responseObject.addProperty("allProductCount", c6.list().size());

        c6.setFirstResult(0);
        c6.setMaxResults(6);

        List<Product> productList = c6.list();
        for (Product product : productList) {
            product.setUser(null);
        }

        //load-product-data
        Gson gson = new Gson();

        responseObject.addProperty("status", true);

        responseObject.add("flowers_categoryList", gson.toJsonTree(flowers_categoryList));
        responseObject.add("flower_typeList", gson.toJsonTree(flower_typeList));
        responseObject.add("colorList", gson.toJsonTree(colorList));
        responseObject.add("freshnessList", gson.toJsonTree(freshnessList));
        responseObject.add("sizeList", gson.toJsonTree(sizeList));

        responseObject.add("productList", gson.toJsonTree(productList));
        responseObject.addProperty("status", true);

        response.setContentType("application/java");
        response.getWriter().write(gson.toJson(responseObject));
        s.close();

    }

}
