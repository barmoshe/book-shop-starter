<book-list>
    <h4>ID</h4>
    <h4>Name</h4>
    <h4>Price</h4>
    <h4>Picture</h4>
    <h4>Actions</h4>

    <ul>
        <li each={ book in filteredBooks } class="book-preview" data-id={book.id}>
            <h4>{book.id}</h4>
            <h4>{book.name}</h4>
            <h4>{book.price}$</h4>
            <div><img class="book-img" src={book.imgUrl}></div>
            <div>
                <button onclick={ () => onReadBook(book.id) } class="btn-read">Read</button>
                <button onclick={ () => onUpdateBook(book.id) } class="btn-update">Update</button>
                <button onclick={ () => onRemoveBook(book.id) } class="btn-remove">Remove</button>
            </div>
        </li>
    </ul>

    <p if={ filteredBooks.length === 0 }>No books to display</p>
</book-list>
