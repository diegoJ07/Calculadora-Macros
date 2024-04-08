document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question-container');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const isOpen = question.classList.contains('clicked');
            const answers = document.querySelectorAll('.answer');

            // Cerrar todas las preguntas abiertas excepto la actual
            questions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('clicked');
                }
            });

            // Cerrar todas las respuestas abiertas excepto la actual
            answers.forEach(answer => {
                if (answer.parentElement !== question) {
                    answer.classList.remove('active');
                }
            });

            // Alternar la clase "clicked" en la pregunta actual
            question.classList.toggle('clicked');

            // Alternar la clase "active" en la respuesta actual
            const answer = question.querySelector('.answer');
            answer.classList.toggle('active');
        });
        
        // Detener la propagación del clic en la respuesta
        const answer = question.querySelector('.answer');
        answer.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });
});

// Función para mostrar u ocultar la caja de inicio de sesión
function toggleLoginBox() {
    var loginBox = document.querySelector(".login-box");
    if (loginBox.style.display === "block") {
        loginBox.style.display = "none";
    } else {
        loginBox.style.display = "block";
    }
}

// Event listener para mostrar u ocultar la caja de inicio de sesión al hacer clic en el botón
document.getElementById("login-button").addEventListener("mousedown", function(event) {
    event.stopPropagation(); // Evita que el evento de clic se propague al documento
    toggleLoginBox();
});

// Event listener para cerrar la caja de inicio de sesión al hacer clic fuera de ella
document.addEventListener("mousedown", function(event) {
    var loginBox = document.querySelector(".login-box");
    if (!loginBox.contains(event.target) && event.target !== document.getElementById("login-button")) {
        loginBox.style.display = "none";
    }
});

// Función para validar el inicio de sesión
function validarInicioSesion() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    // Aquí defines la URL del archivo CSV
    var urlCSV = "usuarios.csv";

    // Leer el archivo CSV
    Papa.parse(urlCSV, {
        download: true,
        complete: function(result) {
            console.log("CSV leído:", result); // Agregar este mensaje de consola
            // Recorrer los datos del CSV
            for (var i = 1; i < result.data.length; i++) {
                var usuarioCSV = result.data[i][1];
                var contraseñaCSV = result.data[i][2];

                // Verificar si el usuario y la contraseña coinciden con los del CSV
                if (usuario === usuarioCSV && contraseña === contraseñaCSV) {
                    alert("Inicio de sesión exitoso");
                    console.log("Redireccionando..."); // Agregar este mensaje de consola
                    // Redirigir al usuario a otra página
                    window.location.href = "micuenta.html";
                    return; // Salir de la función después de iniciar sesión exitosamente
                }
            }
            // Si no se encontró el usuario en el CSV
            alert("Usuario o contraseña incorrectos");
        }
    });
}



// Event listener para realizar la validación al hacer clic en el botón de iniciar sesión
document.querySelector(".login-box button").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    validarInicioSesion();
});



function mostrarCalendario() {
    var calendario = document.getElementById("calendario");
    if (calendario.style.display === "none") {
        calendario.style.display = "block";
        generarCalendario(); // Llamada a la función para generar el calendario
    } else {
        calendario.style.display = "none";
    }
}

function generarCalendario() {
    var today = new Date();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();

    var calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    var monthDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (var i = 1; i <= monthDays; i++) {
        var day = document.createElement("div");
        day.className = "day";
        day.textContent = i;
        day.addEventListener("click", function() {
            seleccionarFecha(this.textContent, currentMonth, currentYear);
        });
        calendar.appendChild(day);
    }
}

function seleccionarFecha(day, month, year) {
    var selectedDate = new Date(year, month, day);
    document.getElementById("fecha").value = selectedDate.toLocaleDateString();
    document.getElementById("calendario").style.display = "none";
}


function mostrarMenuTipoDia() {
    var menuTipoDia = document.getElementById("tipoDia");
    var tipoDia = menuTipoDia.value;
    if (tipoDia === "entrenamiento") {
        document.getElementById("tipoDia").value = "descanso";
    } else {
        document.getElementById("tipoDia").value = "entrenamiento";
    }
}

function seleccionarTipoDia() {
    var tipoDia = document.getElementById("tipoDia").value;
    var selectElement = document.getElementById("tipoDia");

    if (tipoDia === "descanso") {
        selectElement.style.backgroundColor = "#F8D7DA";
    } else {
        selectElement.style.backgroundColor = ""; // Restablecer el color de fondo
    }
}

function seleccionarOpcion() {
    var opcion = document.getElementById("cuandoEntrenas").value;

    // Ocultar todas las tablas
    var todasLasTablas = document.querySelectorAll('.macros-table');
    todasLasTablas.forEach(tabla => {
        tabla.style.display = 'none';
    });

    // Mostrar las tablas según la opción seleccionada
    switch (opcion) {
        case "ayunas":
            document.getElementById("intraentreno").style.display = 'block';
            document.getElementById("postentreno").style.display = 'block';
            document.getElementById("comida1").style.display = 'block';
            document.getElementById("comida2").style.display = 'block';
            document.getElementById("comida3").style.display = 'block';
            document.getElementById("comida4").style.display = 'block';
            break;
        case "despuesComida1":
            document.getElementById("comida5").style.display = 'block';
            document.getElementById("intraentreno").style.display = 'block';
            document.getElementById("postentreno").style.display = 'block';
            document.getElementById("comida6").style.display = 'block';
            document.getElementById("comida7").style.display = 'block';
            document.getElementById("comida8").style.display = 'block';
            break;
        case "despuesComida2":
            document.getElementById("comida9").style.display = 'block';
            document.getElementById("comida10").style.display = 'block';
            document.getElementById("intraentreno").style.display = 'block';
            document.getElementById("postentreno").style.display = 'block';
            document.getElementById("comida11").style.display = 'block';
            document.getElementById("comida12").style.display = 'block';
            break;
        case "despuesComida3":
            document.getElementById("comida13").style.display = 'block';
            document.getElementById("comida14").style.display = 'block';
            document.getElementById("comida15").style.display = 'block';
            document.getElementById("intraentreno").style.display = 'block';
            document.getElementById("postentreno").style.display = 'block';
            document.getElementById("comida16").style.display = 'block';
            break;
        default:
            break;
    }
}
// Recuperar valores almacenados del almacenamiento local
var proteinaNecesaria = localStorage.getItem('proteinas');
var carbohidratoNecesario = localStorage.getItem('carbohidratos');
var grasaNecesaria = localStorage.getItem('grasas');

// Actualizar las tablas de dieta con los valores recuperados
document.getElementById("proteinaComida1").textContent = proteinaNecesaria + " g";
document.getElementById("carbohidratoComida1").textContent = carbohidratoNecesario + " g";
document.getElementById("grasaComida1").textContent = grasaNecesaria + " g";


