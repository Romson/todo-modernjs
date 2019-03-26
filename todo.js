const todos = [
    {title: 'Order cat food', completed: false},
    {title: 'Clean kitchen', completed: false},
    {title: 'Buy coffee', completed: false},
    {title: 'Do work', completed: true},
    {title: 'Exercise', completed: false},
    {title: 'Learn JS', completed: false}
];

// Keys to store input.value and default to show/hide completed to false
const filters = {
    searchText: '',
    hideCompleted: false
}

// Function to search todos for entered text 
const renderTodos = (todos, filters) => {

    // Variable which filters the todos and returns match if it includes entered text. And to show/hide completed items.
    const  filteredTodos = todos.filter((todo) => {
        const searchText = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleted = !filters.hideCompleted || !todo.completed;
        return  searchText && hideCompleted;
    });

    // Empty the div element to return only match items. Else duplicates will show
    document.querySelector('#todos').innerHTML = '';

    // Filter() method to get items not completed
    const toBeCompleted = filteredTodos.filter((item) => {
    return !item.completed
    });

    // Create H2 for completed items left.
    const todosLeft = document.createElement('h2');

    // textContent for completed items left
    todosLeft.textContent = `You have ${toBeCompleted.length} todos left to complete`; 

    // Append to DOM
    document.querySelector('#todos').appendChild(todosLeft);

    // forEach() on variable above to create new p tag, with matching text and appendChild in div element.
    filteredTodos.forEach((todo) => {

        const todoEl = document.createElement('p');
        todoEl.textContent = todo.title;
        document.querySelector('#todos').appendChild(todoEl);

        // Strikethrough if todo is set to true/completed
        if(todo.completed === true) {
            todoEl.style.textDecoration = "line-through";
            // Add class if completed
            todoEl.classList.add('completed');
        }
    });
};

// Render the above
renderTodos(todos, filters);

// Listen for input change and update filters.searchText
document.querySelector('#search-text').addEventListener('input', (event) => {
    filters.searchText = event.target.value;
    renderTodos(todos, filters);
})

// Listen for checkbox change and update hideCompleted
document.querySelector('#checkbox-hide-completed').addEventListener('change', (event) => {
    filters.hideCompleted = event.target.checked;
    renderTodos(todos, filters);
})

// Prevent default action on form input field
document.querySelector('#name-form').addEventListener('submit', (event) => {
    // Prevent adding input value to url
    event.preventDefault();
    // Add new object in todos array based on form input value
    todos.push({
        title: event.target.elements.addTodo.value,
        completed: false
    });
        
    // Rerender the application
    renderTodos(todos, filters);

    // Clear input field after new todo added
    event.target.elements.addTodo.value = '';

});