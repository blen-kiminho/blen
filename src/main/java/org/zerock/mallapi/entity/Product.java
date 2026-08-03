package org.zerock.mallapi.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product", schema = "public")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String image;

    @OneToMany(
        mappedBy = "product",
        cascade = CascadeType.ALL
    )
    @JsonManagedReference
    private List<ProductOption> options;
}