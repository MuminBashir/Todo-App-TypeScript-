export const saveTodos = (todos: TodoItemType[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = (): TodoItemType[] => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};
