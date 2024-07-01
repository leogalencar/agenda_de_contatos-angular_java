package com.fatec.contact.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.contact.dtos.ContactResponse;
import com.fatec.contact.entities.Contact;
import com.fatec.contact.mappers.ContactMapper;
import com.fatec.contact.repositories.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<ContactResponse> getContacts() {
        List<Contact> contacts = this.contactRepository.findAll();

        return contacts.stream().map(c -> ContactMapper.toDTO(c)).collect(Collectors.toList());
    }
}
