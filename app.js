// library !!! leave books on screen on reload, add a button for read status

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const displayBooks = (myLibrary) => {
    const bookContainer = document.getElementById('book-div');
    bookContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookContainerElement = document.createElement('div');
        bookContainerElement.classList.add('book-container');
        
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const titleElement = document.createElement('h3');
        titleElement.textContent = `Title: ${book.title}`;
        bookElement.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`
        bookElement.appendChild(authorElement);

        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Page count: ${book.pages}`;
        bookElement.appendChild(pagesElement);
        
        const readButton = document.createElement('button');
        readButton.textContent = book.read ? 'Read: Yes' : 'Read: No';
        readButton.addEventListener('click', () => {
            toggleReadStatus(index);
        });
        bookElement.appendChild(readButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => {
            deleteBook(index)
        });
        bookElement.appendChild(deleteButton);

        bookContainerElement.appendChild(bookElement);
        bookContainer.appendChild(bookContainerElement);
    });
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};


function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks(myLibrary);
}

window.addEventListener('load', () => {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
});

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'yes';

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayBooks(myLibrary);

    form.reset();

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
});

function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
}


// Book
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    Book.prototype.info =  function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} `
    };
}
document.addEventListener('DOMcontentLoaded', () => {
    displayBooks(myLibrary);
});


































// modal

const openModal = document.querySelector("[data-open-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openModal.addEventListener("click", () => {
    modal.showModal(modal.style.display = "flex")
});

closeModal.addEventListener("click", () => {
    modal.close(modal.style.display = "none")
});

