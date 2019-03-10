if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("favboxes") == null) {
        localStorage.favboxes = JSON.stringify(defaultFavboxes);
        console.log("No stored favboxes, faveboxes set to default.")
    }
    var favboxes = JSON.parse(localStorage.getItem("favboxes"));
}
else {
    console.log("No local storage available, faveboxes set to default.");
    var favboxes = defaultFavboxes;
}

function reset() {
    // TODO: Add confirmation
    localStorage.removeItem('favboxes');
    location.reload(true);
}

function setTitle(box, title) {
    $("#"+box+" h1:first").text(title);
}

function addItem(box, item) {
    $("#"+box+" ul").append("<li><a href=\""+item.link+"\">"+item.label+"</a></li>");
}

function addPopup(box) {
    newFavLink = prompt("Link ?", "");
    if (newFavLink != null && newFavLink != "") {
        newFavLabel = prompt("Label ?", "");
        if (newFavLabel != null && newFavLabel != "") {
            newFav = {link:newFavLink, label:newFavLabel};
            addItem(box, newFav);
            sortable('.sortable', 'reload');
        }
    }
}

function titlePopup(box) {
    newTitle = prompt("Title ?", favboxes[box].title);
    if (newTitle != null && newTitle != "") {
        setTitle(box, newTitle);
    }
}

var editMode = false;

function editOn() {
    // TODO: Remove buttons and add keyboard shortcuts instead ?
    $("#hiddenButtonsRight").append("<button class=\"resetButton\" onclick=\"reset();\">!</button>");
    for(i=1; i<=6; i++) {
        // TODO: Add a way to change box title
        $("#favbox"+i+" ul").after("<span class=\"button\" onClick=\"addPopup(\'favbox"+i+"\');\">[+]</span>");
    }
    $("#hiddenButtonsRight").after('<div class="d1x1" id="junkbox"><h1 class="bracket">Junk</h1><ul class="sortable fav-connected"><li class="noSort">Drop junk elements here</li></ul></div>');
    sortable('.sortable', {
        connectWith: 'fav-connected',
        items: ':not(.noSort)',
        placeholder: '<li style="border: 1px solid #fff;"> </li>',
        forcePlaceholderSize: true
    });
    editMode = true;
}

function editOff() {
    $(".resetButton").remove();
    $("#junkbox").remove();
    for(i=1; i<=6; i++) {
        $("#favbox"+i+" span:last").remove();
        newTitle = $("#favbox"+i+" h1").text();
        favboxes["favbox"+i].title = newTitle;
        favboxes["favbox"+i].items = [];
        $("#favbox"+i+" ul li a").each(function(index) {
            newFav = {link:$(this).attr('href'), label:$(this).text()};
            console.log(index + " " + newFav);
            favboxes["favbox"+i].items.push(newFav); 
        });
    }
    sortable('.sortable', 'destroy');
    localStorage.favboxes = JSON.stringify(favboxes);
    editMode = false;
}

function editToggle() {
    if(editMode==true) {
        editOff();
    }
    else {
        editOn();
    }
}

function initFavboxes() {
    for(i=1; i<=6; i++) {
        setTitle("favbox"+i, favboxes["favbox"+i].title);
        for(j=0; j<favboxes["favbox"+i].items.length; j++) {
            addItem("favbox"+i, favboxes["favbox"+i].items[j])
        }
    }
}

initFavboxes();
