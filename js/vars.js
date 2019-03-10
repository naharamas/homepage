var birthMonth = 6;
var birthDay = 5;

var weatherAPIKey = "YOUR_API_KEY"; // get one on https://darksky.net/dev, 1000 free calls per day, should be more than enough since it's only called when displayed.
var weatherLocation1 = {name:"Lyon", lat:45.7500, lon:4.8500}; // Dark Sky works with GPS coordinates, the name here only acts as a label.
var weatherLocation2 = {name:"Grenoble", lat:45.1667, lon:5.7167}; // Both locations are optional.

var proxyUrl = "proxy.php?url="; // If using FeedEX.js, this should point to a CORS friendly proxy since it's gonna be used to get RSS feeds. Included proxy.php is enough but needs a local web service or to be hosted somewhere.
moment.locale('fr'); // Shouldn't matter

// Add folder names to themesList, then add a line for it following the template.
// Images must be named sequentially from 1 to imageCount. (use AntRenamer or whatever)
var themes = [];
var themesList = ["calm","day","lotr","night","pixel"]; 
var themesLength = 0;
// Template: themes["directory(must be in img/)"] = [imageCount, filetype]; themesLength++;
themes["calm"] = [11,'jpg']; themesLength++;
themes["day"] = [13,'jpg']; themesLength++;
themes["lotr"] = [11,'jpg']; themesLength++;
themes["night"] = [15,'jpg']; themesLength++;
themes["pixel"] = [11,'png']; themesLength++;

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
	{link:"http://www.9gag.com/", label:"9gag"}]};

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
	{link:"http://192.168.0.254/", label:"Router"}]};
