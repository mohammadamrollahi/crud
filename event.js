renderTable();

function edit(id) {
  let contactList = JSON.parse(localStorage.getItem("contactList"));
  contact = contactList.find((item) => item.id == id);
  show_form();
  $("#id_id").val(contact.id);
  $("#id_name").val(contact.name);
  $("#id_last_name").val(contact.lastName);
  $("#id_phone").val(contact.phone);
  $("#id_email").val(contact.email);
  $("#id_address").val(contact.address);
  $("#id_birthday").val(contact.birthday);
  $("#id_details").val(contact.details);
}

function remove_contact(id) {
  let contactList = JSON.parse(localStorage.getItem("contactList"));
  contactList = contactList.filter((item) => item.id != id);
  localStorage.setItem("contactList", JSON.stringify(contactList));
  renderTable();
}

function renderTable() {
  const contactList = JSON.parse(localStorage.getItem("contactList"));
  if (!contactList) {
    localStorage.setItem("contactList", JSON.stringify([]));
    return;
  }
  const tbody2 = $("tbody");
  if (tbody2.length > 0) {
    tbody2[0].remove();
  }

  const table = $("#contact_table");

  const tbody = $("<tbody></tbody>");
  contactList.map((contact) => {
    const tr = document.createElement("TR");
    tr.innerHTML = `<td>${contact.id}</td><td>${contact.name}</td><td>${contact.lastName}</td>
    <td>${contact.phone}</td><td>${contact.email}</td><td>${contact.address}</td>
    <td>${contact.birthday}</td><td>${contact.details}</td>
    <td> <button onclick="delete_contact(${contact.id})" class="btn btn-danger"> <i class='fa fa-trash'></i></button>
    <button onclick="edit(${contact.id})" class="btn btn-primary"> <i class='fa fa-edit'></i></button></td>`;
    tbody.append(tr);
  });
  table.append(tbody);
}

function show_form() {
  const el = document.getElementById('form')
  el.classList.add("show");
}

function hide_form() {
  const el = $("#form");
  el.removeClass("show");
}
$("#contact_form")
  .on("submit", (event) => {
    event.preventDefault();
    let contactList = JSON.parse(localStorage.getItem("contactList"));
    const new_contact_date = new FormData(event.target);
    let new_contact = {};
    for (item of new_contact_date.entries()) {
      new_contact[item[0]] = item[1];
    }
    const contact = contactList.find((item) => item.id == new_contact.id);
    if (contact) {
      contactList = contactList.map((item) =>
        item.id == new_contact.id ? new_contact : item
      );
    } else {
      contactList.push(new_contact);
    }

    localStorage.setItem("contactList", JSON.stringify(contactList));
    hide_form();
    renderTable();
    event.target.reset();
  });

function delete_contact(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      remove_contact(id);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}