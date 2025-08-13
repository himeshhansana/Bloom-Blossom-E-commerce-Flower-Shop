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
import hibernate.User;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.Util;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;

@MultipartConfig
@WebServlet(name = "SaveProduct", urlPatterns = {"/SaveProduct"})
public class SaveProduct extends HttpServlet {

    private static final int PENDING_STATUS_ID = 1;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String flowers_categoryId = request.getParameter("flowers_categoryId");
        String flower_typeId = request.getParameter("flower_typeId");
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String sizeId = request.getParameter("sizeId");
        String colorId = request.getParameter("colorId");
        String freshnessId = request.getParameter("freshnessId");
        String price = request.getParameter("price");
        String qty = request.getParameter("qty");

        //imge uploading     
        Part part1 = request.getPart("image1");
        Part part2 = request.getPart("image2");
        Part part3 = request.getPart("image3");

        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        SessionFactory sf = HibernateUtil.getSessionFactory();
        Session s = sf.openSession();

        //validation
        if (request.getSession().getAttribute("user") == null) {
            responseObject.addProperty("message", "Please sign in!");

        } else if (!Util.isInteger(flowers_categoryId)) {
            responseObject.addProperty("message", "Invalid flowers category!");
        } else if (Integer.parseInt(flowers_categoryId) == 0) {
            responseObject.addProperty("message", "Please select a flowers category!");

        } else if (!Util.isInteger(flower_typeId)) {
            responseObject.addProperty("message", "Invalid Flower Type!");
        } else if (Integer.parseInt(flower_typeId) == 0) {
            responseObject.addProperty("message", "Please select a flower type!");

        } else if (title.isEmpty()) {
            responseObject.addProperty("message", "Product title can not be empty");
        } else if (description.isEmpty()) {
            responseObject.addProperty("message", "Product description can not be empty");

        } else if (!Util.isInteger(sizeId)) {
            responseObject.addProperty("message", "Invalid size");
        } else if (Integer.parseInt(sizeId) == 0) {
            responseObject.addProperty("message", "Please select a valid size");

        } else if (!Util.isInteger(colorId)) {
            responseObject.addProperty("message", "Invalid color");
        } else if (Integer.parseInt(colorId) == 0) {
            responseObject.addProperty("message", "Please select a valid color");

        } else if (!Util.isInteger(freshnessId)) {
            responseObject.addProperty("message", "Invalid freshness");
        } else if (Integer.parseInt(freshnessId) == 0) {
            responseObject.addProperty("message", "Please select a valid freshness");

        } else if (!Util.isDouble(price)) {
            responseObject.addProperty("message", "Invalid price");
        } else if (Double.parseDouble(price) <= 0) {
            responseObject.addProperty("message", "Price must be greater than 0");

        } else if (!Util.isInteger(qty)) {
            responseObject.addProperty("message", "Invalid quantity");
        } else if (Integer.parseInt(qty) <= 0) {
            responseObject.addProperty("message", "Quantity must be greater than 0");

        } else if (part1.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image1 is required!");

        } else if (part2.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image2 is required!");

        } else if (part3.getSubmittedFileName() == null) {
            responseObject.addProperty("message", "Product image3 is required!");

        } else {

            Flowers_category flowers_category = (Flowers_category) s.get(Flowers_category.class, Integer.valueOf(flowers_categoryId));
            if (flowers_category == null) {
                responseObject.addProperty("message", "Please select a valid Flowers category Name!");
            } else {
                Flower_type flower_type = (Flower_type) s.get(Flower_type.class, Integer.parseInt(flower_typeId));
                if (flower_type == null) {
                    responseObject.addProperty("message", "Please select a valid Flower type Name!");
                } else {
                    if (flower_type.getFlowers_category().getId() != flowers_category.getId()) {
                        responseObject.addProperty("message", "Please select a suitable Flower Type for the selected Flowers category!");
                    } else {
                        Size size = (Size) s.get(Size.class, Integer.valueOf(sizeId));
                        if (size == null) {
                            responseObject.addProperty("message", "Please select a valid Size!");
                        } else {
                            Color color = (Color) s.get(Color.class, Integer.valueOf(colorId));
                            if (color == null) {
                                responseObject.addProperty("message", "Please select a valid Color!");
                            } else {
                                Freshness freshness = (Freshness) s.get(Freshness.class, Integer.valueOf(freshnessId));
                                if (freshness == null) {
                                    responseObject.addProperty("message", "Please select a valid freshness!");
                                } else {

                                    Product p = new Product();
                                    p.setFlower_type(flower_type);
                                    p.setTitle(title);
                                    p.setDescription(description);
                                    p.setSize(size);
                                    p.setColor(color);
                                    p.setFreshness(freshness);
                                    p.setPrice(Double.parseDouble(price));
                                    p.setQty(Integer.parseInt(qty));

                                    Status status = (Status) s.get(Status.class, SaveProduct.PENDING_STATUS_ID);
                                    p.setStatus(status);
                                    User user = (User) request.getSession().getAttribute("user");

                                    Criteria c1 = s.createCriteria(User.class);
                                    c1.add(Restrictions.eq("email", user.getEmail()));
                                    User u1 = (User) c1.uniqueResult();
                                    p.setUser(u1);
                                    p.setCreated_at(new Date());

                                    // methanin karanne save karaddi save vena id eka api varible ekakata alla gann eka 
                                    int id = (int) s.save(p);
                                    s.beginTransaction().commit();
                                    s.close();

                                    //build/web eka athule hdenne
                                    //full path of the web pages folder
                                    String appPath = getServletContext().getRealPath("");

                                    // methanin karanne normal web eka athule hadana eka
                                    String newPath = appPath.replace("build" + File.separator + "web", "web" + File.separator + "product-images");
                                    // onima ekkat gela pennm // dekk danna

                                    File productFolder = new File(newPath, String.valueOf(id));
                                    productFolder.mkdir();

                                    File file1 = new File(productFolder, "image1.png");
                                    Files.copy(part1.getInputStream(), file1.toPath(), StandardCopyOption.REPLACE_EXISTING);

                                    File file2 = new File(productFolder, "image2.png");
                                    Files.copy(part2.getInputStream(), file2.toPath(), StandardCopyOption.REPLACE_EXISTING);

                                    File file3 = new File(productFolder, "image3.png");
                                    Files.copy(part3.getInputStream(), file3.toPath(), StandardCopyOption.REPLACE_EXISTING);

                                    // imge uploading
                                    responseObject.addProperty("status", true);
                                }
                            }
                        }
                    }
                }
            }
        }
        //validation

        //send response
        Gson gson = new Gson();
        response.setContentType("application/java");
        response.getWriter().write(gson.toJson(responseObject));
        //send response

    }

}
