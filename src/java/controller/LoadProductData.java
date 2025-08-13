package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.City;
import hibernate.Color;
import hibernate.Flower_type;
import hibernate.Flowers_category;
import hibernate.Freshness;
import hibernate.HibernateUtil;
import hibernate.Size;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;

@WebServlet(name = "LoadProductData", urlPatterns = {"/LoadProductData"})
public class LoadProductData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);
        Session s = HibernateUtil.getSessionFactory().openSession();

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

        Gson gson = new Gson();

        responseObject.addProperty("status", true);

        responseObject.add("flowers_categoryList", gson.toJsonTree(flowers_categoryList));
        responseObject.add("flower_typeList", gson.toJsonTree(flower_typeList));
        responseObject.add("colorList", gson.toJsonTree(colorList));
        responseObject.add("freshnessList", gson.toJsonTree(freshnessList));
        responseObject.add("sizeList", gson.toJsonTree(sizeList));

        response.setContentType("application/java");
        response.getWriter().write(gson.toJson(responseObject));

    }

}
