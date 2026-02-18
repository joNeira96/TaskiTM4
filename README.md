 Proyecto Módulo 4  
Aplicación de Gestión de Tareas en JavaScript

*Descripción general

El objetivo de este proyecto fue desarrollar una aplicación web que permitiera gestionar tareas utilizando JavaScript moderno.  
La aplicación ofrece agregar, eliminar y visualizar tareas, integrando información desde una API externa, utilizando operaciones asíncronasy almacenamiento local (localStorage).y tambien un Gestor de Tareas que está pensado para que el usuario pueda ingresar una nueva tarea y definir el tiempo estimado para realizarla, el cual se calcula en días. A continuación se ecplicará el codigo por partes, respetando tambien los requirimientos de la consigna. 

* Funcionamiento de la aplicación
Primero, para utilizar el gestor de tareas, el usuario debe:
1. Ingresar una descripción de la tarea.
2. Seleccionar la duración de la tarea en días.
3. Agregar la tarea, la cual se mostrará automáticamente en pantalla.

Cada tarea muestra su descripción y los días restantes para su vencimiento.

*Estructura del código

 Se crean las constantes necesarias para interactuar con el DOM y manejar los distintos elementos de la aplicación.
Posteriormente, se implementan las clases principales:

Clase Tarea
Esta clase representa una tarea individual.  
Contiene información como:
- Identificador
- Descripción
- Estado
- Fecha de creación
- Fecha límite  

Además, incluye un método que permite calcular los días restantes para completar la tarea.

Clase Gestor de Tareas
Esta clase se encarga de administrar el conjunto de tareas.  
Permite:
- Agregar tareas
- Eliminar tareas
- Guardar y recuperar información desde localStorage

Gracias a esto, las tareas permanecen almacenadas incluso al recargar la página.


*Renderizado y visualización

Para poder mostrar las tareas ingresadas y su información, se implementa la función renderizarTareas(), la cual se encarga de recorrer la lista de tareas y mostrarlas dinámicamente en la interfaz.

Además, se incluye una función que permite visualizar el contenido almacenado en el localStorage.

Uso de API externa y asincronía

La aplicación utiliza una API externa para simular el consumo de datos y practicar el uso de JavaScript asíncrono.  
Mediante funciones async/await, se obtiene información desde la API y se integran tareas al gestor.

Esta parte del código permite simular el retardo en la carga de datos y reforzar el manejo de promesas.



*Manipulación del DOM y eventos

El proyecto hace uso de la manipulación del DOM para interactuar con el usuario.  
Se capturan eventos como:
- Click en botones
- Envío de formularios
Esto permite ejecutar las funciones correspondientes y asegurar un correcto funcionamiento de la aplicación.
*Estilos CSS

Finalmente, se agregaron estilos CSS básicospara mejorar la apariencia visual de la aplicación.

*Conclusión

Este proyecto integra conceptos fundamentales de JavaScript como:
- Programación orientada a objetos
- Asincronía
- Consumo de APIs
- Manipulación del DOM
- Uso de localStorage

Cumpliendo así con los objetivos planteados para el proyecto del módulo 4.

