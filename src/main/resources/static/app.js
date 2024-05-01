// Array to store purchased tickets
let personliste = [];
// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Funksjon for å validere telefonnr
function validatePhoneNumber(tlfnr) {
    // Accepts numbers with optional spaces, hyphens, or parentheses
    const phoneRegex = /^\d{1,4}[-\s]?(\d{1,4}[-\s]?){0,3}\d{1,10}$/;
    return phoneRegex.test(tlfnr);
}

// Function triggered when the "Kjøp billett" button is clicked
function kjop() {
    // Clear previous error messages
    document.getElementById("err0").innerHTML = "";
    document.getElementById("err1").innerHTML = "";
    document.getElementById("err2").innerHTML = "";
    document.getElementById("err3").innerHTML = "";
    document.getElementById("err4").innerHTML = "";
    document.getElementById("err5").innerHTML = "";



    let ut = "";
    // Create a ticket object from the user input
    let billett = {
        film: document.getElementById("velg film her").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("navn").value,
        etternavn: document.getElementById("navn1").value,
        telefonnr: document.getElementById("tlnr").value,
        epost: document.getElementById("email").value,
    }




    // Display a table header





    //
    if (billett.film === "" || billett.antall === "" || billett.fornavn === "" ||
        billett.etternavn === "" || billett.telefonnr === "" || billett.epost === "") {



        //
        if (billett.film === "") {
            document.getElementById("err0").innerHTML = "Velg en film";
        }
        if (billett.antall === "") {
            document.getElementById("err1").innerHTML = "Skriv noe inn i antall";
        }
        if (billett.fornavn === "") {
            document.getElementById("err2").innerHTML = "Skriv noe inn i fornavnet";
        }
        if (billett.etternavn === "") {
            document.getElementById("err3").innerHTML = "Skriv noe inn i etternavnet";
        }
        if (billett.telefonnr === "") {
            document.getElementById("err4").innerHTML = "Skriv noe inn i telefonnr";
        }
        if (billett.epost === "") {
            document.getElementById("err5").innerHTML = "Skriv noe inn i epost";
        }

    } else {
        if (!validateEmail(billett.epost)) {
            document.getElementById("err4").innerHTML = "Skriv inn en gyldig e-postadresse";
            return;
        }



        //
        if (!validatePhoneNumber(billett.telefonnr)) {
            console.error("Ugyldig telefonnummer:", billett.telefonnr);
            document.getElementById("err5").innerHTML = "Skriv inn et gyldig telefonnummer";
            return;
        }

        //
        personliste.push(billett);





        // Clear input fields after successful purchase
        document.getElementById("err0").value = "";
        document.getElementById("antall").value = "";
        document.getElementById("navn").value = "";
        document.getElementById("navn1").value = "";
        document.getElementById("tlnr").value = "";
        document.getElementById("email").value = "";
        console.log(billett);
      /*  $.ajax({
            url:"/lagre",
            type:'GET',
            contentType:'application/json',
            data:JSON.stringify(billett),
            success: function (){
                console.log(billett);
                hentAlle();
            }

        }); */
        $.post("/lagre", billett, function (){
            console.log(billett);
            hentAlle();
        });
    }
}
function hentAlle() {
    $.get("/hentAlle", function (data){
        console.log(data);
        henteData(data);
    });
}


function henteData(alleBilletter){
    console.log(alleBilletter);
  let  ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn" +
        "</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" + "</tr>";
    for (let p of alleBilletter) {
        console.log(p.film);
        ut += "<tr>";
        ut += "<td>" + p.film + "</td><td>" + p.antall + "</td><td>" + p.fornavn + "</td><td>" + p.etternavn + "</td><td>" + p.telefonnr + "</td><td>" + p.epost + "</td>"
        ut += "</tr>";
    }
    ut += "</table>"
    document.getElementById("ut").innerHTML = ut;
    }

// Function triggered when the "Slett alle billettene" button is clicked
function nullstil() {
    $.get("/slettAlle", function (){
        hentAlle();
    });
}
