

let myLibrary = [];

class Book{
     constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;     
     }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} `
    };

}

class Library {
    constructor() {
        this.books = [];
    }
    displayBooks() {
        const bookContainer = document.getElementById('book-div');
        bookContainer.innerHTML = '';
    
        this.books.forEach((book, index) => {
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
                this.toggleReadStatus(index);
            });
            bookElement.appendChild(readButton);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => {
                this.deleteBook(index)
            });
            bookElement.appendChild(deleteButton);
    
            bookContainerElement.appendChild(bookElement);
            bookContainer.appendChild(bookContainerElement);
        });
        localStorage.setItem('myLibrary', JSON.stringify(this.books));
    }
    addBook(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook)
        this.displayBooks()
    }
    
    toggleReadStatus(index) {
        this.books[index].read = !this.books[index].read;
        this.displayBooks();
    }
    
    deleteBook(index) {
        this.books.splice(index, 1);
        this.displayBooks();
    }
    saveLibrary() {
        localStorage.setItem('myLibrary', JSON.stringify(this.books));
    }
    loadLibrary() {
        const savedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        if (savedLibrary) {
            this.books = savedLibrary.map((bookData) => {
                const { title, author, pages, read } = bookData;
                return new Book(title, author, pages, read);

            });
        }
    }
}

const library = new Library();

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') === 'yes';

    library.addBook(title,author,pages,read);

    form.reset();
});


document.addEventListener('DOMContentLoaded', () => {
    library.loadLibrary();
    library.displayBooks();
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

