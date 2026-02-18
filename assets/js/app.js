// Creacion de constantes
const registroTarea = document.getElementById("registroTarea");
const duracionTarea = document.getElementById("duracionTarea");
const agregarTarea = document.getElementById("agregarTarea");
const listaTarea = document.getElementById("listaTarea");
const limpiarListaBtn = document.getElementById("limpiarLista");
const storageView = document.getElementById("storage");
const cargarApiBtn = document.getElementById("cargarApi");
const estadoCarga = document.getElementById("estadoCarga");

// uso de apis
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Creacion de clase Tarea y clase GestorTareas para uso de metodos (agregar, eliminar y guardar)
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion, fechaLimite) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaLimite = fechaLimite;
  }

  obtenerDiasRestantes() {
    const ms = this.fechaLimite - Date.now();
    return Math.ceil(ms / (1000 * 60 * 60 * 24));
  }
}

class GestorTareas {
  constructor() {
    const data = JSON.parse(localStorage.getItem("tareas")) || [];
    this.tareas = data.map(t =>
      new Tarea(t.id, t.descripcion, t.estado, t.fechaCreacion, t.fechaLimite)
    );
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
    this.guardar();
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardar();
  }

  guardar() {
    localStorage.setItem("tareas", JSON.stringify(this.tareas));
    mostrarStorage();
  }
}

const gestor = new GestorTareas();

// mostrar tareas
const renderizarTareas = () => {
  listaTarea.innerHTML = "";

  gestor.tareas.forEach(t => {
    const li = document.createElement("li");

    const dias = t.obtenerDiasRestantes();
    li.textContent =
      dias > 0
        ? `${t.descripcion} - ${dias} día(s) restantes`
        : `${t.descripcion} - Tarea vencida`;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => {
      gestor.eliminarTarea(t.id);
      renderizarTareas();
    };

    li.appendChild(btn);
    listaTarea.appendChild(li);
  });
};

const mostrarStorage = () => {
  const data = JSON.parse(localStorage.getItem("tareas")) || [];
  storageView.textContent = JSON.stringify(data, null, 2);
};

// uso de Api Externa y promesas
const guardarTareaAPI = async (descripcion, estado, dias) => {
  try {
    
    estadoCarga.textContent = "Guardando tarea en la API...";
    agregarTarea.disabled = true;

    const fechaCreacion = Date.now();
    const fechaLimite = fechaCreacion + dias * 24 * 60 * 60 * 1000;

   
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: descripcion,
        completed: estado
      })
    });

    if (!response.ok) {
      throw new Error("Error al guardar en la API");
    }

    const data = await response.json();

    return new Tarea(
      data.id || Date.now(),
      descripcion,
      estado,
      fechaCreacion,
      fechaLimite
    );

  } catch (error) {
    console.error(error);
    alert("Error en la operación asíncrona");
  } finally {
    estadoCarga.textContent = "";
    agregarTarea.disabled = false;
  }
};


const obtenerTareasAPI = async () => {
  try {
    estadoCarga.textContent = "Cargando tareas desde la API...";
    cargarApiBtn.disabled = true;

    // Simulacion tiempo de espera
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener tareas");
    }

    const data = await response.json();

    gestor.tareas = [];

    data.slice(0, 3).forEach(item => {
      const fechaCreacion = Date.now();
      const fechaLimite = fechaCreacion + 2 * 24 * 60 * 60 * 1000;

      gestor.tareas.push(
        new Tarea(
          item.id,
          item.title,
          item.completed,
          fechaCreacion,
          fechaLimite
        )
      );
    });

    gestor.guardar();
    renderizarTareas();

  } catch (error) {
    console.error(error);
    alert("Error en la carga asíncrona");
  } finally {
    estadoCarga.textContent = "";
    cargarApiBtn.disabled = false;
  }
};


// eventos y manipulacion del DOM
agregarTarea.addEventListener("click", async () => {
  if (!registroTarea.value.trim()) return;

  const dias = Number(duracionTarea.value);
  if (!dias || dias <= 0) return;

  const tarea = await guardarTareaAPI(
    registroTarea.value,
    false,
    dias
  );

  if (!tarea) return;

  gestor.agregarTarea(tarea);
  renderizarTareas();

  registroTarea.value = "";
  duracionTarea.value = "";
});

registroTarea.addEventListener("keyup", e => {
  if (e.key === "Enter") agregarTarea.click();
});

limpiarListaBtn.addEventListener("click", () => {
  localStorage.clear();
  gestor.tareas = [];
  renderizarTareas();
  mostrarStorage();
});

cargarApiBtn.addEventListener("click", obtenerTareasAPI);

// inicios
renderizarTareas();
mostrarStorage();
