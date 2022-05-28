
'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },
  books: {
    booksList: '.books-list',
    booksImage: '.books-list .book__image',
    booksFavorite: 'favorite',
  }
};

const templates = {
  books: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};
const data = dataSource.books;

function render(data){
  for(let book of data){
    const generatedHTML = templates.books(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    const parent = document.querySelector(select.books.booksList);
    parent.appendChild(generatedDOM);
  }
}


function initActions(){
  const favoriteBooks = [];
  const books = document.querySelectorAll(select.books.booksImage);
  for(let book of books){
    book.addEventListener('dblclick', function(event){  
      if(event.target.offsetParent.classList.contains('.book__image'))
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          book.classList.add(select.books.booksFavorite);
          favoriteBooks.push(bookId);
        }else if(favoriteBooks.includes(bookId)) {
          book.classList.remove(select.books.booksFavorite);
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, (1));
        }
    });
  }
}
render(data);
initActions();
