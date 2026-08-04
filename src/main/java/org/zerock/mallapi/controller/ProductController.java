package org.zerock.mallapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.zerock.mallapi.entity.Product;
import org.zerock.mallapi.entity.ProductOption;
import org.zerock.mallapi.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping(
        value = "/api/products",
        produces = "application/json;charset=UTF-8"
)
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    // 전체 상품 조회
    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    // 상품 1개 조회
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(
            @PathVariable Long id
    ) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // 카테고리별 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(
            @PathVariable String category
    ) {
        return ResponseEntity.ok(
                productRepository.findByCategoryIgnoreCase(category)
        );
    }

    // 상품 등록
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product
    ) {
        product.setId(null);

        if (product.getOptions() != null) {
            for (ProductOption option : product.getOptions()) {
                option.setOno(null);
                option.setProduct(product);
            }
        }

        Product savedProduct =
                productRepository.save(product);

        return ResponseEntity.ok(savedProduct);
    }

    // 상품 수정
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product request
    ) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(request.getName());
                    product.setPrice(request.getPrice());
                    product.setDescription(
                            request.getDescription()
                    );
                    product.setImage(request.getImage());
                    product.setCategory(
                            request.getCategory()
                    );

                    product.getOptions().clear();

                    if (request.getOptions() != null) {
                        for (
                            ProductOption option
                            : request.getOptions()
                        ) {
                            option.setOno(null);
                            option.setProduct(product);
                            product.getOptions().add(option);
                        }
                    }

                    Product savedProduct =
                            productRepository.save(product);

                    return ResponseEntity.ok(savedProduct);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id
    ) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}