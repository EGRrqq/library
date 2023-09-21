const myLibrary = [];
console.log('library:', myLibrary);

(function library() {
    openModal();
    closeModal();
    addBookToLibrary();
    displayBooks();
})()

function openModal() {
    const modal = document.getElementById('book-modal');
    const showButton = document.getElementById('show-modal');

    showButton.addEventListener('click', () => modal.showModal());
}

function closeModal() {
    const modal = document.getElementById('book-modal');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', function() {
        modal.close();
    })
}

function displayBooks() {
    const body = document.querySelector('body');
    const ul = document.createElement('ul');
    body.appendChild(ul);

    Book.prototype.display = false;
    const form = document.querySelector('form');

    form.addEventListener('submit', function() {
        const book = myLibrary[myLibrary.length - 1];

        if (!book.display) {
            book.display = true;
            const li = document.createElement('li');
            li.textContent = book.info();
            ul.appendChild(li);
        }
    })
}

function addBookToLibrary() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function() {
        let tempBook = new Book()

        const args = Object.keys(tempBook).map(key => {
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
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}
