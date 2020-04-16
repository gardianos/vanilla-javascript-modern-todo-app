//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click" , deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event){
	//Prevent form from submitting
	event.preventDefault();
	//Todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText=todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	// ADD TODOS TO LOCAL STORAGES
	saveLocalTodos(todoInput.value);
	//Check mark buutton
	const completedButton = document.createElement('button');
	completedButton.innerHTML='<i class="fas fa-check"> </i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//Check trash buutton
	const trashButton = document.createElement('button');
	trashButton.innerHTML='<i class="fas fa-trash"> </i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	//Append to list
	todoList.appendChild(todoDiv);

	//Clear todo input value
	todoInput.value="";

}

function deleteCheck(e){
	const item = e.target;
	//DELETE
	if (item.classList[0] === "trash-btn"){
		const todo = item.parentElement;
		//Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function(){
		 todo.remove();
		});
	}

	//check mark 

	if (item.classList[0] === "complete-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch (e.target.value) {
			case "all":
			todo.style.display = "flex";
			 break;
			 case "completed":
			 if (todo.classList.contains("completed")){
			 	todo.style.display = "flex";

			 }else {
			 	todo.style.display = "none";
			 }
			 break;
			 case "uncompleted":
			 if(!todo.classList.contains("completed")){
			 	todo.style.display = "flex";
			 }else{
			 	todo.style.display="none";
			 }
		}
	});
}
//Save Data Local Storage

function saveLocalTodos(todo){
	//Check do  i already have thing there?
	let todos;
	if (localStorage.getItem("todos") === null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
	//Check do  i already have thing there?
	let todos;
	if (localStorage.getItem("todos") === null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
		//Todo div
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText=todo;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	
	//Check mark buutton
	const completedButton = document.createElement('button');
	completedButton.innerHTML='<i class="fas fa-check"> </i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//Check trash buutton
	const trashButton = document.createElement('button');
	trashButton.innerHTML='<i class="fas fa-trash"> </i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	//Append to list
	todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	//Check do  i already have thing there?
	let todos;
	if (localStorage.getItem("todos") === null){
		todos=[];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	//Grab the index in array of element
	const todoIndex = todo.children[0].innerText;
	//Check array for one specific element and remowe 
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}

//localStorage.clear() if you have any datas in local storage.