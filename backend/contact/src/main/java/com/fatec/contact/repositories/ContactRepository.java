package com.fatec.contact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.contact.entities.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    
}
