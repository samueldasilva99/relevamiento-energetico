// Datos de Iluminación
const iluminacionData = {
    "Spot AR111": { potencia: 13, sector: 'Iluminación' },
    "Dicroicas bidireccionales": { potencia: 10, sector: 'Iluminación' },
    "Colgante redondas": { potencia: 30, sector: 'Iluminación' },
    "Colgante rectangular": { potencia: 20, sector: 'Iluminación' },
    "Dicroica Grande": { potencia: 15, sector: 'Iluminación' },
    "Dicroica Chica": { potencia: 10, sector: 'Iluminación' },
    "Panel 60x60": { potencia: 40, sector: 'Iluminación' },
    "Reflector": { potencia: 100, sector: 'Iluminación' },
    "Tubos dobles 120cm": { potencia: 72, sector: 'Iluminación' },
    "Panel 30x30cm": { potencia: 24, sector: 'Iluminación' },
    "Apliques de pared": { potencia: 10, sector: 'Iluminación' }
};

// Datos de Equipos
const equiposData = {
    "Computadora Todo en uno": { potencia: 70, sector: 'Artefactos/Equipos' },
    "Scanner": { potencia: 35, sector: 'Artefactos/Equipos' },
    "Dispenser": { potencia: 45, sector: 'Artefactos/Equipos' },
    "Dispenser Stand By": { potencia: 104, sector: 'Artefactos/Equipos' },
    "Totem": { potencia: 100, sector: 'Artefactos/Equipos' },
    "TV": { potencia: 200, sector: 'Artefactos/Equipos' },
    "CPU": { potencia: 300, sector: 'Artefactos/Equipos' },
    "Monitor": { potencia: 60, sector: 'Artefactos/Equipos' },
    "Impresoras Grandes": { potencia: 880, sector: 'Artefactos/Equipos' },
    "Impresoras Chicas": { potencia: 600, sector: 'Artefactos/Equipos' },
    "Microondas": { potencia: 1500, sector: 'Artefactos/Equipos' },
    "Cafetera": { potencia: 900, sector: 'Artefactos/Equipos' },
    "Frigobar": { potencia: 100, sector: 'Artefactos/Equipos' },
    "Caloventor": { potencia: 2000, sector: 'Artefactos/Equipos' },
    "Heladera con freezer": { potencia: 200, sector: 'Artefactos/Equipos' },
    "Horno": { potencia: 3200, sector: 'Artefactos/Equipos' },
    "Termotanque": { potencia: 2000, sector: 'Artefactos/Equipos' },
    "Pava": { potencia: 2000, sector: 'Artefactos/Equipos' },
    "Proyector": { potencia: 400, sector: 'Artefactos/Equipos' }
};

// Datos de Climatización (Potencia cargada por el usuario)
const climatizacionData = {
    "Equipo Central": { potencia: null, sector: 'Climatización' },
    "Split Individual": { potencia: null, sector: 'Climatización' }
};

// Datos de Motor (Potencia cargada por el usuario)
const motorData = {
    "Ascensor": { potencia: null, sector: 'Motor' },
    "Bombeo": { potencia: null, sector: 'Motor' }
};

// Función para llenar los selectores
function llenarSelectores() {
    const selectIluminacion = document.getElementById('equipo-iluminacion');
    const selectEquipos = document.getElementById('equipo-electricos');
    const selectClimatizacion = document.getElementById('equipo-climatizacion');
    const selectMotores = document.getElementById('equipo-motores');

    // Llenar selectores de iluminación
    for (const [nombre, data] of Object.entries(iluminacionData)) {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectIluminacion.appendChild(option);
    }

    // Llenar selectores de equipos
    for (const [nombre, data] of Object.entries(equiposData)) {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectEquipos.appendChild(option);
    }

    // Llenar selectores de climatización
    for (const [nombre, data] of Object.entries(climatizacionData)) {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectClimatizacion.appendChild(option);
    }

    // Llenar selectores de motores
    for (const [nombre, data] of Object.entries(motorData)) {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        selectMotores.appendChild(option);
    }
}

// Variables para almacenar el consumo por sector
let consumoPorSector = {
    "Iluminación": 0,
    "Artefactos/Equipos": 0,
    "Climatización": 0,
    "Motor": 0
};

// Inicializar el gráfico de torta
let ctx = document.getElementById('grafico-torta').getContext('2d');
let graficoTorta = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Iluminación', 'Artefactos/Equipos', 'Climatización', 'Motor'],
        datasets: [{
            data: [0, 0, 0, 0],  // Valores iniciales en 0
            backgroundColor: ['#36c6f5', '#f5ec36', '#84dc4c', '#f94444'], // Nuevos colores
            borderColor: ['#000000', '#000000', '#000000', '#000000'], // Opcional: Colores de borde
            borderWidth: 1 // Opcional: ancho del borde
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

// Función para actualizar el gráfico de torta
function actualizarGrafico() {
    graficoTorta.data.datasets[0].data = [
        consumoPorSector["Iluminación"],
        consumoPorSector["Artefactos/Equipos"],
        consumoPorSector["Climatización"],
        consumoPorSector["Motor"]
    ];
    graficoTorta.update();
}

// Modificación de la función para cargar equipos y calcular consumo
function cargarEquipo(tipo) {
    let selectEquipo, cantidad, horasDia, diasSemana, potencia, sector;

    if (tipo === 'iluminacion') {
        selectEquipo = document.getElementById('equipo-iluminacion');
        cantidad = parseInt(document.getElementById('cantidad-iluminacion').value);
        horasDia = parseInt(document.getElementById('horas-dia-iluminacion').value);
        diasSemana = parseInt(document.getElementById('dias-semana-iluminacion').value);
        potencia = iluminacionData[selectEquipo.value].potencia;
        sector = iluminacionData[selectEquipo.value].sector;
    } else if (tipo === 'electricos') {
        selectEquipo = document.getElementById('equipo-electricos');
        cantidad = parseInt(document.getElementById('cantidad-electricos').value);
        horasDia = parseInt(document.getElementById('horas-dia-electricos').value);
        diasSemana = parseInt(document.getElementById('dias-semana-electricos').value);
        potencia = equiposData[selectEquipo.value].potencia;
        sector = equiposData[selectEquipo.value].sector;
    } else if (tipo === 'climatizacion') {
        selectEquipo = document.getElementById('equipo-climatizacion');
        cantidad = parseInt(document.getElementById('cantidad-climatizacion').value);
        horasDia = parseInt(document.getElementById('horas-dia-climatizacion').value);
        diasSemana = parseInt(document.getElementById('dias-semana-climatizacion').value);
        potencia = parseFloat(document.getElementById('potencia-climatizacion').value); // Potencia ingresada por el usuario
        climatizacionData[selectEquipo.value].potencia = potencia; // Guardar potencia
        sector = climatizacionData[selectEquipo.value].sector;
    } else if (tipo === 'motores') {
        selectEquipo = document.getElementById('equipo-motores');
        cantidad = parseInt(document.getElementById('cantidad-motores').value);
        horasDia = parseInt(document.getElementById('horas-dia-motores').value);
        diasSemana = parseInt(document.getElementById('dias-semana-motores').value);
        potencia = parseFloat(document.getElementById('potencia-motores').value); // Potencia ingresada por el usuario
        motorData[selectEquipo.value].potencia = potencia; // Guardar potencia
        sector = motorData[selectEquipo.value].sector;
    }

    // Calcular consumo mensual
    const consumoMensual = (potencia * cantidad * horasDia * diasSemana * 4) / 1000; // Convertir a kWh

    // Calcular consumo anual
    const consumoAnual = tipo === 'climatizacion' ? consumoMensual * 6 : consumoMensual * 12;

    // Sumar el consumo al sector correspondiente
    consumoPorSector[sector] += consumoAnual;

    // Actualizar el gráfico de torta
    actualizarGrafico();

    // Agregar fila a la tabla
    const tablaCuerpo = document.getElementById('tabla-equipos').querySelector('tbody');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${selectEquipo.options[selectEquipo.selectedIndex].text}</td>
        <td>${cantidad}</td>
        <td>${horasDia}</td>
        <td>${diasSemana}</td>
        <td>${consumoMensual.toFixed(2)}</td>
        <td>${consumoAnual.toFixed(2)}</td>
    `;
    tablaCuerpo.appendChild(fila);

    // Actualizar consumo total anual
    actualizarConsumoTotal();

    // Limpiar campos
    limpiarCampos(tipo);
}

// Función para limpiar campos después de cargar
function limpiarCampos(tipo) {
    if (tipo === 'iluminacion') {
        document.getElementById('cantidad-iluminacion').value = '';
        document.getElementById('horas-dia-iluminacion').value = '';
        document.getElementById('dias-semana-iluminacion').value = '';
    } else if (tipo === 'electricos') {
        document.getElementById('cantidad-electricos').value = '';
        document.getElementById('horas-dia-electricos').value = '';
        document.getElementById('dias-semana-electricos').value = '';
    } else if (tipo === 'climatizacion') {
        document.getElementById('potencia-climatizacion').value = '';
        document.getElementById('cantidad-climatizacion').value = '';
        document.getElementById('horas-dia-climatizacion').value = '';
        document.getElementById('dias-semana-climatizacion').value = '';
    } else if (tipo === 'motores') {
        document.getElementById('potencia-motores').value = '';
        document.getElementById('cantidad-motores').value = '';
        document.getElementById('horas-dia-motores').value = '';
        document.getElementById('dias-semana-motores').value = '';
    }
}

// Función para actualizar el consumo total anual
function actualizarConsumoTotal() {
    const filas = document.querySelectorAll('#tabla-equipos tbody tr');
    let consumoTotalAnual = 0;

    filas.forEach(fila => {
        const consumoAnual = parseFloat(fila.children[5].textContent);
        consumoTotalAnual += consumoAnual;
    });

    document.getElementById('consumo-anual').textContent = consumoTotalAnual.toFixed(2); // Cambiar el ID si es necesario
}

// Event listeners para los botones de carga
document.getElementById('cargar-iluminacion').addEventListener('click', () => cargarEquipo('iluminacion'));
document.getElementById('cargar-electricos').addEventListener('click', () => cargarEquipo('electricos'));
document.getElementById('cargar-climatizacion').addEventListener('click', () => cargarEquipo('climatizacion'));
document.getElementById('cargar-motores').addEventListener('click', () => cargarEquipo('motores'));

// Llenar los selectores al cargar la página
window.onload = llenarSelectores;
