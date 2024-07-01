package com.fatec.contact.dtos;

import jakarta.validation.constraints.NotBlank;

public record ContactRequest(

    @NotBlank(message = "Nome não pode ser nulo")
    String name,
    
    @NotBlank(message = "Email não pode ser nulo")
    String email,
    
    String phone,
    
    @NotBlank(message = "Celular não pode ser nulo")
    String cellphone,
    
    String city,
    
    @NotBlank(message = "Sexo não pode ser nulo")
    String gender,
    
    String birthday,

    Boolean isFavorite
) {
    
}
