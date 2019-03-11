if (typeof(Storage) !== "undefined") {
	if (localStorage.getItem("theme") == null) {
		localStorage.theme = defaultTheme;
	}
	if (localStorage.getItem("blur") == null) {
		localStorage.blur = "false";
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

for (var key in themes) {
	var element = '<option value="'+key+'"';

	if(key==localStorage.theme) {
		element += ' selected ';
	}
	element += '>'+key+'</option>';

	$(".themeSelector").append(element);
}

function changeTheme() {
	localStorage.theme = $(".themeSelector option:selected").val();
	selectRandomBackground();
}

function toggleBlur(){
	if ( localStorage.blur!="true" ) {
		localStorage.blur="true";
		document.getElementById('bg').style.filter = 'url(#blur)';
		document.getElementById('bg').style.WebkitFilter = 'url(#blur)';
	} else {
		localStorage.blur="false";
		document.getElementById('bg').style.filter = 'none';
		document.getElementById('bg').style.WebkitFilter = 'none';
	}
}
if (localStorage.blur=="true") {
	document.getElementById('bg').style.filter = 'url(#blur)';
	document.getElementById('bg').style.WebkitFilter = 'url(#blur)';
}

selectRandomBackground();
