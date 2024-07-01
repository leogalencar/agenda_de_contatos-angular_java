package com.fatec.contact.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.contact.dtos.ContactRequest;
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

    @PostMapping
    public ContactResponse saveContact(@RequestBody ContactRequest contact) {
        return this.contactService.saveContact(contact);
    }

    @DeleteMapping("{id}")
    public void deleteContact(@PathVariable int id) {
        this.contactService.deleteContact(id);
    }

    @PutMapping("{id}")
    public void updateContact(@PathVariable int id, @RequestBody ContactRequest contact) {
        this.contactService.updateContact(id, contact);
    }
}
