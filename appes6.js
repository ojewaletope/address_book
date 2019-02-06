class Person {
    constructor(name, phone_number, email) {
        this.name = name;
        this.phone_number = phone_number;
        this.email = email
    }
}

class UI {
    addContact(person) {
        const contact_list = document.getElementById("contact-list");

        // create table rows element
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${person.name}</td>
      <td>${person.phone_number}</td>
      <td>${person.email}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
        contact_list.appendChild(row);
    }
    // addToLocalStrorage(person) {
    //     let contacts;
    //     if (localStorage.getItem("contacts") === null) {
    //         contacts = [];
    //     } else {
    //         contacts = JSON.parse(localStorage.getItem("contacts"));
    //     }
    //     contacts.push(person);
    //     localStorage.setItem("contacts", JSON.stringify(contacts));
    // }
    // getDataFromLocalStorage() {
    //     let contacts;
    //     if (localStorage.getItem("contacts") === null) {
    //         contacts = [];
    //     } else {
    //         contacts = JSON.parse(localStorage.getItem("contacts"));
    //
    //     }
    //     contacts.forEach(function (contact) {
    //         const contact_list = document.getElementById("contact-list");
    //         // create table rows element
    //         const row = document.createElement("tr");
    //         row.innerHTML = `
    //   <td>${contact.name}</td>
    //   <td>${contact.phone_number}</td>
    //   <td>${contact.email}</td>
    //   <td><a href="#" class="delete">x</a></td>
    // `;
    //         contact_list.appendChild(row);
    //     })
    // }
    clearFields() {
        document.getElementById("name").value = "";
        document.getElementById("phone-number").value = "";
        document.getElementById("email").value = "";
    };
    deleteContact(target_contact) {
        if (target_contact.className === 'delete') {
            target_contact.parentElement.parentElement.remove();
        }
        };
    showMessage(message, className) {
        // create message div
        const message_div = document.createElement("div");
        message_div.className = `alert ${className}`;
        message_div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container"),
            form = document.querySelector("#contact-form");
        container.insertBefore(message_div, form);

        // remove after 3 s
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, 3000);
    }
}

// save contact in local storage
class Store {
    static getContacts() {
        let contacts
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        }  else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts
    }
    static displayContacts() {
        const contacts = Store.getContacts()
        contacts.forEach(contact => {
            const ui = new UI();
            ui.addContact(contact)
        })
    }
    static  saveContact(contact) {
        const contacts = Store.getContacts()
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }

    static  removeContact() {

    }
}
// event listeners
document.getElementById("contact-form").addEventListener("submit", function(e) {
    const name = document.getElementById("name").value,
        phone_number = document.getElementById("phone-number").value,
        email = document.getElementById("email").value;

    // instantiate a person
    const person = new Person(name, phone_number, email);

    // instantiate ui
    const ui = new UI();

    // add book to list
    if (name == "" || phone_number == "" || email == "") {
        ui.showMessage("Please input the details", "error");
    } else {
        ui.addContact(person);
        // show success
        ui.showMessage("Contact added successfully", "success");
        // add to local storage
        Store.saveContact(person);
    }
    // clear fields
    ui.clearFields();

    e.preventDefault();
});
// onload event
document.addEventListener("DOMContentLoaded", Store.displayContacts);

// event listener for deleting a contact
document.getElementById('contact-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteContact(e);
    ui.showMessage('Contact deleted successfully', 'success');
    e.preventDefault()
});