var lsPrefix = "homepagedx_"; // If you have several local applications that makes use of localstorage, this will help to reduce conflicts.

var birthMonth = 12;
var birthDay = 25;

var weatherAPIKey = "YOUR_API_KEY"; // get one on https://darksky.net/dev, 1000 free calls per day, should be more than enough since it's only called when displayed.
var weatherLocation1 = {name:"Lyon", lat:45.7500, lon:4.8500}; // Dark Sky works with GPS coordinates, the name here only acts as a label.
var weatherLocation2 = {name:"Grenoble", lat:45.1667, lon:5.7167}; // Both locations are optional.

var proxyUrl = "proxy.php?url="; // If using FeedEX.js, this should point to a CORS friendly proxy since it's gonna be used to get RSS feeds. Included proxy.php is enough but needs a local web service or to be hosted somewhere.
moment.locale('fr'); // Shouldn't matter

// Template: themes["directory(must be in img/)"] = { amount: imageCount, filetype:"filetype" };
// Images must be named sequentially from 1 to imageCount. (use AntRenamer or whatever)
var themes = [];
themes["calm"] = { amount: 11, filetype:"jpg" };
themes["day"] = { amount: 13, filetype:"jpg" };
themes["lotr"] = { amount: 11, filetype:"jpg" };
themes["night"] = { amount: 15, filetype:"jpg" };
themes["pixel"] = { amount: 11, filetype:"png" };

var defaultTheme = "calm"; 

// Default settings for the links, used whenever local storage is empty or unavailable.
var defaultFavboxes = {};
defaultFavboxes["favbox1"] = {title:"Social", items:[
	{link:"https://twitter.com/", label:"Twitter"}, 
	{link:"https://www.facebook.com/", label:"Facebook"}, 
	{link:"https://discordapp.com/channels/@me", label:"Discord"}, 
	{link:"https://www.reddit.com/", label:"Reddit"}]};
defaultFavboxes["favbox2"] = {title:"Work", items:[
	{link:"https://mail.google.com/mail/u/0/?tab=wm#inbox", label:"Gmail"}, 
	{link:"https://github.com/", label:"Github"}, 
	{link:"http://www.thesaurus.com/", label:"Thesaurus"}]};
defaultFavboxes["favbox3"] = {title:"Media", items:[
	{link:"https://www.youtube.com/", label:"YouTube"}, 
	{link:"https://www.twitch.tv/", label:"Twitch"}, 
	{link:"https://www.netflix.com/browse", label:"Netflix"}, 
	{link:"http://myanimelist.net/", label:"MyAnimeList"}]};
defaultFavboxes["favbox4"] = {title:"Download", items:[
	{link:"https://torrentfreak.com/", label:"TorrentFreak"}, 
	{link:"https://rutracker.org/forum/index.php", label:"Rutracker"}, 
	{link:"http://fitgirl-repacks.site/", label:"Fitgirl"}]};
defaultFavboxes["favbox5"] = {title:"4chan", items:[
	{link:"https://boards.4chan.org/a/catalog", label:"/a/ - Anime & Manga"}, 
	{link:"https://boards.4chan.org/vg/catalog", label:"/vg/ - Video Game Generals"}, 
	{link:"https://boards.4chan.org/vr/catalog", label:"/vr/ - Retro Games"}, 
	{link:"https://boards.4chan.org/wg/catalog", label:"/wg/ - Wallpapers General"}]};
defaultFavboxes["favbox6"] = {title:"Misc", items:[
	{link:"https://store.steampowered.com/", label:"Steam"}, 
	{link:"http://ffbeequip.lyrgard.fr/inventory.html", label:"FFBE-Equip"}, 
	{link:"http://192.168.0.254/", label:"Freebox"}]};

var newsFeeds = [];
newsFeeds["IndieMag"] = {
	Title: "IndieMag", // Title of the box
	SiteUrl: "https://www.indiemag.fr/", // Clicking on the title will redirect here
	FeedUrl: "https://www.indiemag.fr/feed/rss.xml" // Feed to check
};
newsFeeds["Gorafi"] = {
	Title: "Le Gorafi", 
	SiteUrl: "http://www.legorafi.fr/", 
	FeedUrl: "http://www.legorafi.fr/feed/"
};

var bigFeeds = [];
bigFeeds["xkcd"] = {
	Title: "xkcd", // Title of the box
	SiteUrl: "https://www.xkcd.com/", // Clicking on the title will redirect here
	FeedEkOptions: {
		FeedUrl: "https://www.xkcd.com/rss.xml", // Feed to check
		// All options from FeedEk can go here
		MaxCount : 1,
		MaxDaysLate : 2,
		ShowPubDate : true,
		DateFormat: 'YYYY/MM/DD',
		Callback: function(id) {
			var xkcdExists = $('#xkcd .feedEkList li').length;
			if (xkcdExists) {
				$('#'+id).parent().css("display","inline");
			}
		}
	}
};
bigFeeds["dlc"] = {
	Title: "Dark Legacy Comics", 
	SiteUrl: "http://www.darklegacycomics.com/", 
	FeedEkOptions: {
		FeedUrl: "http://www.darklegacycomics.com/feed.xml", 
		MaxCount : 2,
		MaxDaysLate : 3,
		ShowPubDate : true,
		DateFormat: 'YYYY/MM/DD',
		Callback: function(id) {
			var dlcExists = $('#'+id+' .feedEkList li').length;
			if (dlcExists) {
				$('#'+id+' .feedEkList li .itemTitle a').each(function (i) {
					var n = $(this)[0].href.split('/')[3];
					$('#'+id+' .feedEkList li:nth-child('+(i+1)+') .itemContent').html("<a href='https://www.darklegacycomics.com/"+n+"' rel='bookmark'><img width='100%' src='https://www.darklegacycomics.com/comics/"+n+".jpg' alt=''></a>");
				});
				$('#'+id).parent().css("display","inline");
			}
		}
	}
};

var searchEngineList = [];
searchEngineList[0] = {
	name: "google",
	name_capitalized: "Google",
	url: "https://www.google.com/search",
	fieldname: "q"
};
searchEngineList[1] = {
	name: "youtube",
	name_capitalized: "Youtube",
	url: "https://youtube.com/results",
	fieldname: "search_query"
};
searchEngineList[2] = {
	name: "wikipedia",
	name_capitalized: "Wikipedia",
	url: "https://en.wikipedia.org/w/index.php",
	fieldname: "search"
};