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

const clientId = '8f1fc4c66e17464bb0d213e739b1de53';
const clientSecret = '4fc36c19a09a4e2b82b7e89c8d959ce7';

function obtenerAccessToken() {
    const url = 'https://oauth.fatsecret.com/connect/token';

    const datos = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        console.log('Access Token:', accessToken);

        // Una vez que tengas el Access Token, puedes utilizarlo para hacer solicitudes a la API de FatSecret
        obtenerInformacionNutricional('manzana', accessToken); // Ejemplo de solicitud para obtener información nutricional de una manzana
    })
    .catch(error => {
        console.error('Error al obtener Access Token:', error);
    });
}

function obtenerInformacionNutricional(alimento, accessToken) {
    const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&format=json&search_expression=${alimento}&oauth_consumer_key=${clientId}&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&oauth_token=${accessToken}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Procesar los datos recibidos de la API
            console.log('Datos de la búsqueda:', data);
            // Aquí puedes extraer la información nutricional del alimento
        })
        .catch(error => {
            console.error('Error al obtener información nutricional:', error);
        });
}

// Llamar a la función para obtener el Access Token al cargar la página
obtenerAccessToken();
