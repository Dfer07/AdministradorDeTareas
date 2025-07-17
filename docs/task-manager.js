const formulario = document.getElementById("task-form");
const inputFormulario = document.getElementById("task-input");
const ulFormulario = document.getElementById("task-list");
const taskList = document.getElementById("task-list");
const btnToggle = document.getElementById("miSwitch")


function crearTarea(valorInputFormulario) {
    const crearLi = document.createElement("li");
    crearLi.textContent = valorInputFormulario;
    
    const crearDiv = document.createElement("div");
    crearDiv.append(
        crearBotones("Editar", "edit-btn"),
        crearBotones("Eliminar", "delete-btn")
    );
    
  crearLi.append(crearDiv);

  return crearLi;
}

function crearBotones(texto, clase) {
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.className = clase;

  return boton;
}

function eliminarTask(task) {
  if (confirm("Esta seguro que desea borrar este elemento?")) {
    task.target.closest("li").remove();
    actualizarLocalStorage()
  }
}

function editarTask(task) {
  const newMessage = prompt(
    "Editar tarea : ",
    task.target.closest("li").firstChild.textContent
  );
  if (newMessage !== null && newMessage.trim() !== "") {
    task.target.closest("li").firstChild.textContent = newMessage;
    actualizarLocalStorage()
    console.log("desde editar: ",localStorage)
  }
}

function historialDeTaskEnLocalStorage(task) {
  /*JSON.parse convierte texto a object en JS, por otro lado
  localStorage.getItem() devuelve null si no hay valores que 
  coincidan con la key "tarea" por lo cual se pone el or para que si el
  primer sentence es falsy entonces devuelva un arreglo vacio y
  con eso evitamos errores*/
  const tasks = JSON.parse(localStorage.getItem("tarea") || "[]");
  tasks.push(task);

  /* .setItem recib dos parametros "tarea" que es la key y el valor
  que en este caso se pasa de objeto a texto debido a que en 
  localStorage solo acepta texto */
  localStorage.setItem("tarea", JSON.stringify(tasks));
  console.log(localStorage)
}

function cargarTaskDeLocalStorage() {

  const tasks = JSON.parse(localStorage.getItem("tarea") || "[]");
  tasks.forEach((task) => {
    ulFormulario.appendChild(crearTarea(task));
  });
  console.log(localStorage)
}

function actualizarLocalStorage(){
  const tasks = Array.from(ulFormulario.querySelectorAll("li")).map((li)=>li.firstChild.textContent)
  localStorage.setItem("tarea",JSON.stringify(tasks))
}

// function eliminarTaskDeLocalStorage(tarea) {
//   const tasks = JSON.parse(localStorage.getItem("tarea") || "[]");
//   const tasksnew=tasks.filter((task)=>task!==tarea.target.closest("li").firstChild.textContent)
//   localStorage.setItem("tarea",JSON.stringify(tasksnew));console.log(localStorage)
// }

/* inicio del programa */
cargarTaskDeLocalStorage();

if(localStorage.getItem("theme")==='Dark'){
  document.body.classList.add("dark-theme")
  btnToggle.checked=true
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const valorInputFormulario = inputFormulario.value;

  if (valorInputFormulario) {
    ulFormulario.append(crearTarea(valorInputFormulario));
  }

  historialDeTaskEnLocalStorage(valorInputFormulario);

  inputFormulario.value = "";
});

taskList.addEventListener("click", (e) => {
  if (e.target.className === "delete-btn") {
    eliminarTask(e);
  } else if (e.target.className === "edit-btn") {
    editarTask(e);
  }
});

btnToggle.addEventListener("change",()=>{ 
  document.body.classList.toggle("dark-theme")
  


  const themeInLocalStorage = document.body.classList.contains("dark-theme") ? 'Dark' : 'Light'
  localStorage.setItem("theme",themeInLocalStorage)
})

