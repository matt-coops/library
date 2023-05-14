"use strict";

let myLibrary = [];

const containerBooks = document.querySelector("#book-container");
const overlayForm = document.querySelector("#form");
const btnNewBook = document.querySelector("#new-book-btn");
const btnOverlaySubmit = document.querySelector("#submit-form");
const btnOverlayClose = document.querySelector("#close-form");
const fieldTitle = document.querySelector("#title");
const fieldAuthor = document.querySelector("#author");
const fieldPages = document.querySelector("#pages");
const checkboxRead = document.querySelector("#read");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read === true ? "has been read" : "not read yet"
    }`;
  };
}

function resetForm() {
  fieldTitle.value = "";
  fieldAuthor.value = "";
  fieldPages.value = "";
  checkboxRead.checked = false;
}

function addBookToLibrary() {
  containerBooks.innerHTML = "";
  for (const [index, book] of myLibrary.entries()) {
    const html = `
  <div class="book" data-index="${index}">
  <div class="delete-book">X</div>
  <span class="book-title">"${book.title}"</span><br />
  <span class="book-author">by ${book.author}</span><br />
  <span class="book-pages">${book.pages} pages</span><br />
  <div class="completed">
    <span class="book-read">Completed: </span>
    <input type="checkbox" class="book-read-checkbox" ${
      book.read ? "checked" : ""
    }>
  </div>
</div>
`;

    containerBooks.insertAdjacentHTML("beforeend", html);
  }
}

btnNewBook.addEventListener("click", function (e) {
  overlayForm.classList.remove("hidden");
});

btnOverlaySubmit.addEventListener("click", function () {
  myLibrary.push(
    new Book(
      fieldTitle.value,
      fieldAuthor.value,
      fieldPages.value,
      checkboxRead.checked
    )
  );
  resetForm();
  addBookToLibrary();
});

btnOverlayClose.addEventListener("click", function () {
  closeForm();
});

const closeForm = function () {
  resetForm();
  overlayForm.classList.add("hidden");
};

containerBooks.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("delete-book") &&
    !e.target.classList.contains("book-read-checkbox")
  )
    return;

  const index = e.target.closest(".book").dataset.index;
  if (e.target.classList.contains("delete-book")) {
    myLibrary.splice(index, 1);
    addBookToLibrary();
  }
  if (e.target.classList.contains("book-read-checkbox")) {
    myLibrary[index].read === true
      ? (myLibrary[index].read = false)
      : (myLibrary[index].read = true);
  }
});
