$(document).ready(function() {
  // Event Listener for Submission
  $('#submitButton').on('click', function() {

    // Check if all the user fields are completed
    checkIfComplete(function(){
      // Proceed with AJAX call if all questions are answered
      if(allFieldsCompleted){
        collectInputs();
      }
      else{
        alert('Please complete all fields before submitting!');
      }
    }); // end checkIfComplete() callback
  }); // end submit listener
}); // document ready


// Function to valid user input
function checkIfComplete(callback){
  // Check through all the questions (i.e. iterate through all of class "chosen-select")
  var questionsCompleted;
  $('.input-required').each(function(){
    if ( $(this).val() == "" ){
      questionsCompleted = false;
    }
  })
  // This counters the async behavior of $.each()
  .promise().done(function(){
    // Check if any required questions are incomplete
    if(questionsCompleted == false){
      allFieldsCompleted = false;
    }
    // Otherwise, the all fields are completed
    else{
      allFieldsCompleted = true;
    }
    // Fire Off Callback (to counter async behavior of $.each)
    callback();       
  });
}
function collectInputs(){
  // Make new student object
  var newStudent = {
    firstName: $('#userFirstName').val().trim(),
    lastName: $('#userLastName').val().trim(),
    photoURL: $('#userImage').val().trim(),
    school: $('#userCollege').val().trim(),
    githubURL: $('#userGitHub').val().trim(),
    resumeURL: $('#userResume').val().trim(),
    phoneNum: $('#userPhoneNumber').val().trim(),
    email: $('#userEmail').val().trim(),
    pwd: $('#userPassword').val().trim()
  };
 
    // POST new student to databse
    var currentURL = window.location.origin;
    $.post(currentURL + "/signup", newStudent, function(data){

      // user will be re-routed to index page
      alert('Thank you! You are registered.');
      window.location.assign(currentURL)

    }); // end AJAX POST

}