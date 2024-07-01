package com.fatec.contact.mappers;

import com.fatec.contact.dtos.ContactRequest;
import com.fatec.contact.dtos.ContactResponse;
import com.fatec.contact.entities.Contact;

public class ContactMapper {
    public static Contact toEntity(ContactRequest request) {
        Contact contact = new Contact();

        contact.setName(request.name());
        contact.setEmail(request.email());
        contact.setPhone(request.phone());
        contact.setCellphone(request.cellphone());
        contact.setCity(request.city());
        contact.setGender(request.gender());
        contact.setBirthday(request.birthday());
        contact.setIsFavorite(request.isFavorite());

        return contact;
    }

    public static ContactResponse toDTO(Contact contact) {
        return new ContactResponse(
            contact.getId(),
            contact.getName(),
            contact.getEmail(),
            contact.getPhone(),
            contact.getCellphone(),
            contact.getCity(),
            contact.getGender(),
            contact.getBirthday(),
            contact.getIsFavorite()
        );
    }
}
