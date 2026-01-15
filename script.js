// import crypto from "crypto"

function Book(id, name, status) {
  if (!new.target) {
    throw Error('You must use "new" keyword to declare a "Book" variable.');
  }
  this.id = id;
  this.name = name;
  this.status = status;
  this.display = function () {
    console.log(
      "ID: ",
      this.id,
      ", NAME: ",
      this.name,
      ", STATUS: ",
      this.status
    );
  };
}

function Library() {
  this.library = [];
  if (!new.target) {
    throw Error('You must use "new" keyword to declare a "Book" variable.');
  }

  this.addBook = function (name) {
    this.library.push(new Book(crypto.randomUUID(), name));
    return true;
  };
  this.searchByID = function (id) {
    for (let book in this.library) {
      if (this.library[book].id == id) {
        return this.library[book];
      }
    }
    return null;
  };
  this.searchByName = function (name) {
    let lst = []
    for (let book in this.library) {
      if (this.library[book].name.toLowerCase().startsWith(name.toLowerCase())) {
        lst.push(this.library[book]);
      }
    }
    return lst;
  };
  this.viewBook = function (id) {
    for (let book in this.library) {
      if (this.library[book].id == id) {
        return true;
      }
    }
    return false;
  };
  this.removeBook = function (txt) {
    for (let book in this.library) {
      if (this.library[book].id == txt || this.library[book].name == txt) {
        this.library.splice(book, 1);
        return true;
      }
    }
    return false;
  };
  this.isPresent = function (id) {
    for (let book in this.library) {
      if (this.library[book].id == id) {
        return true;
      }
    }
    return false;
  };
  this.display = function () {
    for (let book in this.library) {
      this.library[book].display();
    }
  };
}

let lib = new Library();

const add_field = document.querySelector("#add_field");
const add_button = document.querySelector("#add_button");
const get_field = document.querySelector("#get_field");
const get_button = document.querySelector("#get_button");
const remove_field = document.querySelector("#remove_field");
const remove_button = document.querySelector("#remove_button");
const display_button = document.querySelector("#display_button");
const clear_button = document.querySelector("#clear_button");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

function appendToDOM(id, name, stat) {
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let but = document.createElement("button");
    let tr = document.createElement("tr");
  td1.textContent = id;
  td2.textContent = name;
  if (stat == "not found") {
    td3.textContent = "not found";
  } else if (stat) {
    td3.textContent = "read";
  } else {
    td3.textContent = "unread";
  }
  td1.style = "border: 2px solid black; padding: 0px 5px;";
  td2.style = "border: 2px solid black; padding: 0px 5px;";
  td3.style = "border: 2px solid black; padding: 0px 5px;";
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.style = "height: 2vh; border: 2px solid black;";
  tbody.append(tr);
}
add_button.addEventListener("click", () => {
  let text = add_field.value;
  if (text != "") {
    lib.addBook(text);
    add_field.value = "";
    console.log("Book: ", text, " added!");
  }
});
display_button.addEventListener("click", () => {
  tbody.textContent = "";
  for (let i in lib.library) {
    appendToDOM(lib.library[i].id, lib.library[i].name, lib.library[i].status);
  }
});
clear_button.addEventListener("click", () => {
  tbody.textContent = "";
});
get_button.addEventListener("click", () => {
  tbody.textContent = "";
  text = get_field.value;
  get_field.value = null;
  let by_id = lib.searchByID(text);
  let by_name = lib.searchByName(text);
  if (by_id) {
    appendToDOM(by_id.id, by_id.name, by_id.status);
  } else if (by_name) {
    for(let i in by_name)
    {
      appendToDOM(by_name[i].id, by_name[i].name, by_name[i].status);
    }
  } else {
    appendToDOM("not found", "not found", "not found");
  }
});
remove_button.addEventListener("click", () => {
  let txt = remove_field.value;
  remove_field.value = null;
  if (txt != "") {
    lib.removeBook(txt);
  }
});
