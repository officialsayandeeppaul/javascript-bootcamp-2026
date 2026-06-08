const buttonE1 = document.querySelector("#button");
const todoList = document.querySelector("#todo_list");

function addTodo() {
  const li = document.createElement("li");
  const inputValue = document.querySelector("input").value;
  const t = document.createTextNode(inputValue);
  li.appendChild(t);

  // check input validation
  if (inputValue === "") {
    alert("Please enter a valid value");
  } else {
    todoList.appendChild(li);
  }
  console.log(inputValue);
  document.querySelector("input").value = "";
}

buttonE1.addEventListener("click", addTodo);
