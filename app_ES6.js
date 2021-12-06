//ES6
//ES6 ile gelen class özelliği sayesinde daha temiz ve düzenli kod yazılmaya başlandı.
//Book Class
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }

}

//Table Class
class Table{

    addBookToTable(book){
       const row=document.createElement('tr');
       row.innerHTML=`
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td>
           <a href='#' class='delete'>X<a>
           </td>`;

        const list=document.getElementById('book-list');

        list.appendChild(row);
       
       
    }

    clearFields(){

        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

    showAlert(message,className){
         const div=document.createElement('div');

         div.className=`alert ${className}`;
         div.appendChild(document.createTextNode(message));

         const form=document.getElementById('book-form');
         const container=document.querySelector('.container');

         container.insertBefore(div,form);

         setTimeout(function(){
            document.querySelector('.alert').remove(); 
         }, 3000);

    }

    //Event Delegetion
    deleteBookFromTable(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
            const table=new Table();
            table.showAlert('Book deleted','success');
         }    
      }
}

//Local Storage Class
class Store{
    //Hafızada olan nesneler elde edildi.
    static getBooks(){

      let books;
      
      if(localStorage.getItem('books')===null){
          books=[];
      }else{
          books=JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }

    static addBook(book){
      const books=Store.getBooks();

      books.push(book);//array.push(item);

      localStorage.setItem('books',JSON.stringify(books));
    }

    static displayBooks(){
       const books=Store.getBooks();

       //forEach Loop
       books.forEach(function(book){
        const table=new Table;
         
         //Add book to table
         table.addBookToTable(book);
       });
    }

    static removeBook(isbn){
       const books=Store.getBooks();

       //forEach Loop
       books.forEach(function(book,index){
           if(book.isbn===isbn){
               books.splice(index,1);//array.splice(index,num);
           }
       });

       localStorage.setItem('books',JSON.stringify(books));
    }

    
}

//DOM Load Event
//reload edildikten sonra tablo içeriğinin yeniden yüklenmesini sağlar.
//Böylece içerik kaybolmamış olur.
document.addEventListener('DOMContentLoaded',Store.displayBooks()); 
       
//Add Book Event  
document.getElementById('book-form').addEventListener('submit',
function(e){
    
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;

    const book=new Book(title,author,isbn);

    const table=new Table();

   
    table.clearFields();
    

    if(title==='' || author==='' | isbn===''){
        table.showAlert('Please fill in the fields','error');
       
    }else{

        //Add to table
         table.addBookToTable(book); 

         //Add to LS
         Store.addBook(book);


         table.showAlert('Book added!','success');
    }

    

    console.log(book);

    console.log(table);

    e.preventDefault();

    
});

//Delete Book Event
document.querySelector('#book-list').addEventListener('click',
function(e){
     const table=new Table();
     //Delete book
     table.deleteBookFromTable(e.target);

     //Delete from LS
     //with vanilla JavaScript,we can use the previous 
     //element sibling method to get this
     Store.removeBook(e.target.parentElement.
        previousElementSibling.textContent);//ISBN
     
    
     e.preventDefault();
});


  
  






