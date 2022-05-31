
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
    rating: '.book__rating__fill'
  },

  form: {
    inputs: '.filters',
  },
};

const templates = {
  books: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

const data = dataSource.books;
function render(data){
  for(let book of data){
    const rating = book.rating;
    const ratingBgc = determineRatingBgc(rating);
    const generatedHTML = templates.books(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    const parent = document.querySelector(select.books.booksList);
    parent.appendChild(generatedDOM);
  }
}

const filters = [];
function initActions(){
  const favoriteBooks = [];
  const book = document.querySelector(select.books.booksList);
  const form = document.querySelector(select.form.inputs);

  form.addEventListener('click', function(event){
    if(event.target.checked){
      filters.push(event.target.value);
    }else if(!event.target.checked){
      const index = filters.indexOf(event.target.value);
      filters.splice(index, (1));    
    }
    filterBook();
  });

  book.addEventListener('dblclick', function(event){  
    console.log(event.target.offsetParent);
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
function filterBook(){
  const hidden = document.querySelector(select.books.hidden);

  for(let book of data){
    let shouldBeHidden = false;
    for(const filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        break;
      }    
    }
    const domElement = document.querySelector('[data-id="' +  book.id + '"]');
    if(shouldBeHidden){
      domElement.classList.add(hidden);
    }else if(!shouldBeHidden){
      domElement.classList.remove(hidden);
    }
  }
}

function determineRatingBgc(rating){
  
  const element = document.querySelectorAll(select.books.rating);
  let out = '';
  let computedStyle = window.getComputedStyle(select.books.rating);
  console.log(computedStyle);
  console.log(element);
 
  if(rating <= 6){
   out += "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);";
  }else if(rating > 6 && rating <= 8){
   out += "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);";
  }else if(rating > 8 && rating <= 9){
   out += "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);";
  }else if(rating > 9){
   out += "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);";
  }
  console.log(out);
}


render(data);
initActions();

