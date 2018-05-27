var ok=0;
var x;
var j;
$(document).ready(function() {

	$(".manual").hide();
	$( "#step2-success p" ).hide();

	// show/hide stuff based on if user is doc or not
	$("#iam").change( function() {
		var val = $(this).find("option:selected").attr("value");
		$(".doctor").removeClass("show");
		$(".nurse").removeClass("show");

		if ( val == "doc" ) {
			$(".doctor").addClass("show");
			$(".nurse input").removeAttr('required');
			$("#SV").attr('required','required');
			$("select").closest("label").removeClass("error");
		} else if (val == "nur") {
			$(".nurse").addClass("show");
			$(".nurse input").attr('required','required');
			$("select").closest("label").removeClass("error");
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
  		ok--;
  		$('.next input').removeAttr('required');
  		 $(".alive").prepend(x);
  		 $( "#step2-success p" ).hide();
  		 $(".manual").hide();
		 $(".success").show();
	});

	$(".radio").on("click", function(e){
 		$("#SV").prop('disabled', false);
 		$(".cw").prop('disabled', true);
 		$("#SV").attr('required','required');
 		$(".cw").removeAttr('required');
 		$(".cw").closest("label").removeClass("error");
	});

	$(".radio2").on("click", function(e){
	 	$("#SV").prop('disabled', true);
	 	$(".cw").prop('disabled', false);
	 	$("#SV").removeAttr('required');
	 	$(".cw").attr('required','required');
	 	$("#SV").closest("label").removeClass("error");
	});


	$("#manually").on("click", function(e){
		 x = $( ".delete" ).detach();
		$( "#step2-success p" ).show();
		$('.next input').attr('required','required');
		ok++;
		nextSection();
		$(".formerror").addClass("hidden");
		$(".success").hide();
		$(".manual").show();

	});



	$("input").blur(function() {
		var field = $(this);

		if ( validateField(field) ) {
			field.closest("label").removeClass("error not-exist exists");
		} else {
			field.closest("label").removeClass("error not-exist exists");
			field.closest("label").addClass("error");
		}
	});



	$("form").submit(function(e) {
		var form = $(this);
		var postform = true;
		var fields = $(this).find("*[required]");;
		var details=[];
		fields.each(function() {

			var valid = validateField( $(this) );
			if ( !valid ) {
				postform = false;
			}else{
				details.push($(this).val().toLowerCase());
			}
		});

		if ( !postform ) {
			e.preventDefault();
			console.log(postform);

		} else {
			e.preventDefault();
				if(ok!=1){
				$.ajax({
					url: "js/users.json",
					dataType: "JSON"
				})

				.done(function( data ) {
					var correct=0;
					var i=0;
					var found=false;

					while (i<data.length && found==false){
						if(details.length==4){
							for(var k=0; k<details.length;k++){

								if(details[k] == data[i].firstname){
									correct++;
								}
								if(details[k] == data[i].lastname){
									correct++;
								}
								if(details[k] == data[i].profession){
									correct++;
								}
								if(details[k] == data[i].svnumber){
									correct++;
								}
							}
							if(correct==details.length){
								found=true;

							}else{
								i++;
								correct=0;
							}
						}else if (details.length==5){
							for(var k=0; k<details.length;k++){

								if(details[k] == data[i].firstname){
									correct++;
								}
								if(details[k] == data[i].lastname){
									correct++;
								}
								if(details[k] == data[i].profession){
									correct++;
								}
								if(details[k] == data[i].city){
									correct++;
								}

								if(details[k] == data[i].workplace){
									correct++;
								}

							}

							if(correct==details.length){
								found=true;
							}else{
								i++;
								correct=0;
							}
						}

					}
					if(found==true){
						$('.next input').attr('required','required');
						ok++;
						nextSection();
						$(".formerror").addClass("hidden");

					}else{
						//alert(details);
						$(".formerror").removeClass("hidden");
					}
				});
			}

		if(ok==1){
			var fieldPass1=$(this).find("*[type=password]").first();
			var fieldPass2=$(this).find("*[type=password]").last();
			if(fieldPass1.val() == fieldPass2.val()){
				nextSection();
				ok++;
			}else{
				fieldPass1.closest("label").addClass("error");
				fieldPass2.closest("label").addClass("error");
			}
		}

		if(ok==2){
			if($('.success').css('display')=='none'){
				
				$("input[type='submit']").attr('onclick','location.href="start.html"');
				
			}
			if($('.manual').css('display')=='none'){
				$("input[type='submit']").attr('onclick','location.href="index2.html"');
				
			}
			
		}

		}
	});
});



function validateField( field ) {

	field.closest("label").removeClass("error");

	var type = field.attr("type");
	var val = field.val();
	var valid = true;

	if ( field.is('select') ) {
		val = field.find("option:selected").attr("value");
		if (val == undefined || val == null || val == "") {
			valid = false;
		}
	} else if ( type == "text" && (val == undefined || val == null || val == "") ) {
		valid = false;
	} else if ( type == "email" && !validateEmail(val) ) {
		valid = false;
	} else if ( type == "number" && (val == undefined || val == null || val == "") ) {
		valid = false;
	}else if ( type == "password" && (val == undefined || val == null || val == "") ) {
		valid = false;
	}
	if ( !valid ) {
		field.closest("label").addClass("error");
	}
	return valid;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}

$(document).ready(function() {

	$(".showmenu").click(function(event) {
		event.preventDefault();
		$(".nav").toggleClass("open");
	});

	// $("#vehicles").click(function(event) {
	// 	event.preventDefault();
	// 	$(".vehicleImages").addClass("active");
	// 	$(".landscapeImages").removeClass("active");
	// 	$(".iphoneImages").removeClass("active");
	// });

	// $("#landscapes").click(function(event) {
	// 	event.preventDefault();
	// 	$(".landscapeImages").addClass("active");
	// 	$(".iphoneImages").removeClass("active");
	// 	$(".vehicleImages").removeClass("active");
	// });

	// $("#iphone").click(function(event) {
	// 	event.preventDefault();
	// 	$(".iphoneImages").addClass("active");
	// 	$(".landscapeImages").removeClass("active");
	// 	$(".vehicleImages").removeClass("active");
	// });

	// $("#all").click(function(event) {
	// 	event.preventDefault();
	// 	$(".vehicleImages").addClass("active");
	// 	$(".iphoneImages").addClass("active");
	// 	$(".landscapeImages").addClass("active");
	// });

		function openNav() {
			document.getElementById("mySidenav").style.display = "block";
	}

	function closeNav() {
			document.getElementById("mySidenav").style.display = "none";
	}

});