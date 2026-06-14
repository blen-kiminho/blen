package org.zerock.mallapi.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.zerock.mallapi.entity.Item;

public interface ItemService {
    
    String uploadImage(Long itemId, MultipartFile file);

    List<Item> getItemsByCategory(String category);

    Item save(Item item);

}
