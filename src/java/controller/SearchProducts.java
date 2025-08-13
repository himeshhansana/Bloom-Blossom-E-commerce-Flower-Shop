package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import hibernate.Color;
import hibernate.Flower_type;
import hibernate.Flowers_category;
import hibernate.Freshness;
import hibernate.HibernateUtil;
import hibernate.Product;
import hibernate.Size;
import hibernate.Status;
import java.io.IOException;
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

@WebServlet(name = "SearchProducts", urlPatterns = {"/SearchProducts"})
public class SearchProducts extends HttpServlet {

    private static final int MAX_RESULT = 6;
    private static final int ACTIVE_ID = 2;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("ok");

        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        JsonObject requestJsonObject = gson.fromJson(request.getReader(), JsonObject.class);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        Criteria c1 = s.createCriteria(Product.class); // get all products for the filter

        if (requestJsonObject.has("flowers_categoryName")) {

            String flowers_categoryName = requestJsonObject.get("flowers_categoryName").getAsString();

            //get flowers_category details
            Criteria c2 = s.createCriteria(Flowers_category.class);
            c2.add(Restrictions.eq("name", flowers_categoryName));
            Flowers_category flowers_category = (Flowers_category) c2.uniqueResult();

            //filter Flower_typeList by using Flower_type details
            Criteria c3 = s.createCriteria(Flower_type.class);
            c3.add(Restrictions.eq("flowers_category", flowers_category));
            List<Flower_type> Flower_typeList = c3.list();

            //filter product by using Flower_typeList
            c1.add(Restrictions.in("flower_type", Flower_typeList));
        }
        //--------flower_type end----

        if (requestJsonObject.has("freshnessName")) {
            String freshnessValue = requestJsonObject.get("freshnessName").getAsString();

            //get quality details 
            Criteria c4 = s.createCriteria(Freshness.class);
            c4.add(Restrictions.eq("value", freshnessValue));
            Freshness freshness = (Freshness) c4.uniqueResult();

            //filter product by using quality
            c1.add(Restrictions.eq("freshness", freshness));
        }
        //-----------Color------------

        if (requestJsonObject.has("colorName")) {
            String colorName = requestJsonObject.get("colorName").getAsString();

            //get color details 
            Criteria c5 = s.createCriteria(Color.class);
            c5.add(Restrictions.eq("value", colorName));
            Color color = (Color) c5.uniqueResult();

            //filter product by using color
            c1.add(Restrictions.eq("color", color));
        }
        //--------color end---------
        //------size---------

        if (requestJsonObject.has("sizeValue")) {
            String sizeValue = requestJsonObject.get("sizeValue").getAsString();

            //get size details 
            Criteria c6 = s.createCriteria(Size.class);
            c6.add(Restrictions.eq("value", sizeValue));
            Size size = (Size) c6.uniqueResult();

            //filter product by using size
            c1.add(Restrictions.eq("size", size));

        }
        //------size end-------

        if (requestJsonObject.has("priceStart") & requestJsonObject.has("priceEnd")) {

            double priceStart = requestJsonObject.get("priceStart").getAsDouble();
            double priceEnd = requestJsonObject.get("priceEnd").getAsDouble();

            c1.add(Restrictions.ge("price", priceStart));
            c1.add(Restrictions.le("price", priceEnd));

        }

        if (requestJsonObject.has("sortValue")) {
            String sortValue = requestJsonObject.get("sortValue").getAsString();

            if (sortValue.equals("Sort by Latest")) {
                c1.addOrder(Order.desc("id"));
            } else if (sortValue.equals("Sort by Oldest")) {
                c1.addOrder(Order.asc("id"));
            } else if (sortValue.equals("Sort by Name")) {
                c1.addOrder(Order.asc("title"));
            } else if (sortValue.equals("Sort by Price")) {
                c1.addOrder(Order.asc("price"));
            }
        }

        responseObject.addProperty("allProductCount", c1.list().size());

        if (requestJsonObject.has("firstResult")) {
            int firstResult = requestJsonObject.get("firstResult").getAsInt();
            c1.setFirstResult(firstResult);
            c1.setMaxResults(SearchProducts.MAX_RESULT);
        }

        //get filtered product list
        Status status = (Status) s.get(Status.class, 2);//get active product 2 =Active
        c1.add(Restrictions.eq("status", status));
        List<Product> productList = c1.list();
        for (Product product : productList) {
            product.setUser(null);

        }

        s.close();
        responseObject.add("productList", gson.toJsonTree(productList));
        responseObject.addProperty("status", true);
        response.setContentType("application/json");
        String toJson = gson.toJson(responseObject);
        response.getWriter().write(toJson);

    }

}
