/*
 *	Original code by Emily !66666666Ok (https://github.com/E66666666/homepage)
 *  Additions by Naharamas (https://github.com/naharamas/homepageDX)
 */

$(window).on("load", function(){
	$('#indiemag').FeedEk( {
		FeedUrl : 'https://www.indiemag.fr/feed/rss.xml',
		MaxCount : 15,
		ShowDesc : false,
		ShowPubDate : true,
		DateFormat: 'HH:mm | DD/MM',
		TitleLinkTarget:'_self'
	});
	$('#gorafi').FeedEk( {
		FeedUrl : 'http://www.legorafi.fr/feed/',
		MaxCount : 15,
		ShowDesc : false,
		ShowPubDate : true,
		DateFormat: 'HH:mm | DD/MM',
		TitleLinkTarget:'_self'
	}); 

	$('#dlc').FeedEk( {
		FeedUrl : 'http://www.darklegacycomics.com/feed.xml',
		MaxCount : 3,
		MaxDaysLate : 15,
		ShowPubDate : true,
		DateFormat: 'YYYY/MM/DD',
		Callback: function() {
			var dlcExists = $('#dlc .feedEkList li').length;
			if (dlcExists) {
				$('#dlc .feedEkList li .itemTitle a').each(function (i) {
					var n = $(this)[0].href.split('/')[3];
					$('#dlc .feedEkList li:nth-child('+(i+1)+') .itemContent').html("<a href='http://www.darklegacycomics.com/"+n+"' rel='bookmark'><img width='100%' src='http://www.darklegacycomics.com/comics/"+n+".jpg' alt=''></a>");
				});
				document.getElementById("dlcContainer").style.display="inline";
			}
		}
	});

	$('#xkcd').FeedEk( {
		FeedUrl : 'https://www.xkcd.com/rss.xml',
		MaxCount : 1,
		MaxDaysLate : 2,
		ShowPubDate : true,
		DateFormat: 'YYYY/MM/DD',
		Callback: function() {
			var xkcdExists = $('#xkcd .feedEkList li').length;
			if (xkcdExists) {
				document.getElementById("xkcdContainer").style.display="inline";
			}
		}
	});
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