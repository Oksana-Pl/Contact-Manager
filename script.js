
let contactsList = [];
document.getElementById("myButton").addEventListener("click", function () {
    addContact();
});

function addContact() { //creates object
    let firstName = document.getElementById("first-name").value; 
    let contactSurname = document.getElementById("surname").value;
    let contactEmail = document.getElementById("email").value;
    let phoneNumber = document.getElementById("telephone").value;

    let contact = { 
        id: Date.now(), // create id for contact
        name: firstName, 
        surname: contactSurname, 
        email: contactEmail, 
        phone: phoneNumber 
    };

    contactsList.push(contact);
    // console.log(contacts);
    saveToLocalStorage();    //add to local storage
    createTable();
    createCards();     //for cards in mobile
    
    let lastRow = document.querySelector("#tableBody tr:last-child");  //animation of the last row
    lastRow.style.animation = "slideInLeft 0.85s ease-in-out";
    
    lastRow.addEventListener("animationend", function() {
        lastRow.style.animation = "";  // clear animation
    });

    let lastCard = document.querySelector("#cardsContainer > div:last-child");  //card animation
    lastCard.style.animation = "slideInLeft 0.85s ease-in-out";
    
    lastCard.addEventListener("animationend", function() {
        lastCard.style.animation = "";  // clear animation
    });
}

function createTable() {
    
        let tableBody = document.getElementById("tableBody"); 
        tableBody.innerHTML = ""; 
    
        contactsList.forEach(function(contactRow) {
            let tableRow = document.createElement("tr");
    
            let cell1 = document.createElement("td");
            cell1.textContent = contactRow.name;
            tableRow.appendChild(cell1);
    
            let cell2 = document.createElement("td");
            cell2.textContent = contactRow.surname;
            tableRow.appendChild(cell2);
    
            let cell3 = document.createElement("td");
            cell3.textContent = contactRow.email;
            cell3.classList.add("email-cell");
            tableRow.appendChild(cell3);
    
            let cell4 = document.createElement("td");
            cell4.textContent = contactRow.phone;
            tableRow.appendChild(cell4);
    
            let cell5 = document.createElement("td");  // create Delete button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.backgroundColor = "red";
            deleteButton.style.color = "white";
            deleteButton.style.margin = "0";
    
            deleteButton.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this contact?")) {
                    deleteContact(contactRow.id);
                }
            });
    
            cell5.appendChild(deleteButton);
            tableRow.appendChild(cell5);
    
            tableBody.appendChild(tableRow);
        }); 
        console.log(contactsList);
    }


    function createCards() {
        let cardsContainer = document.getElementById("cardsContainer");
        cardsContainer.innerHTML = "";
    
        contactsList.forEach(function(contactCard) {
            let card = document.createElement("div");                                          
             
            card.style.border = "1px solid #ccc";
            card.style.borderRadius = "6px";
            card.style.padding = "15px";
           
    
            let title = document.createElement("h3");
            title.textContent = contactCard.name + " " + contactCard.surname;
            card.appendChild(title);
    
            let email = document.createElement("p");
            email.textContent = "Email: " + contactCard.email;
            card.appendChild(email);
    
            let phone = document.createElement("p");
            phone.textContent = "Phone: " + contactCard.phone;
            card.appendChild(phone);
    
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.style.color = "white";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.margin = "0px";
            deleteBtn.style.float = "right";
    
            deleteBtn.addEventListener("click", function () {
                if (confirm("Are you sure you want to delete this contact?")) {
                    deleteContact(contactCard.id);
                }
            });
    
            card.appendChild(deleteBtn);
            cardsContainer.appendChild(card);
        });
    }

    function deleteContact(contactId) {
        for (let i = 0; i < contactsList.length; i++) { 
            let currentContact = contactsList[i]; 
    
            if (currentContact.id === contactId) { 
                contactsList.splice(i, 1);
                saveToLocalStorage(); //save new array to the local storage after deleting 
                break;
            }
        }
        createTable();
        createCards();     //for cards in mobile
    }

    //sort

    document.getElementById("sortByName").addEventListener("click", function() {
        contactsList.sort((a, b) => a.name.localeCompare(b.name));
        createTable();
        createCards();
    });
    
    document.getElementById("sortBySurname").addEventListener("click", function() {
        contactsList.sort((a, b) => a.surname.localeCompare(b.surname)); 
        createTable();
        createCards();
    });
    
    document.getElementById("sortByEmail").addEventListener("click", function() {
        contactsList.sort((a, b) => a.email.localeCompare(b.email));
        createTable();
        createCards();
    });
    
    document.getElementById("sortByTelephone").addEventListener("click", function() {
        contactsList.sort((a, b) => a.phone.localeCompare(b.phone));
        createTable();
        createCards();
    });



    let sortSelect = document.getElementById("sortSelect");

    sortSelect.addEventListener("change", function () {
        if (sortSelect.value === "sortByName") {
            contactsList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortSelect.value === "sortBySurname") {
            contactsList.sort((a, b) => a.surname.localeCompare(b.surname));
        } else if (sortSelect.value === "sortByEmail") {
            contactsList.sort((a, b) => a.email.localeCompare(b.email));
        } else if (sortSelect.value === "sortByTelephone") {
            contactsList.sort((a, b) => a.phone.localeCompare(b.phone));
        }
        createTable();
        createCards();
    });



//local storage

function saveToLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(contactsList));
}


function loadDataFromLocalStorage() {
    let data = localStorage.getItem("contacts");
    if (data) {
        contactsList = JSON.parse(data);
        createTable();
        createCards();
    }
}

loadDataFromLocalStorage();

//servise worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./serviceWorker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}





    
       
