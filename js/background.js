if (typeof(Storage) !== "undefined") {
	if (localStorage.getItem("theme") == null) {
		localStorage.theme = defaultTheme;
	}
}

var currentBG = 1;
function selectRandomBackground() {
	currentBG = Math.floor(Math.random() * themes[localStorage.theme][0])+1;
	$('.bg').css('background', 'url(img/'+localStorage.theme+'/'+currentBG+'.'+themes[localStorage.theme][1]+')  fixed center / cover');
}
function selectNextBackground() {
	currentBG++;
	if(currentBG>themes[localStorage.theme][0]) {
		currentBG = 1;
	}
	$('.bg').css('background', 'url(img/'+localStorage.theme+'/'+currentBG+'.'+themes[localStorage.theme][1]+')  fixed center / cover');
}

for (i = 0; i < themesList.length; i++) {
	var element = '<option value="'+themesList[i]+'"';

	if(themesList[i]==localStorage.theme) {
		element += ' selected >'+themesList[i]+'</option>';
	}
	else {
		element += '>'+themesList[i]+'</option>';
	}

	$(".themeSelector").append(element);
}

function changeTheme() {
	localStorage.theme = $(".themeSelector option:selected").val();
	selectRandomBackground();
}

selectRandomBackground();
