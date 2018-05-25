$(document).ready(function() {

	$(".showmenu").click(function(event) {
		event.preventDefault();
		$(".nav").toggleClass("open");
	});

	$("#vehicles").click(function(event) {
		event.preventDefault();
		$(".vehicleImages").addClass("active");
		$(".landscapeImages").removeClass("active");
		$(".iphoneImages").removeClass("active");
	});

	$("#landscapes").click(function(event) {
		event.preventDefault();
		$(".landscapeImages").addClass("active");
		$(".iphoneImages").removeClass("active");
		$(".vehicleImages").removeClass("active");
	});

	$("#iphone").click(function(event) {
		event.preventDefault();
		$(".iphoneImages").addClass("active");
		$(".landscapeImages").removeClass("active");
		$(".vehicleImages").removeClass("active");
	});

	$("#all").click(function(event) {
		event.preventDefault();
		$(".vehicleImages").addClass("active");
		$(".iphoneImages").addClass("active");
		$(".landscapeImages").addClass("active");
	});

	$('.flexslider').flexslider({
    	animation: "slide",
    	controlNav: "thumbnails"
  	});

});