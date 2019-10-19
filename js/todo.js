function loadTodo() {
	var todo = localStorage.getItem(lsPrefix+"todo"); 
	$("#todobox").html(todo);
}

function saveTodo(){
	var todo = $("#todobox").val(); 
	localStorage.setItem(lsPrefix+"todo", todo);
}

loadTodo();
$("#todobox").change(function() {saveTodo()});