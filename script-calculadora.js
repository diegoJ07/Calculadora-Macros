var alimentos = [
    { id: 1, nombre: "Huevos", proteina: 6, carbohidratos: 0.6, grasas: 4.8 },
    { id: 2, nombre: "Pollo", proteina: 25, carbohidratos: 0, grasas: 3.6 },
    { id: 3, nombre: "Arroz", proteina: 2.6, carbohidratos: 28.7, grasas: 0.3 },
    { id: 4, nombre: "Pasta", proteina: 12.6, carbohidratos: 71.2, grasas: 1.4 },
    // Agrega más alimentos según sea necesario
];

document.addEventListener("DOMContentLoaded", function() {
    cargarSelectAlimentos();
    document.getElementById("agregar-btn").addEventListener("click", agregarAlimento);
    document.getElementById("edad").addEventListener("input", calcularMacros);
    document.getElementById("peso").addEventListener("input", calcularMacros);
    document.getElementById("altura").addEventListener("input", calcularMacros);
    document.getElementById("actividad").addEventListener("change", calcularMacros);
});

function cargarSelectAlimentos() {
    var selectAlimentos = document.getElementById("alimento-id");
    alimentos.forEach(function(alimento) {
        var option = document.createElement("option");
        option.value = alimento.id;
        option.textContent = alimento.nombre;
        selectAlimentos.appendChild(option);
    });
}

function calcularMacros() {
    var edad = parseFloat(document.getElementById("edad").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value);
    var actividad = parseFloat(document.getElementById("actividad").value);

    var macrosNecesarios = calcularMacrosNecesarios(edad, peso, altura, actividad);

    // Muestra los resultados
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <h3>Macronutrientes Necesarios:</h3>
        <p>Proteínas: ${macrosNecesarios.proteinas.toFixed(1)} g</p>
        <p>Carbohidratos: ${macrosNecesarios.carbohidratos.toFixed(1)} g</p>
        <p>Grasas: ${macrosNecesarios.grasas.toFixed(1)} g</p>
    `;
}

function calcularMacrosNecesarios(edad, peso, altura, actividad) {
    // Fórmula para calcular las necesidades de macronutrientes
    // Ejemplo de fórmula, ajusta según necesites
    var proteinas = peso * 2.2;
    var carbohidratos = peso * 3.5;
    var grasas = peso * 0.7;

    // Ajusta según la actividad física
    proteinas *= actividad;
    carbohidratos *= actividad;
    grasas *= actividad;

    return { proteinas, carbohidratos, grasas };
}

function agregarAlimento() {
    var alimentoId = parseInt(document.getElementById("alimento-id").value);
    var cantidad = parseFloat(document.getElementById("cantidad").value);
    var comida = document.getElementById("comida").value;

    var alimento = alimentos.find(function(item) {
        return item.id === alimentoId;
    });

    if (!alimento) {
        alert("El alimento seleccionado no es válido.");
        return;
    }

    var fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${comida}</td>
        <td>${alimento.nombre} (${cantidad} g)</td>
        <td>${alimento.proteina * cantidad}</td>
        <td>${alimento.carbohidratos * cantidad}</td>
        <td>${alimento.grasas * cantidad}</td>
        <td>Calculando...</td>
    `;

    document.getElementById("tabla-alimentos").appendChild(fila);

    // Llamamos a la función calcularMacrosComida después de agregar la fila
    calcularMacrosComida(comida);
}


function calcularMacrosComida(comida) {
    var totalProteinas = 0;
    var totalCarbohidratos = 0;
    var totalGrasas = 0;
    var filas = document.getElementById("tabla-alimentos").getElementsByTagName("tr");

    for (var i = 0; i < filas.length; i++) {
        var cells = filas[i].getElementsByTagName("td");

        // Verificar si hay suficientes celdas
        if (cells.length >= 6 && cells[0].textContent === comida) {
            var proteina = parseFloat(cells[2].textContent);
            var carbohidratos = parseFloat(cells[3].textContent);
            var grasas = parseFloat(cells[4].textContent);

            totalProteinas += isNaN(proteina) ? 0 : proteina;
            totalCarbohidratos += isNaN(carbohidratos) ? 0 : carbohidratos;
            totalGrasas += isNaN(grasas) ? 0 : grasas;
        }
    }

    // Obtenemos los objetivos según la comida seleccionada
    var objetivos = obtenerObjetivosComida(comida);

    // Calculamos el faltante para consumir
    var faltanteProteinas = objetivos.proteinas - totalProteinas;
    var faltanteCarbohidratos = objetivos.carbohidratos - totalCarbohidratos;
    var faltanteGrasas = objetivos.grasas - totalGrasas;

    // Mostramos el faltante en la tabla
    for (var j = 0; j < filas.length; j++) {
        var row = filas[j];
        var cells = row.getElementsByTagName("td");

        // Verificar si hay suficientes celdas
        if (cells.length >= 6 && cells[0].textContent === comida) {
            cells[5].textContent = `P: ${faltanteProteinas.toFixed(1)} g, C: ${faltanteCarbohidratos.toFixed(1)} g, G: ${faltanteGrasas.toFixed(1)} g`;
        }
    }
}
function obtenerObjetivosComida(comida) {
    // Define los objetivos según la comida seleccionada
    var objetivos = {
        comida1: { proteinas: 57.5, carbohidratos: 120, grasas: 14 },
        comida2: { proteinas: 57.5, carbohidratos: 80, grasas: 17.5 },
        comida3: { proteinas: 46, carbohidratos: 80, grasas: 17.5 },
        comida4: { proteinas: 69, carbohidratos: 120, grasas: 21 },
        preEntreno: { proteinas: 10, carbohidratos: 24, grasas: 0 }, // Ajustar según necesidad
        postEntreno: { proteinas: 40, carbohidratos: 56, grasas: 0 } // Ajustar según necesidad
    };

    return objetivos[comida] || { proteinas: 0, carbohidratos: 0, grasas: 0 };
}
document.addEventListener("DOMContentLoaded", function() {
    cargarSelectAlimentos();
    document.getElementById("agregar-btn").addEventListener("click", agregarAlimento);
    document.getElementById("edad").addEventListener("input", calcularMacros);
    document.getElementById("peso").addEventListener("input", calcularMacros);
    document.getElementById("altura").addEventListener("input", calcularMacros);
    document.getElementById("actividad").addEventListener("change", calcularMacros);

    // Agrega el evento para mostrar/ocultar la tabla de referencia
    document.getElementById("mostrar-tabla-ref-btn").addEventListener("click", function() {
        var tablaReferencia = document.getElementById("tabla-referencia");
        if (tablaReferencia.style.display === "none") {
            tablaReferencia.style.display = "block";
            document.getElementById("mostrar-tabla-ref-btn").textContent = "Ocultar Tabla de Referencia";
        } else {
            tablaReferencia.style.display = "none";
            document.getElementById("mostrar-tabla-ref-btn").textContent = "Mostrar Tabla de Referencia";
        }
    });
});

// Función para actualizar los valores de la tabla de referencia según la comida seleccionada
function actualizarTablaReferencia(comidaSeleccionada) {
    var tablaReferencia = document.getElementById("tabla-referencia");
    var proteinasRef = 0;
    var carbohidratosRef = 0;
    var grasasRef = 0;

    // Define los valores de referencia según la comida seleccionada
    switch (comidaSeleccionada) {
        case "comida1":
            proteinasRef = 10;
            carbohidratosRef = 24;
            grasasRef = 0;
            break;
        case "comida2":
            proteinasRef = 40;
            carbohidratosRef = 56;
            grasasRef = 0;
            break;
        // Agrega más casos según sea necesario
        default:
            // Valores por defecto
            proteinasRef = 30;
            carbohidratosRef = 50;
            grasasRef = 10;
    }

    // Actualiza los valores de la tabla de referencia
    var tablaReferenciaBody = tablaReferencia.querySelector("tbody");
    tablaReferenciaBody.innerHTML = `
        <tr>
            <td>Proteínas</td>
            <td>${proteinasRef}</td>
        </tr>
        <tr>
            <td>Carbohidratos</td>
            <td>${carbohidratosRef}</td>
        </tr>
        <tr>
            <td>Grasas</td>
            <td>${grasasRef}</td>
        </tr>
    `;
}



