/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1+
* https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL, edited by Naharamas(added options) */

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
			url: "https://feed.jquery-plugins.net/load?url=" + encodeURIComponent(def.FeedUrl) + "&maxCount=" + def.MaxCount + "&dateCulture=" + def.DateFormatLang + "&dateFormat=" + def.DateFormat,
			dataType: "json",
			success: function (result) {
				$("#" + id).empty();
				if (result.data == null)
					return;

				if(def.OldestFirst) {
					var t = result.data.reverse();
					result.data = t;
				}

				$.each(result.data, function (e, itm) {
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
				def.Callback(id);
			}
		});
	};
})(jQuery);
