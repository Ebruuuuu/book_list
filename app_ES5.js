//ES5
//Book Constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}

//Table Constructor
function Table(){}



//Add Book To Table
//prototip sayesinde Table constructor'ına metot eklendi.
Table.prototype.addBookToTable=function(book){
    const list=document.getElementById('book-list');

    //Create tr element
    const row=document.createElement('tr');

    //Insert cols
    row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>`;

    list.appendChild(row);

}

//Delete Book from the Table
//Event Delegetion
Table.prototype.deleteBookFromTable=function(target){
    if(target.className==='delete'){
         target.parentElement.parentElement.remove();//tr removed

    }
}

//Show Alert
Table.prototype.showAlert=function(message,className){
    //Create div
    const div=document.createElement('div');
    //Add classes
    div.className=`alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container=document.querySelector('.container');
    //Get form
    const form=document.querySelector('#book-form');
    //ınsert alert
    container.insertBefore(div,form);

    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);

}

//Clear Fields
//prototip sayesinde Table constructor'ına metot eklendi.
Table.prototype.clearFields=function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}


// Event Listener for book
document.getElementById('book-form').addEventListener('submit',
 function(e){

       //Get form values
       const title=document.getElementById('title').value,
             author=document.getElementById('author').value,
             isbn=document.getElementById('isbn').value;


        //Instantiate book
        const book=new Book(title,author,isbn);

         //Instantiate table
         const table=new Table();

         //Validate
         if( title ==='' || author ==='' || isbn ==='' ){
             //Error alert
             table.showAlert('Please fill in all fields','error');//function called
         }else{

              //Add Book To List
             table.addBookToTable(book);//function called

             //Validation alert
             table.showAlert('Book added!','success');//function called


             //Clear fields
             table.clearFields();//function called
            
         
         }

  
       console.log(table);

       e.preventDefault();
    });


    document.getElementById('book-list').addEventListener('click',
    function(e){

         const table=new Table();

         table.deleteBookFromTable(e.target);

         table.showAlert('Book deleted!','success');


         e.preventDefault();



    });
        
      

         



