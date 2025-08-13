package hibernate;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "flower_type")
public class Flower_type implements Serializable {

    public Flower_type() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Flowers_category getFlowers_category() {
        return flowers_category;
    }

    public void setFlowers_category(Flowers_category flowers_category) {
        this.flowers_category = flowers_category;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "flowers_category_id")
    private Flowers_category flowers_category;

}
