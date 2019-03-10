function setHeader() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var sunTimes = null;
	if (weatherLocation1 != null) {
		sunTimes = SunCalc.getTimes(date, weatherLocation1.lat, weatherLocation1.lon);
	}
	else if (weatherLocation2 != null) {
		sunTimes = SunCalc.getTimes(date, weatherLocation2.lat, weatherLocation2.lon);
	}
	else {
		sunTimes = SunCalc.getTimes(date, 45.1667, 5.7167); // Defaults to Grenoble
	}

	// Header title
	if (date.getDate()==birthDay && date.getMonth()+1==birthMonth) {
		document.getElementById("titletext").innerHTML = "Happy birthday !";
	}
	else if (((hours==sunTimes.nauticalDawn.getHours() && minutes>=sunTimes.nauticalDawn.getMinutes()) || hours>sunTimes.nauticalDawn.getHours()) && ((hours==sunTimes.sunrise.getHours() && minutes<sunTimes.sunrise.getMinutes()) || hours<sunTimes.sunrise.getHours())) {
		document.getElementById("titletext").innerHTML = "It's dawn...";
	}
	else if (((hours==sunTimes.sunrise.getHours() && minutes>=sunTimes.sunrise.getMinutes()) || hours>sunTimes.sunrise.getHours()) && ((hours==sunTimes.sunriseEnd.getHours() && minutes<sunTimes.sunriseEnd.getMinutes()) || hours<sunTimes.sunriseEnd.getHours())) {
		document.getElementById("titletext").innerHTML = "Sun is rising...";
	}
	else if (((hours==sunTimes.sunriseEnd.getHours() && minutes>=sunTimes.sunriseEnd.getMinutes()) || hours>sunTimes.sunriseEnd.getHours()) && ((hours==sunTimes.solarNoon.getHours() && minutes<sunTimes.solarNoon.getMinutes()) || hours<sunTimes.solarNoon.getHours())) {
		document.getElementById("titletext").innerHTML = "Good morning!";
	}
	else if (((hours==sunTimes.solarNoon.getHours() && minutes>=sunTimes.solarNoon.getMinutes()) || hours>sunTimes.solarNoon.getHours()) && ((hours==sunTimes.sunsetStart.getHours() && minutes<sunTimes.sunsetStart.getMinutes()) || hours<sunTimes.sunsetStart.getHours())) {
		document.getElementById("titletext").innerHTML = "Good afternoon!";
	}
	else if (((hours==sunTimes.sunsetStart.getHours() && minutes>=sunTimes.sunsetStart.getMinutes()) || hours>sunTimes.sunsetStart.getHours()) && ((hours==sunTimes.sunset.getHours() && minutes<sunTimes.sunset.getMinutes()) || hours<sunTimes.sunset.getHours())) {
		document.getElementById("titletext").innerHTML = "Sun is setting...";
	}
	else if (((hours==sunTimes.sunset.getHours() && minutes>=sunTimes.sunset.getMinutes()) || hours>sunTimes.sunset.getHours()) && ((hours==sunTimes.nauticalDusk.getHours() && minutes<sunTimes.nauticalDusk.getMinutes()) || hours<sunTimes.nauticalDusk.getHours())) {
		document.getElementById("titletext").innerHTML = "It's dusk...";
	}
	else if (((hours==sunTimes.nauticalDusk.getHours() && minutes>=sunTimes.nauticalDusk.getMinutes()) || hours>sunTimes.nauticalDusk.getHours()) || ((hours==sunTimes.nauticalDawn.getHours() && minutes<sunTimes.nauticalDawn.getMinutes()) || hours<sunTimes.nauticalDawn.getHours())) {
		document.getElementById("titletext").innerHTML = "Goodnight!";
	}
}

// Header title/weather panel switching
var wide = window.matchMedia( "screen and (min-width: 840px)" );
function toggleVisibility(id1, id2) {
	var hide = document.getElementById(id1);
	var show = document.getElementById(id2);
	hide.style.height = '0px';
	hide.style.overflow = 'hidden';
	
	if (wide.matches){
		show.style.height = '100px';
	}
	else {
		show.style.height = '80px';
	}
}

var weatherLoaded='false';
// Only load weather on click
function loadWeather() {
	if (weatherLoaded=='false') {
		if(weatherLocation1 != null) {
			$.simplerWeather({
				location: weatherLocation1.lat+','+weatherLocation1.lon,
				apikey: weatherAPIKey,
				units: 'c',
				success: function(weather) {
					html = '<p>'+weatherLocation1.name+'<br />';
					html += Math.round(weather.temp)+'&deg;'+weather.unit+'<br />';
					html += weather.currently+'</p>';
					$("#weather").html(html);
				},
				error: function(error) {
					$("#weather").html('<p>'+error+'</p>');
				}
			});
		}

		if (weatherLocation2 != null) {
			$.simplerWeather({
				location: weatherLocation2.lat+','+weatherLocation2.lon,
				apikey: weatherAPIKey,
				units: 'c',
				success: function(weather) {
					html = '<p>'+weatherLocation2.name+'<br />';
					html += Math.round(weather.temp)+'&deg;'+weather.unit+'<br />';
					html += weather.currently+'</p>';
					$("#weather2").html(html);
				},
				error: function(error) {
					$("#weather2").html('<p>'+error+'</p>');
				}
			});
		}

		weatherLoaded='true';
	}
}

setHeader();