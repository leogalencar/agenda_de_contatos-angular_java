package com.fatec.contact.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.contact.dtos.ContactRequest;
import com.fatec.contact.dtos.ContactResponse;
import com.fatec.contact.entities.Contact;
import com.fatec.contact.mappers.ContactMapper;
import com.fatec.contact.repositories.ContactRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<ContactResponse> getContacts() {
        List<Contact> contacts = this.contactRepository.findAll();

        return contacts.stream().map(c -> ContactMapper.toDTO(c)).collect(Collectors.toList());
    }

    public ContactResponse getContactById(int id) {
        Contact contact = this.contactRepository.findById(id).orElseThrow(
            () -> new EntityNotFoundException("Contato não cadastrado")
        );

        return ContactMapper.toDTO(contact);
    }

    public ContactResponse saveContact(ContactRequest request) {
        Contact contact = ContactMapper.toEntity(request);

        return ContactMapper.toDTO(this.contactRepository.save(contact));
    }

    public void deleteContact(int id) {
        if (this.contactRepository.existsById(id)) {
            this.contactRepository.deleteById(id);
        }
        else {
            throw new EntityNotFoundException("Contato não cadastrado");
        }
    }

    public void updateContact(int id, ContactRequest request) {
        try {
            Contact aux = this.contactRepository.getReferenceById(id);

            aux.setName(request.name());
            aux.setEmail(request.email());
            aux.setPhone(request.phone());
            aux.setCellphone(request.cellphone());
            aux.setCity(request.city());
            aux.setGender(request.gender());
            aux.setBirthday(request.birthday());
            aux.setIsFavorite(request.isFavorite());

            this.contactRepository.save(aux);
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException("Contato não cadastrado");
        }
    }
}
