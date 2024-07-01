package com.fatec.contact.dtos;

public record ContactRequest(
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
