package com.fatec.contact.dtos;

public record ContactResponse(
    int id,
    String name,
    String email,
    String phone,
    String cellphone,
    String city,
    String gender,
    String birthday,
    Boolean isFavorite
) {
    
}
