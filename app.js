//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

function addTodo(e){

    e.preventDefault()
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create li
    const newTodo = document.createElement("li")
    //get value from input field
    newTodo.innerText = todoInput.value
    //save to local storage
    saveToLocalStorage(todoInput.value)
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //check mark button
    const completedButton = document.createElement("button")
    // completedButton.innerText = '<i class="fas fa-check"></i>'
    completedButton.innerHTML ='<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton)
    //check trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML ='<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    //append to list
    todoList.appendChild(todoDiv)
    todoInput.value = ""

}

function deleteCheck(e){

    e.preventDefault()
    const item = e.target
    //delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", () => {
            todo.remove()
        })
    }
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }  

}

function filterTodo(e){

    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none"
                }
                break;
        }
    })

}

function saveToLocalStorage(todo){
    //check to see if i have a todo already
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function removeLocalTodos(todo){

    let todos;
    console.log({todo});
    if(localStorage.getItem("todos") === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1);
    //save rest back to local storage
    localStorage.setItem("todos", JSON.stringify(todos))

}

function getTodos(){

    let todos;
    if(localStorage.getItem("todos" === null)){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    if(todos){
        todos.forEach((todo) => {
            //create div
            const todoDiv = document.createElement("div")
            todoDiv.classList.add("todo")
            //create list
            const newTodo = document.createElement("li")
            newTodo.classList.add("todo-item")
            newTodo.innerText = todo
            //adding list to parent container
            todoDiv.appendChild(newTodo)
            //reset value back to empty string
            todoInput.value = ""
            //create complete button
            const completedButton = document.createElement("button")
            completedButton.innerHTML = '<i class="fas fa-check"></i>'
            completedButton.classList.add("complete-btn")
            todoDiv.appendChild(completedButton)
            //create trash button
            const trashButton = document.createElement("button")
            trashButton.innerHTML = '<i class="fas fa-trash"></i>'
            trashButton.classList.add("trash-btn")
            todoDiv.appendChild(trashButton)
            //now attach the whole todo to the todolist
            todoList.appendChild(todoDiv)
        })
    }
    
}