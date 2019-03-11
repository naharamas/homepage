/*
 *	Original code by Emily !66666666Ok (https://github.com/E66666666/homepage)
 *  Additions by Naharamas (https://github.com/naharamas/homepageDX)
 */

$(window).on("load", function(){
	for (var key in newsFeeds) {
		$('#center').append('<div class="d2x1 newsFeed"><h1><a href="'+newsFeeds[key].SiteUrl+'" class="bracket">'+newsFeeds[key].Title+'</a></h1><div class="d2x1Child newsFeedContent" id="'+key+'"></div></div>');
		$('#'+key).FeedEk( {
			FeedUrl : newsFeeds[key].FeedUrl,
			MaxCount : 15,
			ShowDesc : false,
			ShowPubDate : true,
			DateFormat: 'HH:mm | DD/MM',
			TitleLinkTarget:'_self'
		});
	}

	for (var key in bigFeeds) {
		$('#center').append('<div class="d4x2 bigFeed"><h1><a href="'+bigFeeds[key].SiteUrl+'" class="bracket">'+bigFeeds[key].Title+'</a></h1><div class="d4x2Child bigFeedContent" id="'+key+'"></div></div>');
		$('#'+key).FeedEk( bigFeeds[key].FeedEkOptions );
	}
});

function sizeCheck() {
	if(window.innerWidth<=840) {
		t = $("#todo").detach();
		$("#favbox6").after(t);
	} else {
		f = $("#favbox6").detach();
		$("#todo").after(f);
	}
}

sizeCheck();