function populateTodo() {
	var todo = localStorage.getItem("todo"); 
	document.getElementById('todobox').innerHTML = todo;
}

function saveTodo(){
	var todotext = $("#todobox").val(); 
	localStorage.setItem("todo", todotext);
}

populateTodo();
document.getElementById('todobox').onchange = function() { saveTodo() };