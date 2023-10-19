Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const Harry = new Book("Signet 1984", "George Orwell", 272, false);
const Barry = new Book("Anchor The Stand", "Stephen King", 1200, false);
const Jarry = new Book("Clockwork Orange", "Anthony Burgess", 240, true);

let myLibrary = [Harry, Barry, Jarry];
console.log("library:", myLibrary);

(function library() {
  openModal();
  closeModal();
  addBookToLibrary();
  displayExistBook();
  displayNewBook();
})();

function openModal() {
  const modal = document.getElementById("book-modal");
  const showButton = document.getElementById("show-modal");

  showButton.addEventListener("click", () => modal.showModal());
}

function closeModal() {
  const modal = document.getElementById("book-modal");
  const closeBtn = document.getElementById("close-btn");

  closeBtn.addEventListener("click", () => modal.close());
  window.addEventListener("click", (event) => {
    if (event.target !== modal) {
      return;
    }

    modal.close();
  });
}

function displayExistBook() {
  const bookCollection = document.querySelector(".book-collection");

  for (let book of myLibrary) {
    bookCard(book, bookCollection);

    const hr = document.createElement("hr");
    bookCollection.appendChild(hr);
  }
}

function displayNewBook() {
  const form = document.querySelector("form");
  const bookCollection = document.querySelector(".book-collection");

  form.addEventListener("submit", function () {
    const book = myLibrary[myLibrary.length - 1];
    bookCard(book, bookCollection);

    const hr = document.createElement("hr");
    bookCollection.appendChild(hr);
  });
}

function removeCardBtn(container) {
  const removeBtn = document.createElement("button");

  removeBtn.classList.add("btn", "rounded", "card-btn");
  removeBtn.textContent = "-";
  removeBtn.setAttribute("aria-label", "remove book");

  removeBtn.addEventListener("click", function (event) {
    const section = event.target.closest("section");
    const bookId = section.dataset.id;

    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    section.nextElementSibling.remove(); // to remove hr
    section.remove();
    console.log(myLibrary);
  });

  container.appendChild(removeBtn);
}

function toggleReadState(book, container) {
  const toggleRead = document.createElement("input");
  toggleRead.ariaLabel = "book was read?";
  toggleRead.name = "toggle read";
  toggleRead.type = "checkbox";
  toggleRead.checked = book.read;

  toggleRead.addEventListener("click", function (event) {
    const section = event.target.closest("section");
    const bookId = section.dataset.id;

    const li = section.querySelector(`li[data-content="read"]`);
    myLibrary.find((book) => book.id === bookId).read = toggleRead.checked;
    li.textContent = "read: " + toggleRead.checked;
    console.log(myLibrary);
  });

  container.appendChild(toggleRead);
}

function bookCard(book, container) {
  const section = document.createElement("section");
  section.classList.add("book-card");
  section.dataset.id = book.id;

  cardHeader(book, section);
  cardBody(book, section);
  cardFooter(book, section);

  container.appendChild(section);
}

function cardFooter(book, container) {
  const div = document.createElement("div");
  div.classList.add("card-footer");

  removeCardBtn(div);
  toggleReadState(book, div);

  container.appendChild(div);
}

function cardHeader(book, container) {
  const div = document.createElement("div");
  div.classList.add("card-header");

  const span = document.createElement("span");
  span.textContent = "###";
  span.classList.add("bold");

  const h2 = document.createElement("h2");
  h2.textContent = book.title;

  div.appendChild(span);
  div.appendChild(h2);

  container.appendChild(div);
}

function cardBody(book, container) {
  const div = document.createElement("div");
  div.classList.add("card-body");

  const hrFirst = document.createElement("hr");
  const hrSecond = document.createElement("hr");

  const ul = document.createElement("ul");

  let tempBook = new Book();

  for (const key in tempBook) {
    if (key === "info" || key === "id" || key === "title") continue;

    const li = document.createElement("li");
    li.textContent = `${key}: ${book[key]}`;
    li.dataset.content = key;
    ul.appendChild(li);
  }

  tempBook = null;

  div.appendChild(hrFirst);
  div.appendChild(ul);
  div.appendChild(hrSecond);
  container.appendChild(div);
}

function addBookToLibrary() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function () {
    let tempBook = new Book();

    const args = Object.keys(tempBook)
      .filter((key) => key !== "id")
      .map((key) => {
        if (key === "read") {
          return document.getElementById(key).checked;
        }

        return document.getElementById(key).value;
      });

    myLibrary.push(new Book(...args));
    tempBook = null;
    console.log(myLibrary);
  });
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
  this.id = Math.random().toString(36).substring(2);
}
