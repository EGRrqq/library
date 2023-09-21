Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const Harry = new Book('Signet 1984', 'George Orwell', 272, false);
const Barry = new Book('Anchor The Stand', 'Stephen King', 1200, false);
const Jarry = new Book('Clockwork Orange', 'Anthony Burgess', 240, false);

let myLibrary = [Harry, Barry, Jarry];
console.log('library:', myLibrary);

(function library() {
    openModal();
    closeModal();
    addBookToLibrary();
    displayExistBook();
    displayNewBook();
})()

function openModal() {
    const modal = document.getElementById('book-modal');
    const showButton = document.getElementById('show-modal');

    showButton.addEventListener('click', () => modal.showModal());
}

function closeModal() {
    const modal = document.getElementById('book-modal');
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () =>  modal.close());
}

function displayExistBook() {
    const main = document.querySelector('.main');
    
    for (let book of myLibrary) {
        bookCard(book, main);
    }
}

function displayNewBook() {
    const form = document.querySelector('form');
    const main = document.querySelector('.main');

    form.addEventListener('submit', function() {
        const book = myLibrary[myLibrary.length - 1];
        bookCard(book, main);
    })
}

function removeCardBtn(container) {
    const removeBtn = document.createElement('button');

    removeBtn.classList.add('button');
    removeBtn.textContent = 'remove';
    
    removeBtn.addEventListener('click', function(event) {
        const section = event.target.parentElement;
        const bookId = section.getAttribute('data-id');

        myLibrary = myLibrary.filter(book => book.id !== bookId);
        section.remove();
        console.log(myLibrary);
    })

    container.appendChild(removeBtn);
}

function toggleReadStateBtn(container, book) {
    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.classList.add('button');
    toggleReadBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
    
    toggleReadBtn.addEventListener('click', function(event) {
        const section = event.target.parentElement;
        const bookId = section.getAttribute('data-id');
        
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        toggleReadBtn.textContent = myLibrary[bookIndex].read ? 'Mark as Unread' : 'Mark as Read';
        console.log(myLibrary);
    })

    container.appendChild(toggleReadBtn);
}

function bookCard(book, container) {
    const section = document.createElement('section');
    const p = document.createElement('p');

    p.textContent = book.info();
    

    section.setAttribute('data-id', book.id);
        

    section.appendChild(p);
    removeCardBtn(section);
    toggleReadStateBtn(section, book);
    container.appendChild(section);
}

function addBookToLibrary() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function() {
        let tempBook = new Book()

        const args = Object.keys(tempBook).filter(key => key !== 'id').map(key => {
            if (key === 'read') {
                return document.getElementById(key).checked;
            }

            return document.getElementById(key).value;
        })
        
        myLibrary.push(new Book(...args));
        tempBook = null;
        console.log(myLibrary);
    })
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read || false;
    this.id = Math.random().toString(36).substring(2);
}
