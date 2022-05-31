
'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },

  books: {
    booksList: '.books-list',
    booksImage: '.books-list .book__image',
    booksFavorite: 'favorite',
    hidden: 'hidden',
    booksRating: '.books-list .book__rating .book__rating__fill',
  },

  form: {
    inputs: '.filters',
  },
};

const templates = {
  books: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

class BooksList {
  constructor() {
    const thisBook = this;

    thisBook.initData();
    thisBook.getElements();
    thisBook.render();
    thisBook.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    const thisBook = this;
    
    thisBook.dom = {};
    thisBook.dom.wrapper = document;
    thisBook.dom.book = this.dom.wrapper.querySelector(select.books.booksList);
    thisBook.dom.form = this.dom.wrapper.querySelector(select.form.inputs);
    thisBook.dom.bookList = this.dom.wrapper.querySelector(select.books.booksList);
  }

  render(){
    const thisBook = this;
    for(let book of this.data){
      const ratingBgc = thisBook.determineRatingBgc(book.rating);
      const ratingWidth ='width: ' + book.rating * 10 + '%;';
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      const generatedHTML = templates.books(book);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const booksList = thisBook.dom.bookList;
      booksList.appendChild(thisBook.element);
    }
  }

  initActions() {
    const thisBook = this;
    const favoriteBooks = [];
    const filters = [];
    
    thisBook.dom.form.addEventListener('click', function(event){
      if(event.target.checked){
        filters.push(event.target.value);
      }else if(!event.target.checked){
        const index = filters.indexOf(event.target.value);
        filters.splice(index, (1));    
      }
      thisBook.filterBooks(filters);
    });
  
    thisBook.dom.book.addEventListener('dblclick', function(event){  
      if(event.target.offsetParent.classList.contains('book__image')){
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          event.target.offsetParent.classList.add(select.books.booksFavorite);
          favoriteBooks.push(bookId); 
        }else if(favoriteBooks.includes(bookId)) {
          event.target.offsetParent.classList.remove(select.books.booksFavorite);
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, (1));
        }
      }
    });
  }

  filterBooks(filters) {
    for(let book of this.data){
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }    
      }
      const domElement = document.querySelector('[data-id="' +  book.id + '"]');
      if(shouldBeHidden){
        domElement.classList.add(select.books.hidden);
      }else if(!shouldBeHidden){
        domElement.classList.remove(select.books.hidden);
      }
    }
  }
  

  determineRatingBgc(rating){
    const thisBook = this;
 
    thisBook.background = '';

    if(rating <= 6){
      thisBook.background = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }else if(rating > 6 && rating <= 8){
      thisBook.background = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    }else if(rating > 8 && rating <= 9){
      thisBook.background = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    }else if(rating > 9){
      thisBook.background = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    }

    return thisBook.background;
  }
  
}
const app = new BooksList();
app();

