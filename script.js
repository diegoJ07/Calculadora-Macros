var alimentosConsumidos = [];

function calcularMacros() {
    var edad = parseInt(document.getElementById("edad").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var actividad = parseFloat(document.getElementById("actividad").value);

    // Fórmula para calcular el metabolismo basal (TMB)
    var tmb = 10 * peso + 6.25 * altura - 5 * edad;

    // Fórmula para ajustar el TMB según la actividad física
    var mantenimiento = tmb * actividad;

    // Definir los porcentajes de macros (ejemplo: 40% carbohidratos, 30% proteínas, 30% grasas)
    var carbPorcentaje = 40;
    var proteinaPorcentaje = 30;
    var grasaPorcentaje = 30;

    // Calcular la cantidad de cada macro en gramos
    var carbGramos = mantenimiento * carbPorcentaje / 400;
    var proteinaGramos = mantenimiento * proteinaPorcentaje / 400;
    var grasaGramos = mantenimiento * grasaPorcentaje / 900;

    // Mostrar los resultados
    var resultado = "Para mantener tu peso, necesitas consumir aproximadamente:";
    resultado += "<br>Carbohidratos: " + carbGramos.toFixed(1) + " g";
    resultado += "<br>Proteínas: " + proteinaGramos.toFixed(1) + " g";
    resultado += "<br>Grasas: " + grasaGramos.toFixed(1) + " g";

    document.getElementById("resultado").innerHTML = resultado;
}

function agregarAlimento() {
    var alimento = document.getElementById("alimento").value;
    var cantidad = parseFloat(document.getElementById("cantidad").value);

    if (alimento && cantidad) {
        alimentosConsumidos.push({ nombre: alimento, cantidad: cantidad });
        actualizarListaAlimentos();
    } else {
        alert("Por favor, complete ambos campos.");
    }
}

function actualizarListaAlimentos() {
    var listaAlimentos = document.getElementById("lista-alimentos");
    listaAlimentos.innerHTML = "";

    alimentosConsumidos.forEach(function(alimento) {
        var item = document.createElement("li");
        item.textContent = alimento.nombre + ": " + alimento.cantidad + " g";
        listaAlimentos.appendChild(item);
    });
}

function obtenerInformacionNutricional(alimento) {
    const apiKey = 'eQeX87rm1yW8bJG1JLfZ4iKN7mEtPgTAA3wEekR5';
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${alimento}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la búsqueda:', data);
            mostrarResultados(data); // Llamar a la función para mostrar los resultados
        })
        .catch(error => {
            console.error('Error al obtener información nutricional:', error);
        });
}



function buscarInformacionNutricional() {
    console.log("Función buscarInformacionNutricional() activada.");
    var alimento = document.getElementById("alimento-busqueda").value;
    
    // Llamar a la función para obtener información nutricional del alimento
    obtenerInformacionNutricional(alimento);
}
function mostrarResultados(data) {
    // Limpiar resultados anteriores
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    // Mostrar los nuevos resultados
    var listaResultados = document.createElement("ul");
    data.foods.forEach(function(alimento) {
        var item = document.createElement("li");
        item.textContent = alimento.description;
        listaResultados.appendChild(item);
    });
    resultadosDiv.appendChild(listaResultados);
}


