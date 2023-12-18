'use strict'

let gBooks = _createBooks()

function onInit() {
  renderBooks()
}

async function renderBooks() {
  console.log('books', gBooks)
  const strHTMLs = gBooks.map((book) => {
    return `<li class="book-preview">
    <h4>${book.id}</h4>
    <h4>${book.name}</h4>
    <h4>${book.price}$</h4>
    <div><img class="book-img" src="${book.imgUrl}"></div>
    <div>
      <button onclick="">Read</button>
      <button onclick="">Update</button>
      <button onclick="onRemoveBook('${book.id}')">Remove</button>
    </div>
  </li>`
  })

  const elBookList = document.querySelector('.book-list')
  elBookList.innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
  console.log('bookId', bookId)
  // TODO: remove the book by the bookId. re-render the books list after removing it from the array
}

// TODO: onAddBook() -> Get data (prompt/inputs) and add the book to the array. re-render the books list.
// TODO: onUpdateBook() -> Get data (prompt/inputs) and update the book in the books array. re-render the books list.
// TODO: Show a modal, and show the specific book details inside it.
// TODO: Hide the modal

// Now go for the bonuses :)

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