package com.fatec.contact.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fatec.contact.dtos.ContactRequest;
import com.fatec.contact.dtos.ContactResponse;
import com.fatec.contact.services.ContactService;

@RestController
@RequestMapping("contacts")
public class ContactController {
    
    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getContacts() {
        return ResponseEntity.ok(this.contactService.getContacts());
    }

    @GetMapping("{id}")
    public ResponseEntity<ContactResponse> getContactById(@PathVariable int id) {
        return ResponseEntity.ok(this.contactService.getContactById(id));
    }

    @PostMapping
    public ResponseEntity<ContactResponse> saveContact(@RequestBody ContactRequest contact) {
        ContactResponse newContact = this.contactService.saveContact(contact);

        URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(newContact.id())
                        .toUri();

        return ResponseEntity.created(location).body(newContact);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable int id) {
        this.contactService.deleteContact(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> updateContact(@PathVariable int id, @RequestBody ContactRequest contact) {
        this.contactService.updateContact(id, contact);

        return ResponseEntity.ok().build();
    }
}
