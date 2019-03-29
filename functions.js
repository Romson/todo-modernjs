const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    }
    else {
        return [];
    }
};

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const renderTodos = (todos, filters) => {

    const  filteredTodos = todos.filter((todo) => {
        const searchText = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleted = !filters.hideCompleted || !todo.completed;
        return  searchText && hideCompleted;
    });

    const toBeCompleted = filteredTodos.filter((item) => {
        return !item.completed
    }); 

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(toBeCompleted));

    filteredTodos.forEach((todo) => {     
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
        
    });
};

const generateTodoDOM = (todo) => {
    const p = document.createElement('p');   
    p.textContent = todo.title;

    if (todo.title.length > 0) {
        p.textContent = todo.title;
    }
    else {
        p.textContent = 'Unnamed Todo';
    }

    if(todo.completed === true) {
        p.style.textDecoration = "line-through";
        p.classList.add('completed');
    }
    return p;
};

const generateSummaryDOM = (toBeCompleted) => {
    const summary = document.createElement('h2');
    summary.textContent = `You have ${toBeCompleted.length} todos left to complete`;
    return summary;
}