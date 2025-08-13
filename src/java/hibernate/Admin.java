package hibernate;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "admin")
public class Admin implements Serializable {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "first_name", length = 45)
    private String first_name;

    @Column(name = "last_name", length = 45)
    private String last_name;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 45, nullable = false)
    private String password;

    @Column(name = "created_at", nullable = false)
    private Date created_at;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
