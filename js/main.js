'use strict';

let gBooks = _createBooks();
let isGridView = JSON.parse(localStorage.getItem('isGridView')) || false;

function toggleView() {
    isGridView = !isGridView;
    renderBooks();
}

function onInit() {
    gBooks = loadBooksFromStorage() || gBooks;
    renderBooks();
}

function loadBooksFromStorage() {
    const booksJSON = localStorage.getItem('books');
    return JSON.parse(booksJSON);
}

function renderBooks(filteredBooks = gBooks) {
    const elBookList = document.querySelector('.book-list');

    if (filteredBooks.length === 0) {
        elBookList.innerHTML = '<p>No books to display</p>';
        return;
    }

    const viewClass = isGridView ? 'grid-view' : 'list-view';
    elBookList.className = `book-list ${viewClass}`;

    if (isGridView) {
        // Render grid view
        const strHTMLs = filteredBooks.map((book) => createBookHTMLGrid(book));
        elBookList.innerHTML = strHTMLs.join('');
    } else {
        // Render table view
        const tableHTML = createBookHTMLTable(filteredBooks);
        elBookList.innerHTML = tableHTML;
    }

    saveBooksToStorage();
}

function createBookHTMLGrid(book) {
    return `
        <li class="book-preview" data-id="${book.id}">
            <div class="book_details_element"><h3>${book.name}</h3></div>
            <div class="price"><p>Price: ${book.price}$</p> </div>
            <div class="book_details_element"><img src="${book.imgUrl}" class="book-img" alt="${book.name}" /> </div>
            <div class="book_details_element">  
                <button onclick="onReadBook('${book.id}')" class="btn-read">Read</button> 
                <button onclick="onUpdateBook('${book.id}')" class="btn-update">Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="btn-remove">Remove</button>
            </div>
        </div>
        </li>`;
}

function createBookHTMLTable(books) {
    return `
        <table class="book-table">
            <thead class="book-table-header">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Picture</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="book-table-body">
                ${books.map((book) => `
                    <tr  data-id="${book.id}">
                        <td>${book.id}</td>
                        <td>${book.name}</td>
                        <td>${book.price}$</td>
                        <td><img src="${book.imgUrl}" alt="${book.name}" class="book-img" /></td>
                        <td>
                            <button onclick="onReadBook('${book.id}')" class="btn-read">Read</button>
                            <button onclick="onUpdateBook('${book.id}')" class="btn-update">Update</button>
                            <button onclick="onRemoveBook('${book.id}')" class="btn-remove">Remove</button>
                        </td>
                    </tr>`).join('')}
            </tbody>
        </table>`;
}

function saveBooksToStorage() {
    const booksJSON = JSON.stringify(gBooks);
    localStorage.setItem('books', booksJSON);
    localStorage.setItem('isGridView', JSON.stringify(isGridView));
}

function onRemoveBook(bookId) {
    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    //prompt user to confirm "are you sure you want to delete this bookName ?"
    const isSure = confirm(`Are you sure you want to delete ${gBooks[bookIndex].name}?`);
    if (!isSure) return;
    gBooks.splice(bookIndex, 1);
    renderBooks();
}

function onAddBook() {
    const bookName = prompt('Enter the book name:');
    if (!bookName) return;
    const bookPrice = prompt('Enter the book price:')
    if (!bookPrice) return;
    gBooks.push(_createBook(bookName, bookPrice));
    renderBooks();
}

function onUpdateBook(bookId) {
    const bookName = prompt('Enter the new book name:');
    if (!bookName) return;
    const bookPrice = prompt('Enter the new book price:');
    if (!bookPrice) return;

    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    gBooks[bookIndex].name = bookName;
    gBooks[bookIndex].price = bookPrice;

    renderBooks();
}

function onReadBook(bookId) {
    const selectedBook = gBooks.find(book => book.id === bookId);
    if (selectedBook) {
        displayBookDetails(selectedBook);
    }
}

function onFilterBooks() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = gBooks.filter(book => book.name.toLowerCase().includes(searchTerm));
    //log the filtered books
    console.log(filteredBooks);
    renderBooks(filteredBooks);
}


function displayBookDetails(book) {
    const modal = document.getElementById("bookDetailsModal");
    const modalContent = modal.querySelector(".modal-content");

    const modalHTML = `
      <span class="hide-btn" onclick="closeModal()">&times;</span>
      <h2>${book.name}</h2>
      <img src="${book.imgUrl}" alt="${book.name}" />
      <p>${book.desc}</p>
      <p>Price: ${book.price}$</p>
      <p>Rating: <span id="rating">${book.rate}</span></p>
      <button onclick="changeRating('${book.id}', 'increment')">+</button>
      <button onclick="changeRating('${book.id}', 'decrement')">-</button>
  `;

    modalContent.innerHTML = modalHTML;
    modal.style.display = "block";
}

function changeRating(bookId, action) {
    const book = gBooks.find(book => book.id === bookId);
    if (book) {
        if (action === 'increment' && book.rate < 10) {
            book.rate++;
        } else if (action === 'decrement' && book.rate > 0) {
            book.rate--;
        }

        document.getElementById("rating").textContent = book.rate;
    }
}

function closeModal() {
    const modal = document.getElementById("bookDetailsModal");
    modal.style.display = "none";
}

function _createBooks() {
    const books = [
        _createBook('Harry Potter', 200, '../img/harry_potter.jpeg'),
        _createBook('How To Sketch', 120, '../img/how_to_sketch.jpg'),
        _createBook('Animals 101', 120, '../img/101_animals.jpg'),
        _createBook('JS secrets', 50, '../img/js.jpg'),
        _createBook('Lion King', 90, '../img/lion-king.jpg'),
        _createBook('Mastering CSS', 135, '../img/css.jpg'),
    ]
    return books
}

function _createBook(name, price, imgUrl = '../img/default_book.jpg') {
    return {
        id: _makeId(),
        name,
        price,
        imgUrl,
        rate: 0,
        desc: _makeLorem()
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _makeLorem(wordCount = 100) {
    const words = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
        "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
        "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"
    ];

    let loremText = "";

    for (let i = 0; i < wordCount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        loremText += words[randomIndex] + " ";
    }

    return loremText.trim();
}

function toggleHoverClass(bookId) {
    const bookPreview = document.querySelector(`.book-preview[data-id="${bookId}"]`);
    bookPreview.classList.toggle('hovered');
}
sr = ScrollReveal({
    origin: 'top',
    distance: '35px',
    duration: 1000,
    reset: false,
});

sr.reveal('.book-table-body', { delay: 200 });
sr.reveal('.book-preview', { delay: 100000 });
sr.reveal('.book-details', { delay: 200 });
sr.reveal('.btn-read', { delay: 200 });
sr.reveal('.btn-update', { delay: 200 });
sr.reveal('.btn-remove', { delay: 200 });
sr.reveal('.btn-add', { delay: 200 });