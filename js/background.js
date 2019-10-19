if (localStorage.getItem(lsPrefix+"theme") == null) {
	localStorage.setItem(lsPrefix+"theme", defaultTheme);
}
if (localStorage.getItem(lsPrefix+"blur") == null) {
	localStorage.setItem(lsPrefix+"blur", "false");
}

var currentID = 1;
var currentTheme = localStorage.getItem(lsPrefix+"theme");

function changeTheme(newTheme) {
	currentTheme = newTheme;
	localStorage.setItem(lsPrefix+"theme", newTheme);
	selectRandomBackground();
}

for (var key in themes) {
	var element = '<option value="'+key+'"';

	if(key==currentTheme) {
		element += ' selected ';
	}
	element += '>'+key+'</option>';

	$(".themeSelector").append(element);
}

function changeBackground(newID) {
	currentID = newID;
	$('#bg').css('background', 'url(img/'+currentTheme+'/'+currentID+'.'+themes[currentTheme].filetype+')  fixed center / cover');
}

function selectRandomBackground() {
	newID = Math.floor(Math.random() * themes[currentTheme].amount)+1;
	changeBackground(newID);
}
function selectNextBackground() {
	var newID = currentID+1;
	if(newID>themes[currentTheme].amount) {
		newID = 1;
	}
	changeBackground(newID);
}
function selectPreviousBackground() {
	var newID = currentID-1;
	if(newID<1) {
		newID = themes[currentTheme].amount;
	}
	changeBackground(newID);
}

function toggleBlur() {
	if (localStorage.getItem(lsPrefix+"blur")!="true") {
		localStorage.setItem(lsPrefix+"blur", "true");
		$('#bg').css('filter', 'url(#blur)');
	} else {
		localStorage.setItem(lsPrefix+"blur", "false");
		$('#bg').css('filter', 'none');
	}
}

if (localStorage.getItem(lsPrefix+"blur")=="true") {
	$('#bg').css('filter', 'url(#blur)');
}

selectRandomBackground();