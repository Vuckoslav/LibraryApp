class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  addBookToList(book) {
    const list = document.getElementById('book-list');
    
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete" id="delete">X</a></td>
    `
    list.appendChild(row);
  }

  showAlert(message, className) {
    
    const div = document.createElement('div');
    
    div.className = `alert ${className}`;
    
    div.appendChild(document.createTextNode(message));
    
    const container = document.querySelector('.col-md-8');
    
    const form = document.querySelector('#book-form');
    
    container.insertBefore(div, form);

    
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 1500);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();

      const ui = new UI();
      
      ui.showAlert('Book Removed!', 'success');
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}




document.getElementById('book-form').addEventListener('submit', function(e) {

  
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  
  const book = new Book(title, author, isbn);

  
  const ui = new UI();

  
  if (title === '' || author === '' || isbn === '') {
    
    ui.showAlert('Please fill in all fields', 'error');
  } else {

    
    ui.addBookToList(book);

    
    ui.clearFields();

    
    ui.showAlert('Book Added!', 'success');
  }

  e.preventDefault();
});


document.getElementById('book-list').addEventListener('click', function(e) {
  
  const ui = new UI();

  ui.deleteBook(e.target);

  e.preventDefault();
})
  

  $(document).ready(function(){
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#book-list tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
