var alimentosConsumidos = []; // Declarar alimentosConsumidos como un array vacío en el ámbito global

// Resto del código...


// Definir los alimentos disponibles
var alimentos = [
    { id: 1, nombre: "Aceite de aguacate una cucharada sopera", proteina: 0, carb: 0, grasa: 10, racion: 10 },
    { id: 2, nombre: "Aceite de coco una cucharadita de café", proteina: 0, carb: 0, grasa: 5, racion: 5 },
    { id: 3, nombre: "Aceite de oliva virgen extra una cucharada sopera", proteina: 0, carb: 0, grasa: 10, racion: 10 },
    { id: 4, nombre: "Aceite de oliva virgen extra una cucharadita de café", proteina: 0, carb: 0, grasa: 5, racion: 5 },
    { id: 5, nombre: "Aceitunas negras sin hueso (Hacendado)", proteina: 16, carb: 0, grasa: 100, racion: 100 },
    { id: 6, nombre: " Arroz bomba (El Cazador)", proteina: 7.96, carb: 76.8, grasa: 0.5, racion: 100 },
    { id: 7, nombre: "Arroz blanco (SOS)", proteina: 6.7, carb: 77, grasa: 1.1, racion: 100 },
    { id: 8, nombre: "Arroz blanco precocido congelado (Hacendado)", proteina: 4.51, carb: 46.76, grasa: 0.5, racion: 167 }


];

// Función para actualizar el select de alimentos en el HTML
function actualizarSelectAlimentos() {
    var selectAlimentos = document.getElementById("alimento-id");

    // Limpiar el select antes de agregar los nuevos elementos
    selectAlimentos.innerHTML = "";

    // Agregar cada alimento como una opción en el select
    alimentos.forEach(function(alimento) {
        var option = document.createElement("option");
        option.value = alimento.id;
        option.textContent = alimento.nombre;
        selectAlimentos.appendChild(option);
    });
}

// Función para calcular la cantidad de macros consumidos y faltantes
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

    // Calcular la cantidad total de carbohidratos, proteínas y grasas consumidos
    var carbConsumidos = 0;
    var proteinaConsumidos = 0;
    var grasaConsumidos = 0;

    // Obtener los alimentos seleccionados y sumar sus macros
    alimentosConsumidos.forEach(function(alimento) {
        var alimentoInfo = alimentos.find(function(item) {
            return item.id === alimento.id;
        });

        if (alimentoInfo) {
            carbConsumidos += alimentoInfo.carb * alimento.cantidad / alimentoInfo.racion;
            proteinaConsumidos += alimentoInfo.proteina * alimento.cantidad / alimentoInfo.racion;
            grasaConsumidos += alimentoInfo.grasa * alimento.cantidad / alimentoInfo.racion;
        }
    });

    // Calcular la cantidad faltante de cada macro
    var carbFaltantes = Math.max(carbGramos - carbConsumidos, 0);
    var proteinaFaltantes = Math.max(proteinaGramos - proteinaConsumidos, 0);
    var grasaFaltantes = Math.max(grasaGramos - grasaConsumidos, 0);

    // Mostrar los resultados
    var resultado = "Para mantener tu peso, necesitas consumir aproximadamente:";
    resultado += "<br>Carbohidratos: " + carbConsumidos.toFixed(1) + " g (Faltan " + carbFaltantes.toFixed(1) + " g)";
    resultado += "<br>Proteínas: " + proteinaConsumidos.toFixed(1) + " g (Faltan " + proteinaFaltantes.toFixed(1) + " g)";
    resultado += "<br>Grasas: " + grasaConsumidos.toFixed(1) + " g (Faltan " + grasaFaltantes.toFixed(1) + " g)";

    document.getElementById("resultado").innerHTML = resultado;
}

// Función para agregar un alimento a la lista de alimentos consumidos
function agregarAlimento() {
    var alimentoId = parseInt(document.getElementById("alimento-id").value);
    var cantidad = parseFloat(document.getElementById("cantidad").value);

    // Encontrar el alimento seleccionado
    var alimento = alimentos.find(function(item) {
        return item.id === alimentoId;
    });

    // Si el alimento está definido y la cantidad es válida
    if (alimento && !isNaN(cantidad) && cantidad > 0) {
        // Agregar el alimento a la lista de alimentos consumidos
        alimentosConsumidos.push({ id: alimento.id, nombre: alimento.nombre, cantidad: cantidad });
        // Actualizar la lista de alimentos consumidos en la interfaz
        actualizarListaAlimentos();
        // Calcular los macros después de agregar el alimento
        calcularMacros();
    } else {
        alert("Por favor, seleccione un alimento y especifique una cantidad válida.");
    }
}

// Función para actualizar la lista de alimentos consumidos en la interfaz
function actualizarListaAlimentos() {
    var listaAlimentos = document.getElementById("lista-alimentos");
    // Limpiar la lista antes de agregar los nuevos elementos
    listaAlimentos.innerHTML = "";

    // Agregar cada alimento consumido como un elemento de lista
    alimentosConsumidos.forEach(function(alimento) {
        var item = document.createElement("li");
        item.textContent = alimento.nombre + ": " + alimento.cantidad + " g";
        listaAlimentos.appendChild(item);
    });
}

// Event listener para el botón "Calcular"
document.getElementById("calcular-btn").addEventListener("click", calcularMacros);

// Inicializar el select de alimentos al cargar la página
actualizarSelectAlimentos();