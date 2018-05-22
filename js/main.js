$(document).ready(function() {

	// show/hide stuff based on if user is doc or not
	$("#iam").change( function() {
		var val = $(this).find("option:selected").attr("value");
		$(".doctor").removeClass("show");
		$(".nurse").removeClass("show");
		
		if ( val == "doc" ) {
			$(".doctor").addClass("show");
		} else if (val == "nur") {
			$(".nurse").addClass("show");
			$(".nurse input").attr('required','required');
		}
	} );

	function goToSection(i){
  $("fieldset:gt("+i+")").removeClass("current").addClass("next");
  $("fieldset:lt("+i+")").removeClass("current");
  $("li:lt("+i+")").removeClass("bar-current").addClass("bar-done");
  $("li").eq(i).addClass("bar-current").siblings().removeClass("bar-current");
  $("fieldset").eq(i).removeClass("next").addClass("current active");
      if ($("fieldset.current").index() == 1 ){
      	$(".back-btn").addClass("visible");
      	} else if ($("fieldset.current").index() == 2) {
      	$(".back-btn").removeClass("visible");
        $("input[type='submit']").val('OK');
        $("li").addClass("bar-done");
      	} else {
      		$(".back-btn").removeClass("visible");
      	}
 
}
 
function nextSection(){
  var i = $("fieldset.current").index();
  if (i < 2){
    $("li").eq(i+1).addClass("active");
    goToSection(i+1);
  }
}

$(".back-btn").on("click", function(e){
  var i = $("fieldset.current").index();
  $("fieldset").eq(-1).addClass("current");
  goToSection(i-1);
});

$(".radio").on("click", function(e){
 	 $("#SV").prop('disabled', false); 
 	 $(".cw").prop('disabled', true);
 	
});

$(".radio2").on("click", function(e){
 	 $("#SV").prop('disabled', true); 
 	 $(".cw").prop('disabled', false);
});

	// form validation
	$("form").submit(function(e) {
		var form = $(this);
		var postform = true;
		var fields = $(this).find("*[required]");;

		// alright, go through the fields one by one
		fields.each(function() {

			var valid = validateField( $(this) );

			// was the field validated?
			if ( !valid ) {

				// no!
				postform = false;
			}
		});

		// so what's the result of the POST???
		if ( !postform ) {

			// if any field wasn't validated, stop the POST of the form
			e.preventDefault();

		} else {

			// the validation was successful! But.. still stop the submit of the form and do it via AJAX
			e.preventDefault();
			nextSection();
		}
	});
});

function validateField( field ) {

	// remove error messages from eventual earlier validation attempts
	field.closest("label").removeClass("error");

	// save/set some values
	var type = field.attr("type");
	var val = field.val();
	var valid = true;

	// is it a <select>?
	if ( field.is('select') ) {
		val = field.find("option:selected").attr("value");
		if (val == undefined || val == null || val == "") {
			valid = false;
		}

	// is it a normal text field?
	} else if ( type == "text" && (val == undefined || val == null || val == "") ) {
		valid = false;

	// is is an email field?
	} else if ( type == "email" && !validateEmail(val) ) {
		valid = false;
	}

	// was the field validated?
	if ( !valid ) {
		// no - add the error-appareance
		field.closest("label").addClass("error");
	}

	return valid;
}



// function to check if email has correct syntax (using regex)
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}