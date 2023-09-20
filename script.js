const myLibrary = [];
console.log('library:', myLibrary);

(function library() {
    displayButton();
    addBookToLibrary();
})()

function displayButton() {
    const body = document.querySelector('body');
    const button = document.createElement('button');

    button.textContent = 'add book';
    body.appendChild(button);
}

function Book(title) {
    this.title = title;
}

function addBookToLibrary() {
    const button = document.querySelector('button');

    button.addEventListener('click', function() {
        const userInput = prompt('book title');

        if (userInput) {
            const newBook = new Book(userInput);
            myLibrary.push(newBook);
        }
        console.log('library:', myLibrary);
    })
}

