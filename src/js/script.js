
'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
  },

  books: {
    booksList: '.books-list',
    booksFavorite: 'favorite',
    hidden: 'hidden',
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
      if(!filters.includes(event.target.value)){
        filters.push(event.target.value);
      }else if (filters.includes(event.target.value)){
        const index = filters.indexOf(event.target.value);
        filters.splice(index, (1))      
      }
    }else if(!event.target.checked){
      if(!filters.includes(event.target.value)){
        filters.push(event.target.value);
      }else if (filters.includes(event.target.value)){
        const index = filters.indexOf(event.target.value);
        filters.splice(index, (1))      
      }
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
};


function filterBook(){
  for(let book of data){
    console.log(book.details);
    let shouldBeHidden = false;
    for(let filter of filters){
      if(!book.details[filter]){
        shouldBeHidden = true;
        console.log(book.details[filter]);
        break;
      }
    }
    
  }
}

render(data);
initActions();

