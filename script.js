document.getElementById('burger').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});
document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.getElementById('nombre-estudiante');
    const comenzarBtn = document.getElementById('comenzar-examen');
    const preguntasDiv = document.getElementById('preguntas');
    const examenForm = document.getElementById('examen-form');
    const resultadoDiv = document.getElementById('resultado');
    const nombreResultado = document.getElementById('nombre-resultado');
    const calificacionResultado = document.getElementById('calificacion');

    const drag1 = document.getElementById("drag1");
    const drag2 = document.getElementById("drag2");
    const drag3 = document.getElementById("drag3");
    const dropZone = document.getElementById("drop-zone");

    // Verificar si el examen ya fue completado
    if (localStorage.getItem('examenHecho')) {
        mostrarResultado();
        return; // Detener el resto del código si el examen ya fue hecho
    }

    // Solo permitir ingresar el nombre una vez
    if (localStorage.getItem('nombreEstudiante')) {
        nombreInput.value = localStorage.getItem('nombreEstudiante');
        nombreInput.disabled = true;
        comenzarBtn.disabled = true;
        preguntasDiv.style.display = 'block';
        document.getElementById('nombre-prompt').style.display = 'none';
    }

    comenzarBtn.addEventListener('click', function() {
        if (nombreInput.value.trim() === '') {
            alert('Por favor ingrese su nombre');
        } else {
            localStorage.setItem('nombreEstudiante', nombreInput.value);
            preguntasDiv.style.display = 'block';
            nombreInput.style.display = 'none';
            comenzarBtn.style.display = 'none';
            document.getElementById('nombre-prompt').style.display = 'none';
        }
    });

    examenForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const respuestasCorrectas = {
            p1: 'c',
            p2: 'b',
            p3: 'a',
            p4: 'c',
            // Comparar la respuesta de arrastrar y soltar
            drag: 'StreamWriter'
        };

        let puntaje = 0;
        const respuestas = new FormData(examenForm);
        respuestas.forEach((valor, clave) => {
            if (valor === respuestasCorrectas[clave]) {
                puntaje++;
            }
        });

        // Verificar si la respuesta arrastrada es correcta
        if (dropZone.textContent.trim() === respuestasCorrectas.drag) {
            puntaje++;
        }

        // Guardar resultado y nombre en localStorage
        localStorage.setItem('calificacion', puntaje);
        localStorage.setItem('examenHecho', true);
        mostrarResultado();
    });

    // Funciones para arrastrar y soltar
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);
        dropZone.textContent = draggedElement.textContent;
    }

    // Ligar eventos de arrastrar y soltar
    dropZone.addEventListener('dragover', allowDrop);
    drag1.addEventListener('dragstart', drag);
    drag2.addEventListener('dragstart', drag);
    drag3.addEventListener('dragstart', drag);
    dropZone.addEventListener('drop', drop);

    function mostrarResultado() {
        const nombreEstudiante = localStorage.getItem('nombreEstudiante');
        const calificacion = localStorage.getItem('calificacion');

        preguntasDiv.style.display = 'none';
        resultadoDiv.style.display = 'block';
        nombreResultado.textContent = 'Nombre: ' + nombreEstudiante;
        calificacionResultado.textContent = 'Calificación: ' + calificacion + '/5';
    }

    // Mostrar/ocultar menú hamburguesa
    document.getElementById('burger').addEventListener('click', function() {
        var navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('open');
    });
});