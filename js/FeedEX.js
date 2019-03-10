/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1+
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL, edited by Naharamas(added options + removed dependency from third-party service) */

(function ($) {
	$.fn.FeedEk = function (opt) {
		var def = $.extend({
			MaxCount: 5,
			MaxDaysLate: 7,
			OldestFirst: false, // Can be useful for webcomics
			ShowDesc: true,
			DescCharacterLimit: 0,
			ShowPubDate: true,
			DateFormat: "", // See moment.js documentation
			DateFormatLang: "fr",
			TitleLinkTarget:'_blank',
			Callback: function(){}
		}, opt);

		var id = $(this).attr("id"), s = "";
		$("#" + id).empty();
		if (def.FeedUrl == undefined) return;
		$("#" + id).append('<img src="img/loader.gif" />');
		$.ajax({
			url: encodeURI(proxyUrl+def.FeedUrl),
			dataType: "text",
			success: function (result) {
				var feed = new Feed(result);
				$("#" + id).empty();

				if (feed==null || feed.items==null || feed.items.length==0)
					return;				

				if(def.OldestFirst) {
					var t = feed.items.reverse();
					feed.items = t;
				}

				$.each(feed.items, function (e, itm) {
					if(def.MaxCount>0 && e==def.MaxCount) {
						return false;
					}
					var dt = moment(itm.publishDate);
					if(def.OldestFirst==true && def.MaxDaysLate>0 && dt.isBefore(moment().subtract(def.MaxDaysLate, 'days'))) {
						return;
					}
					else if(def.OldestFirst==false && def.MaxDaysLate>0 && dt.isBefore(moment().subtract(def.MaxDaysLate, 'days'))) {
						return false;
					}

					s += '<li><div class="itemTitle"><a href="' + itm.link + '" target="' + def.TitleLinkTarget + '" >' + itm.title + '</a></div>';

					if (def.ShowPubDate) {
						s += '<div class="itemDate">';
						if ($.trim(def.DateFormat).length > 0) {
							s += dt.format(def.DateFormat);
						}
						else {
							s += dt.format("LLL");
						}
						s += '</div>';
					}
					if (def.ShowDesc) {
						s += '<div class="itemContent">';
						if (def.DescCharacterLimit > 0 && itm.description.length > def.DescCharacterLimit) {
							s += itm.description.substring(0, def.DescCharacterLimit) + '...';
						}
						else {
							s += itm.description;
						}
						s += '</div>';
					}
				});

				$("#" + id).append('<ul class="feedEkList">' + s + '</ul>');
				def.Callback();
			}
		});
	};
})(jQuery);
