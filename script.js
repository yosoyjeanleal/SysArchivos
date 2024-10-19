const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Verificar si el examen ya fue realizado
if (localStorage.getItem('examenRealizado')) {
    document.getElementById('examen-container').innerHTML = '<h2>Ya has realizado este examen.</h2>';
} else {
    // Cargar el nombre del estudiante si ya está guardado
    const nombreGuardado = localStorage.getItem('nombreEstudiante');
    if (nombreGuardado) {
        document.getElementById('nombre').value = nombreGuardado;
        iniciarExamen();
    }
}

// Función para iniciar el examen
function iniciarExamen() {
    const nombre = document.getElementById('nombre').value;
    if (nombre) {
        localStorage.setItem('nombreEstudiante', nombre);
        document.getElementById('inicio').style.display = 'none';
        document.getElementById('preguntas-container').style.display = 'block';
        document.getElementById('nombre-estudiante').innerText = nombre;
    } else {
        alert('Por favor, ingrese su nombre.');
    }
}

document.getElementById('comenzar-btn').addEventListener('click', iniciarExamen);

// Función de arrastrar y soltar
const draggables = document.querySelectorAll('.drag-item');
const dropzones = document.querySelectorAll('.drop-zone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', function() {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', function() {
        draggable.classList.remove('dragging');
    });
});

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        dropzone.appendChild(dragging);
    });
});

// Finalizar examen y calcular calificación
document.getElementById('finalizar-btn').addEventListener('click', function() {
    let calificacion = 0;
    let respuestasCorrectasHTML = "<h4>Respuestas correctas:</h4><ul>";

    // Pregunta 1 (2 puntos)
    const respuesta1 = document.querySelector('input[name="q1"]:checked');
    if (respuesta1 && respuesta1.value === '1') {
        calificacion += 2; // Sumar 2 puntos
    } else {
        respuestasCorrectasHTML += "<li>1. System.IO.File</li>"; // Respuesta correcta
    }

    // Pregunta 2 (2 puntos)
    const respuestas2 = document.querySelectorAll('input[name="q2"]:checked');
    const respuestasCorrectas2 = Array.from(respuestas2).filter(input => input.value === '1');
    if (respuestasCorrectas2.length === 3) {
        calificacion += 2; // Sumar 2 puntos
    } else {
        respuestasCorrectasHTML += "<li>2. StreamWriter, StreamReader, FileStream</li>"; // Respuestas correctas
    }

    // Pregunta 3 (2 puntos por respuesta correcta)
    let correctasCount = 0;
    dropzones.forEach(dropzone => {
        const item = dropzone.querySelector('.drag-item');
        if (item && item.id === dropzone.dataset.answer) {
            correctasCount++;
        } else {
            respuestasCorrectasHTML += `<li>${dropzone.dataset.answer}</li>`; // Respuesta correcta
        }
    });
    calificacion += correctasCount; // Sumar puntos por respuestas correctas (1 punto cada una)

    respuestasCorrectasHTML += "</ul>";
    // Mostrar resultados
    document.getElementById('preguntas-container').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
    document.getElementById('nombre-resultado').innerText = localStorage.getItem('nombreEstudiante');
    document.getElementById('calificacion').innerText = calificacion;
    document.getElementById('respuestas-correctas').innerHTML = respuestasCorrectasHTML;

    // Guardar en localStorage para que solo se pueda hacer una vez
    localStorage.setItem('examenRealizado', true);
});

// Volver a calificación
document.getElementById('volver-btn').addEventListener('click', function() {
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    localStorage.removeItem('examenRealizado'); // Permitir volver a hacer el examen
});