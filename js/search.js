var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
$('.searchContainer').bind(mousewheelevt, function(e){

    var evt = window.event || e //equalize event object     
    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

	var search_0 = document.getElementById("search_0");
	var search_1 = document.getElementById("search_1");
	var search_2 = document.getElementById("search_2");

	// p sure this aint optimal
    if(delta > 0) {
		// Scroll up
		prevSearch();
    }
    else{
		// Scroll down
		nextSearch();
    }   
});

function prevSearch() {
	if ($(".search_0").height() != 0) {
		$(".search_0").removeClass("searchView");
		$("#dot_0").removeClass("current");

		$(".search_2").addClass("searchView");
		$("#dot_2").addClass("current");
		$(".search_2_i").focus();
		return;
	}
	if ($(".search_1").height() != 0) {
		$(".search_1").removeClass("searchView");
		$("#dot_1").removeClass("current");

		$(".search_0").addClass("searchView");
		$("#dot_0").addClass("current");
		$(".search_0_i").focus();
		return;
	}
	if ($(".search_2").height() != 0) {
		$(".search_2").removeClass("searchView");
		$("#dot_2").removeClass("current");

		$(".search_1").addClass("searchView");
		$("#dot_1").addClass("current");
		$(".search_1_i").focus();
		return;
	}
}
function nextSearch() {
	if ($(".search_0").height() != 0) {
		$(".search_0").removeClass("searchView");
		$("#dot_0").removeClass("current");

		$(".search_1").addClass("searchView");
		$("#dot_1").addClass("current");
		$(".search_1_i").focus();
		return;
	}
	if ($(".search_1").height() != 0) {
		$(".search_1").removeClass("searchView");
		$("#dot_1").removeClass("current");

		$(".search_2").addClass("searchView");
		$("#dot_2").addClass("current");
		$(".search_2_i").focus();
		return;
	}
	if ($(".search_2").height() != 0) {
		$(".search_2").removeClass("searchView");
		$("#dot_2").removeClass("current");

		$(".search_0").addClass("searchView");
		$("#dot_0").addClass("current");
		$(".search_0_i").focus();
		return;
	}
}

function selectSearch(searchNr) {
	switch (searchNr) {
		case 0:
			$(".search_0").addClass("searchView");
			$("#dot_0").addClass("current");

			$(".search_1").removeClass("searchView");
			$(".search_2").removeClass("searchView");
			$("#dot_1").removeClass("current");
			$("#dot_2").removeClass("current");
			//$(".search_0_i").focus();
			break;
		case 1:
			$(".search_1").addClass("searchView");
			$("#dot_1").addClass("current");

			$(".search_0").removeClass("searchView");
			$(".search_2").removeClass("searchView");
			$("#dot_0").removeClass("current");
			$("#dot_2").removeClass("current");
			//$(".search_1_i").focus();
			break;
		case 2:
			$(".search_2").addClass("searchView");
			$("#dot_2").addClass("current");

			$(".search_1").removeClass("searchView");
			$(".search_0").removeClass("searchView");
			$("#dot_1").removeClass("current");
			$("#dot_0").removeClass("current");
			//$(".search_2_i").focus();
			break;
	}
}

$('.searchContainer').on( 'mousewheel DOMMouseScroll', function ( e ) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});
