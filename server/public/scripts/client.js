// when the document is ready, 
$( document ).ready( onReady );

// create a function called onReady that executes a few actions upon page load...
function onReady(){
    //establish click listeners
    setupClickListeners();
    //load existing tasks on page load
    $(`#outputDiv`).on('click', '.deleteButton', deleteTask);
    $(`#outputDiv`).on( 'click', `.incompleteTaskBtn`, changeStatus);
    $(`#outputDiv`).on( 'click', `.completeTaskBtn`, changeStatus);
    //grab list of tasks from the db
    getTasks();
} // end onReady

//create a function called setupClickListeners that creates the object to send to db via the server
function setupClickListeners() {
    $(`#submitButtonIn`).on('click', function () {
      console.log('in submitButton on click');
      // get user input and put in an object
      let taskToSend = {
        stat: $('#dropdownIn').val(),
        task: $('#taskIn').val(),
        due: $('#taskDateIn').val(),
        notes: $('#notesIn').val()
        };
        //console log taskToSend
        console.log( 'submitting task:', taskToSend );
        // run the fucntion submitTask to send the object (taskToSend) to the db via the server
        submitTask(taskToSend);
    });
  }

  // create a function called getTasks that displays existing tasks in the db to the DOM
function getTasks() {
console.log('in getTasks');
// ajax call to server to get tasks
$.ajax({
    method: 'GET', 
    url: '/todolist'
    // after that, display the response
}).then(function (response) {
    console.log('back from GET:', response);
    // create an output element using an existing ID 
    let el = $('#viewTasks');
    //  empty output element
    el.empty();
    //append each task (object) and it's properties to the DOM   
    for (let i = 0; i < response.length; i++) {
        // if the status is false,
        if( !response[i].stat ){
            // append the object and make sure the class is set to "incompleteTaskBtn"
            // the image used for the status button should be an empty circle
         el.append(
            `<tr>
                <td><button type="button" data-id='${response[i].id}' class="incompleteTaskBtn btn btn-labeled btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              </svg></button></td>
                <td>${response[i].task}</td>
                <td>${response[i].due}</td>
                <td>${response[i].notes}</td>
                <td><button data-id='${response[i].id}' type="button" class="deleteButton btn btn-labeled btn-danger" data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></button></td>
            </tr>`)
        } // end if
        // other wise, 
        // append the object and make sure the class is set to "completeTaskBtn"
        // the image used for the status button should be a circle with a check mark in it 
        else{
            el.append(
                `<tr>
                    <td><button data-id='${response[i].id}' class="completeTaskBtn btn btn-labeled btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg></button></td>
                    <td class="taskDone">${response[i].task}</td>
                    <td class="taskDone">${response[i].due}</td>
                    <td class="taskDone">${response[i].notes}</td>
                    <td><button data-id='${response[i].id}' type="button" class="deleteButton btn btn-labeled btn-danger" data-toggle="modal" data-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg></button></td>
                </tr>`)
        } //end else
    } // end for
    //then catch any errors and log them out 
}).catch(function (err) {
    alert('could not get tasks');
    console.log(err);
})//end for
} // end getTasks
  

// create a function called submitTask that makes an ajax call to send over the object (task, status, due date, notes) to the server
// use POST to connect to the server 
function submitTask(newTask){
    console.log( 'submitting task!', newTask );
    $.ajax({
        method: "POST",
        url: '/todolist',
        data: newTask
    }).then(function (response) {
        // after sending the items over to the server, 
        // call getTasks to update the DOM with the latest entry
        getTasks();
        // next, emptry out the values of the input fields 
        $('#dropdownIn').val(''),
        $('#taskIn').val(''),
        $('#taskDateIn').val(''),
        $('#notesIn').val('')
    // catch any errors and log them
    }).catch(function (err) {
        alert('could not add task');
        console.log(err);
    })
}
// create a function called deleteTask
// this function will target an element by its' ID and make an AJAX call to delete the object
// connecting to the db via the server
function deleteTask(){
    // once the delete button is pressed, confirm if the user would like to delete their entry
    let proceedWithDelete = confirm('Do you want to delete this task?');
    // if the user clicks "confirm",
    if (proceedWithDelete == true) {
        // target the id of the object they clicked on, 
        // log out its' ID 
    console.log('in deleteTask!', $(this).data('id'));
    const taskId = $(this).data('id');
        // make an AJAX call to target the identified ID via a DELETE route
    $.ajax({
      method: 'DELETE',
      url: `/todolist?id=` + taskId
    }).then(function (response) {
        // after sending the call over to the server, 
        // run getTasks to display the most up-to-date data on the DOM from the db
      getTasks();
      // then catch any errors and log them
    }).catch(function (err) {
      console.log(err);
      alert('error deleting message');
    })
  }// end if
} //end deleteTask

// create a function called changeStatus
// this function will target the id of an object 
function changeStatus() {
    console.log( 'in change status' );
    const taskId = $(this).data('id');
    const stat = $(this).data('stat');
    console.log( 'taskId is:', taskId );
// make an AJAX call that targets the id of the object we want to update, 
// and takes that ID to the server to update the db 
    $.ajax({
        method: 'PUT',
        url: '/todolist?id=' + taskId,
    }).then(function (response){
        // then, run getTasks to list the most up-to-date information from the db on the DOM
        getTasks();
        // catch any errors and log them out
    }).catch(function (err){
        console.log( 'problem updating task!', err )
    })
} // end changeStatus
