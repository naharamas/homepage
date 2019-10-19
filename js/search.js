var currentSearch = 0;
var maxSearch = searchEngineList.length-1;

for (var i=0; i < searchEngineList.length; i++) {
	$('#searchFormContainer').append('<form class="searchForm search_'+i+'" method="get" action="'+searchEngineList[i].url+'"><input class="searchBar search_'+i+'_i '+searchEngineList[i].name+'" type="text" name="'+searchEngineList[i].fieldname+'" placeholder="'+searchEngineList[i].name_capitalized+'" search_/></form>');
	$('#searchDotList').append('<li id="dot_'+i+'" onclick="selectSearch('+i+');" class="dot"><a href="#">'+searchEngineList[i].name_capitalized+'</a></li>');
}
$("#dot_0").addClass("current");
$(".search_0").addClass("searchView");
$(".search_0_i").focus();

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
$('.searchContainer').bind(mousewheelevt, function(e) {

    var evt = window.event || e //equalize event object     
    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

	// p sure this aint optimal
    if(delta > 0) {
		// Scroll up
		prevSearch();
    }
    else {
		// Scroll down
		nextSearch();
    }
});

function prevSearch() {
	var newSearch = currentSearch-1;
	if (newSearch<0) {
		newSearch = maxSearch;
	}

	$(".search_"+currentSearch).removeClass("searchView");
	$("#dot_"+currentSearch).removeClass("current");
	
	$(".search_"+newSearch).addClass("searchView");
	$("#dot_"+newSearch).addClass("current");
	$(".search_"+newSearch+"_i").focus();

	currentSearch = newSearch;
}
function nextSearch() {
	var newSearch = currentSearch+1;
	if (newSearch>maxSearch) {
		newSearch = 0;
	}

	$(".search_"+currentSearch).removeClass("searchView");
	$("#dot_"+currentSearch).removeClass("current");
	
	$(".search_"+newSearch).addClass("searchView");
	$("#dot_"+newSearch).addClass("current");
	$(".search_"+newSearch+"_i").focus();

	currentSearch = newSearch;
}

function selectSearch(searchNr) {
	$(".searchForm").removeClass("searchView");
	$(".dot").removeClass("current");
	
	$(".search_"+searchNr).addClass("searchView");
	$("#dot_"+searchNr).addClass("current");
	$(".search_"+searchNr+"_i").focus();

	currentSearch = searchNr;
}

$('.searchContainer').on( 'mousewheel DOMMouseScroll', function ( e ) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
    e.preventDefault();
});
