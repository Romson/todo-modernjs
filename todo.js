const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', (event) => {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#checkbox-hide-completed').addEventListener('change', (event) => {
    filters.hideCompleted = event.target.checked;
    renderTodos(todos, filters);
})

document.querySelector('#name-form').addEventListener('submit', (event) => {
    event.preventDefault();
    todos.push({
        title: event.target.elements.addTodo.value,
        completed: false
    });

    saveTodos(todos);     
    renderTodos(todos, filters);
    event.target.elements.addTodo.value = '';
});