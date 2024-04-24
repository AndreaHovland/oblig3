package com.example.oblig3webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Billettkontroller {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(@RequestBody Billett billett) {
        rep.lagreBillett(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {return rep.hentAlleBilletter();}

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlleBilletter();
    }
}


