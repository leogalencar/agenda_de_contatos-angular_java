package com.fatec.contact.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.contact.dtos.ContactResponse;
import com.fatec.contact.services.ContactService;

@RestController
@RequestMapping("contacts")
public class ContactController {
    
    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<ContactResponse> getContacts() {
        return this.contactService.getContacts();
    }

    @GetMapping("{id}")
    public ContactResponse getContactById(@PathVariable int id) {
        return this.contactService.getContactById(id);
    }
}
