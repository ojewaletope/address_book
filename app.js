// Book  constructor
function Person(name, phone_number, email) {
  this.name = name;
  this.phone_number = phone_number;
  this.email = email;
}

// UI constructor
function UI() {}

// add book to list
UI.prototype.addContacts = function(person) {
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
};

// clear inputs
UI.prototype.clearInputs = function() {
  document.getElementById("name").value = "";
  document.getElementById("phone-number").value = "";
  document.getElementById("email").value = "";
};

// add to local storage
UI.prototype.addToLocalStorage = function(person) {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));
  }
  contacts.push(person);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};
// get from local storage;
UI.prototype.getDataFromLocalStorage = function() {
  let contacts;
  if (localStorage.getItem("contacts") === null) {
    contacts = [];
  } else {
    contacts = JSON.parse(localStorage.getItem("contacts"));

  }
contacts.forEach(function (contact) {
    const contact_list = document.getElementById("contact-list");
    // create table rows element
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone_number}</td>
      <td>${contact.email}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
    contact_list.appendChild(row);
})
};

// show message
UI.prototype.showMessage = function(message, className) {
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
};
UI.prototype.deleteContact = function(target_contact) {
  if (target_contact.className === 'delete') {
    target_contact.parentElement.parentElement.remove();
  }
};

// event listeners
document.getElementById("contact-form").addEventListener("submit", function(e) {
  const name = document.getElementById("name").value,
    phone_number = document.getElementById("phone-number").value,
    email = document.getElementById("email").value;

  // instantiate a book
  const person = new Person(name, phone_number, email);

  // instantiate ui
  const ui = new UI();

  // add book to list
  if (name == "" || phone_number == "" || email == "") {
    ui.showMessage("Please input the details", "error");
  } else {
    ui.addContacts(person);
    // show success
    ui.showMessage("Contact added successfully", "success");
    // add to local storage
    ui.addToLocalStorage(person);
  }
  // clear fields
  ui.clearInputs();

  e.preventDefault();
});
// onload event
document.addEventListener("DOMContentLoaded", function() {
  const ui = new UI();
  ui.getDataFromLocalStorage();
});

// event listener for deleting a contact
document.getElementById('contact-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteContact(e);
  ui.showMessage('Contact deleted successfully', 'success');
    e.preventDefault()
});