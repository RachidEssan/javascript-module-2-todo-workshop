let todos = []

function createTodo(text) {
    todos.push({
        title: text,
        completed: false,
    })
    saveTodosToLocalStorage()
}

// create new todo button

document.querySelector("#new-todo").addEventListener('submit', function (event) {
    event.preventDefault()
    const text = event.target.elements.text.value.trim()
    if (text.length > 0) {
        createTodo(text)
        event.target.elements.text.value = ""
    }
    console.log(renderTodos(todos))
})

// generate todos fucntion

function generateTodoDOM(todoObj) {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const todoText = document.createElement("span")
    
    // setup checkbox

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    todoEl.classList.add("list-item")
    containerEl.classList.add("list-item__container")
    todoEl.appendChild(containerEl)


    // remove todo button

    const removeButton = document.createElement("button")
    removeButton.textContent = "remove"
    removeButton.classList.add("button--text", "button")
    todoEl.appendChild(removeButton)

    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}

function toggleTodo(title) {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
        saveTodosToLocalStorage()
    }
}

// remove todos function

function removeTodo(title) {
    const todoIndex = todos.findIndex((todo) => {
        return todo.title.toLowerCase() === title.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodosToLocalStorage()
    }
}

// create filter todos

const filters = {
    searchTitle: "",
    showFinished: false,
    showUnfinished: false,
}

function setFilters(updates) {
    if (typeof updates.searchTitle === "string" ) {
        filters.searchTitle = updates.searchTitle
    }
    if (typeof updates.showFinished === "boolean") {
        filters.showFinished = updates.showFinished
    }
    if (typeof updates.showUnfinished === "boolean") {
        filters.showUnfinished = updates.showUnfinished
    }

}

document.querySelector("#search-text").addEventListener("input", function (event) {
    setFilters({
        searchTitle: event.target.value
    })
    renderTodos(todos)
})

document.querySelector("#show-finished").addEventListener("change", function (event) {
    setFilters({
        showFinished: event.target.checked
    })
    renderTodos(todos)
})

document.querySelector("#show-unfinished").addEventListener("change", function (event) {
    setFilters({
        showUnfinished: event.target.checked
    })
    renderTodos(todos)
})

// display todos function

function renderTodos(todos) {
    
    // filtered todos
    let filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    if (filters.showFinished && filters.showUnfinished) {

    } else if (filters.showFinished) {
        filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if (filters.showUnfinished) {
        filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    }

    const todoList = document.querySelector("#todos")
    todoList.innerHTML = ''
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement("p")
        messageEl.classList.add("empty-message")
        messageEl.textContent = "There are no todos to show"
        todoList.appendChild(messageEl)

    }
}

function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

function fetchTodosFromLocalStorage() {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON) {
        todos = JSON.parse(todosJSON)
    } else {
        todos = []
    }
}

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        fetchTodosFromLocalStorage()
        renderTodos(todos)
    }
})

fetchTodosFromLocalStorage()
renderTodos(todos)